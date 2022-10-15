import React from 'react';
import { Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAllDevice, fetchOneDevice } from '../../redux/slice/DeviceSlice';
import { Device } from '../../types';

const DeviceSelect = () => {
  const { items } = useAppSelector((store) => store.device);
  const dispatch = useAppDispatch();
  const [selectedDevice, setSelectedDevice] = React.useState<string>();

  React.useEffect(() => {
    dispatch(fetchAllDevice({ filterBrand: '', filterType: '', limit: 20000, page: 1 }));
  }, []);

  React.useEffect(() => {
    dispatch(fetchOneDevice({ id: Number(selectedDevice) }));
  }, [selectedDevice]);

  return (
    <div>
      <Form.Group className="mx-4 mt-3">
        <Form.Label>Select Device</Form.Label>
        <Form.Select
          placeholder={`Select Device`}
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}>
          <option>Select Device</option>
          {items.rows.map((item: Device) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default DeviceSelect;
