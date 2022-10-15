import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../hooks';

interface DeviceFormpRrops {
  name: string;
  onClick: (body: any) => any;
}

const CreateCategoriesForm: React.FC<DeviceFormpRrops> = ({ name, onClick }) => {
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
      dispatch(onClick(values));
      CreateCategories.resetForm();
    },
  });

  return (
    <>
      <Card style={{ width: 600 }} className="mt-5">
        <h2 className="d-flex justify-content-center mt-2">Create {name}</h2>
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
    </>
  );
};

export default CreateCategoriesForm;
