import React from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchSearchDevice, setSearchValue } from '../redux/slice/DeviceSlice';
import CartItem from './CartItem';
import NoDevice from './NoDevice';

const SearchPanel = () => {
  const { searchItems } = useAppSelector((store) => store.device);
  const value = useAppSelector((store) => store.device.searchValue);
  const [show, setShow] = React.useState(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  console.log(pathname);

  async function handleShow() {
    if (pathname !== '/shop') {
      await dispatch(fetchSearchDevice({ filterBrand: '', filterType: '', str: value }));
    }
    setShow(true);
  }

  return (
    <div className="search-panel">
      <div className="search__input">
        <Form.Control
          name="search"
          placeholder="Search"
          value={value}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
        />
        <img className="search__icon" src="search.svg" alt="Search" onClick={handleShow} />
      </div>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{searchItems.length > 0 ? value : 'Device not found'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchItems.length > 0 ? (
            <div className="device__wrapper mb-5">
              {searchItems.map((item) => (
                <CartItem {...item} key={item.id} />
              ))}
            </div>
          ) : (
            <NoDevice />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SearchPanel;
