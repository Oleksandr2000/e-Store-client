import React from 'react';
import { Card, Col, FormControl, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createDevice } from '../redux/slice/DeviceSlice';

interface DeviceFormpRrops {}

const DeviceForm: React.FC<DeviceFormpRrops> = () => {
  type Info = {
    title: string;
    description: string;
    number: any;
  };

  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((store) => store.brands);
  const { types } = useAppSelector((store) => store.types);
  const [info, setInfo] = React.useState<Info[]>([]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number: any) => {
    setInfo(info.filter((item) => item.number !== number));
  };

  const changeInfo = (key: string, value: any, number: any) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const createForm = useFormik({
    initialValues: {
      name: '',
      price: '',
      type: '',
      brand: '',
      img: '',
      discount: '',
      hit: '',
      sale: '',
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

      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('img', values.img);
      formData.append('brandId', values.brand);
      formData.append('typeId', values.type);
      formData.append('hit', values.hit);
      formData.append('sale', values.sale);
      formData.append('discount', values.discount);
      formData.append('info', JSON.stringify(info));

      dispatch(createDevice(formData));
      console.log(values);
    },
  });

  const selectFile = (e: any) => {
    createForm.setFieldValue('img', e.target.files[0]);
  };

  return (
    <Card style={{ width: 600 }} className="mt-5">
      <h2 className="m-auto mt-2">CreateDevice</h2>
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
          <Form.Label>Type</Form.Label>
          <Form.Select
            name="type"
            placeholder={`Select type`}
            value={createForm.values.type}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}>
            <option>Select Type</option>
            {types.map((type) => (
              <option value={type.id}>{type.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="brand">Brand</Form.Label>
          <Form.Select
            name="brand"
            placeholder={`Select Brand`}
            onChange={createForm.handleChange}
            onBlur={createForm.handleBlur}>
            <option>Select Brand</option>
            {brands.map((brand) => (
              <option value={brand.id}>{brand.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="d-flex mb-3">
          <Form.Check type="switch" id="sale" label="Sale" onChange={createForm.handleChange} />
          <Form.Check
            className="mx-4"
            type="switch"
            id="hit"
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
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <FormControl
                  placeholder="Enter name props"
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <FormControl
                  placeholder="Enter props"
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Button variant="outline-danger" onClick={() => removeInfo(i.number)}>
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

        <Row className="d-flex justify-content-between">
          <Button variant="primary" type="submit" className="mt-4 m-auto" style={{ width: 200 }}>
            Enter
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default DeviceForm;
