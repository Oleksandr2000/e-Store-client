import React from 'react';
import { Modal, ModalDialog } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import { clearStatusBrand } from '../../redux/slice/BrandSlice';
import { clearStatusType } from '../../redux/slice/TypeSlice';
import Loader from '../Loader';

const ModalLoader = () => {
  const [show, setShow] = React.useState(true);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearStatusType());
    dispatch(clearStatusBrand());
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="post">
      <Modal.Body className="post-loader">
        <img src="/Spinner.png" alt="loading" />
      </Modal.Body>
    </Modal>
  );
};

export default ModalLoader;
