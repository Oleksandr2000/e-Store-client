import React from 'react';
import { Card, Col, FormControl, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Info } from '../../types';

interface DeviceFormpRrops {
  name: string;
  update?: boolean;
  onClick: (body: any) => any;
  children?: any;
}

const DeviceForm: React.FC<DeviceFormpRrops> = ({ name, update, onClick, children }) => {
  const { device, status } = useAppSelector((store) => store.device);
  const { brands } = useAppSelector((store) => store.brands);
  const { types } = useAppSelector((store) => store.types);
  const dispatch = useAppDispatch();
  const [info, setInfo] = React.useState<Info[]>([]);
  const isLoaded = status === 'loaded';

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', id: Date.now() }]);
  };

  const removeInfo = (id: any) => {
    setInfo(info.filter((item) => item.id !== id));
  };

  const changeInfo = (key: string, value: any, id: any) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const createForm = useFormik({
    initialValues: {
      id: '',
      name: '',
      price: '',
      type: '',
      brand: '',
      img: '',
      discount: '',
      hit: false,
      sale: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      price: Yup.number().required('Обьязательное поле'),
      brand: Yup.number().required('Обьязательное поле'),
      type: Yup.number().required('Обьязательное поле'),
      img: Yup.string().required('Обьязательное поле'),
      discount: Yup.number(),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      if (update) {
        formData.append('id', values.id);
      }
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('img', values.img);
      formData.append('brandId', values.brand);
      formData.append('typeId', values.type);
      formData.append('hit', JSON.stringify(values.hit));
      formData.append('sale', JSON.stringify(values.sale));
      formData.append('discount', values.discount);
      formData.append('info', JSON.stringify(info));
      dispatch(onClick(formData));
    },
  });

  React.useEffect(() => {
    if (update && status === 'loaded') {
      createForm.setFieldValue('id', device.id);
      createForm.setFieldValue('name', device.name);
      createForm.setFieldValue('price', Math.round((device.price / (100 - device.discount)) * 100));
      createForm.setFieldValue('brand', device.brandId);
      createForm.setFieldValue('type', device.typeId);
      createForm.setFieldValue('hit', device.hit);
      createForm.setFieldValue('sale', device.sale);
      createForm.setFieldValue('discount', device.discount);
      setInfo(device.info ? device.info : []);
    }
  }, [isLoaded]);

  const selectFile = (e: any) => {
    createForm.setFieldValue('img', e.target.files[0]);
  };

  return (
    <Card style={{ width: 600 }} className="mt-5">
      <h2 className="mt-2 d-flex justify-content-center">{name}</h2>
      {children && children}
      <Form className="m-4" onSubmit={createForm.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder={`Enter name`}
            value={createForm.values.name}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder={`Enter Price`}
            value={createForm.values.price}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="type">Type</Form.Label>
          <Form.Select
            name="type"
            placeholder={`Select type`}
            value={createForm.values.type}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}>
            <option>Select Type</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="brand">Brand</Form.Label>
          <Form.Select
            name="brand"
            placeholder={`Select Brand`}
            value={createForm.values.brand}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}>
            <option>Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="d-flex mb-3">
          <Form.Check
            className="mr-2"
            type="checkbox"
            name="sale"
            checked={createForm.values.sale}
            label="Sale"
            onChange={createForm.handleChange}></Form.Check>
          <Form.Check
            className="mx-4"
            type="checkbox"
            name="hit"
            checked={createForm.values.hit}
            label="Hit"
            onChange={createForm.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="discount">Discount</Form.Label>
          <Form.Control
            name="discount"
            type="number"
            placeholder={`If this good sale set discount`}
            value={createForm.values.discount}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}
          />
        </Form.Group>
        <Form.Group>
          <Button onClick={addInfo} variant="outline-secondary">
            Add new props
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.id}>
              <Col md={4}>
                <FormControl
                  placeholder="Enter name props"
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.id)}
                />
              </Col>
              <Col md={4}>
                <FormControl
                  placeholder="Enter props"
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.id)}
                />
              </Col>
              <Col md={4}>
                <Button variant="outline-danger" onClick={() => removeInfo(i.id)}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="img">Img</Form.Label>
          <Form.Control
            type="file"
            name="img"
            placeholder={`Enter img`}
            onChange={selectFile}
            onBlur={createForm.handleBlur}
          />
        </Form.Group>

        <Row className="mt-5">
          <Col md={4} className="m-auto">
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              Enter
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DeviceForm;
