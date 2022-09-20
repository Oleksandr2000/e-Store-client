import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../hooks';
import { createBrand } from '../redux/slice/BrandSlice';
import { createType } from '../redux/slice/TypeSlice';

interface DeviceFormpRrops {
  name: string;
}

const CreateCategoriesForm: React.FC<DeviceFormpRrops> = ({ name }) => {
  const dispatch = useAppDispatch();

  const CreateCategories = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
    }),

    onSubmit: (values) => {
      if (name.toLowerCase() === 'brand') {
        dispatch(createBrand(values));
      }
      if (name.toLowerCase() === 'type') {
        dispatch(createType(values));
      } else {
        console.log(values);
      }
    },
  });

  return (
    <Card style={{ width: 600 }} className="mt-5">
      <h2 className="m-auto mt-2">Create {name}</h2>
      <Form className="m-4" onSubmit={CreateCategories.handleSubmit}>
        <Form.Group className="mb-3" />
        <Form.Label htmlFor="name">{name}</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder={`Enter name`}
          value={CreateCategories.values.name}
          onChange={CreateCategories.handleChange}
          onBlur={CreateCategories.handleBlur}
        />
        <Row className="d-flex justify-content-between">
          <Button variant="primary" type="submit" className="mt-4 m-auto" style={{ width: 200 }}>
            Enter
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default CreateCategoriesForm;
