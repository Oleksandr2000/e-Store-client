import React, { Children } from 'react';
import DeviceForm from '../components/Forms/DeviceForm';
import CreateCategoriesForm from '../components/Forms/CreateCategoriesForm';
import ModalPost from '../components/Modal/Modal';
import ModalLoader from '../components/Modal/ModalLoader';
import { useAppSelector } from '../hooks';
import { Container } from 'react-bootstrap';
import { createDevice, updateDevice } from '../redux/slice/DeviceSlice';
import DeviceSelect from '../components/Forms/DeviceSelect';
import { createBrand, destroyBrand, updateBrand } from '../redux/slice/BrandSlice';
import { createType, destroyType, updateType } from '../redux/slice/TypeSlice';
import UpdateCategoriesForm from '../components/Forms/UpdateCategoriesForm';

const Admin = () => {
  const { types } = useAppSelector((store) => store.types);
  const { brands } = useAppSelector((store) => store.brands);
  const statusType = useAppSelector((store) => store.types.statusPOST);
  const statusBrand = useAppSelector((store) => store.brands.statusPOST);
  const statusDevice = useAppSelector((store) => store.device.statusPOST);

  return (
    <Container>
      <div className="d-flex justify-content-between flex-wrap mb-5">
        <CreateCategoriesForm name="Brand" onClick={(body) => createBrand(body)} />
        <CreateCategoriesForm name="Type" onClick={(body) => createType(body)} />
        <UpdateCategoriesForm
          name="Brand"
          onClick={(body) => updateBrand(body)}
          items={brands}
          onClickDestroy={(body) => destroyBrand(body)}
        />
        <UpdateCategoriesForm
          name="Type"
          onClick={(body) => updateType(body)}
          items={types}
          onClickDestroy={(body) => destroyType(body)}
        />
        <DeviceForm name="Create Device" onClick={(body) => createDevice(body)} />
        <DeviceForm name="Update Device" update onClick={(body) => updateDevice(body)}>
          <DeviceSelect />
        </DeviceForm>
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
