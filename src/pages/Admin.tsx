import React from 'react';
import DeviceForm from '../components/DeviceForm';
import CreateCategoriesForm from '../components/CreateCategoriesForm';
import ModalPost from '../components/Modal';
import ModalLoader from '../components/ModalLoader';
import { useAppSelector } from '../hooks';
import { Container } from 'react-bootstrap';

const Admin = () => {
  const statusType = useAppSelector((store) => store.types.statusPOST);
  const statusBrand = useAppSelector((store) => store.brands.statusPOST);
  const statusDevice = useAppSelector((store) => store.device.statusPOST);

  return (
    <Container>
      <div className="d-flex justify-content-between flex-wrap mb-5">
        <CreateCategoriesForm name="Brand" />
        <CreateCategoriesForm name="Type" />
        <DeviceForm />
        {(statusType === 'loading' || statusBrand === 'loading' || statusDevice === 'loading') && (
          <ModalLoader />
        )}
        {(statusType === 'loaded' || statusBrand === 'loaded' || statusDevice === 'loaded') && (
          <ModalPost color="#29a329" message="Succesful" />
        )}

        {(statusType === 'error' || statusBrand === 'error' || statusDevice === 'error') && (
          <ModalPost color="#e60000" message="Error" />
        )}
      </div>
    </Container>
  );
};

export default Admin;
