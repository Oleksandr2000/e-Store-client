import React from 'react';
import DeviceForm from '../components/DeviceForm';
import CreateCategoriesForm from '../components/CreateCategoriesForm';
import Loader from '../components/Loader';
import { useAppSelector } from '../hooks';

const Admin = () => {
  const isLoadingBrand = useAppSelector((store) => store.brands.statusPOST) === 'loading';
  const isLoadingType = useAppSelector((store) => store.types.statusPOST) === 'loading';
  const isLoadingDevice = useAppSelector((store) => store.device.statusPOST) === 'loading';
  // const isErrorBrand = useAppSelector((store) => store.brands.statusPOST) === 'error';
  // const isErrorType = useAppSelector((store) => store.types.statusPOST) === 'error';
  // const isErrorDevice = useAppSelector((store) => store.device.statusPOST) === 'error';

  return (
    <div className="d-flex justify-content-between flex-wrap mb-5">
      {isLoadingBrand ? <Loader styles="m-auto" /> : <CreateCategoriesForm name="Brand" />}
      {isLoadingType ? <Loader styles="m-auto" /> : <CreateCategoriesForm name="Type" />}
      {isLoadingDevice ? <Loader styles="m-auto" /> : <DeviceForm />}
    </div>
  );
};

export default Admin;
