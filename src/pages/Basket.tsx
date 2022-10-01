import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clearBasket, fetchConfirm } from '../redux/slice/BasketSlice';
import BasketItem from '../components/BasketItem';
import Loader from '../components/Loader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NoDevice from '../components/NoDevice';
import { calcTotalCount, calcTotalPrice } from '../services';
import ModalLoader from '../components/ModalLoader';

const Basket = () => {
  const { basket, guestBasket } = useAppSelector((store) => store.basket);
  const isLoadingBasket = useAppSelector((store) => store.basket.status) === 'loading';
  const isLoadingUser = useAppSelector((store) => store.user.status) === 'loading';
  const isAddDevice = useAppSelector((store) => store.basket.statusAdd) === 'loading';
  const isConfirm = useAppSelector((store) => store.basket.statusConfirm) === 'loading';
  const [value, setValue] = React.useState('');
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const totalGuestPrice = calcTotalPrice(guestBasket);
  const { user, token } = useAppSelector((store) => store.user.data);
  const dispatch = useAppDispatch();

  const guestBasketId = guestBasket.map((item) => item.id);

  const totalBaketCount = calcTotalCount(basket.items);
  const totalGuestCount = calcTotalCount(guestBasket);
  const totalPrice = calcTotalPrice(basket.items);

  const confirmOrder = ({
    id,
    guestBasket,
    email,
  }: {
    id?: number;
    guestBasket?: number[];
    email?: string;
  }) => {
    if (token) {
      dispatch(fetchConfirm({ userId: id }));
    } else {
      dispatch(fetchConfirm({ guestBasket: guestBasket, email: email }));
      setValue('');
      dispatch(clearBasket());
      setShow(false);
    }
  };

  return (
    <div className="basket">
      <h1>Basket</h1>
      {basket.items?.length < 1 && guestBasket.length < 1 ? (
        <NoDevice />
      ) : (
        <>
          <div className="basket__wrapper">
            {token
              ? basket.items.map((item: any, i: number) => <BasketItem key={i} {...item} />)
              : guestBasket.map((item: any, i: number) => <BasketItem key={i} {...item} />)}
          </div>
          <div className="basket__footer">
            <div className="basket__info">
              <div className="basket__sum">
                Sum: <span className="gold">{token ? totalPrice : totalGuestPrice}</span>
              </div>
              <div className="basket__count">
                Count: <span className="gold">{token ? totalBaketCount : totalGuestCount}</span>
              </div>
            </div>
            <button
              className="confirm"
              onClick={token ? () => confirmOrder({ id: user.id }) : () => handleShow()}>
              Confirm order
            </button>
          </div>
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => confirmOrder({ guestBasket: guestBasketId, email: value })}>
            Condirm Order
          </Button>
        </Modal.Footer>
      </Modal>
      {(isLoadingBasket || isLoadingUser || isConfirm || isAddDevice) && <ModalLoader />}
    </div>
  );
};

export default Basket;
