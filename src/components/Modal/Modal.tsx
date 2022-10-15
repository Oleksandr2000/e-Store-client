import React from 'react';
import { Modal } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import { clearStatusBrand } from '../../redux/slice/BrandSlice';
import { clearStatusPost } from '../../redux/slice/DeviceSlice';
import { clearStatusType } from '../../redux/slice/TypeSlice';

interface ModalProps {
  color: string;
  message: string;
}

const ModalPost: React.FC<ModalProps> = ({ color, message }) => {
  const [show, setShow] = React.useState(true);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearStatusType());
    dispatch(clearStatusBrand());
    dispatch(clearStatusPost());
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="mt-5 pt-5">
      <Modal.Header closeButton style={{ background: color }}>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

export default ModalPost;
