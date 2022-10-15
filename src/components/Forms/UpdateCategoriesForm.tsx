import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../hooks';
import { Brand, Type } from '../../types';

interface FormProps {
  name: string;
  onClick: (body: any) => any;
  onClickDestroy: (body: any) => any;
  items: Type[] | Brand[];
}

const UpdateCategoriesForm: React.FC<FormProps> = ({ name, onClick, items, onClickDestroy }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<any>();
  const dispatch = useAppDispatch();

  const UpdateCategories = useFormik({
    initialValues: {
      id: null,
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
    }),

    onSubmit: (values) => {
      dispatch(onClick(values));
      UpdateCategories.resetForm();
      setSelectedCategory(0);
    },
  });

  React.useEffect(() => {
    if (selectedCategory) {
      UpdateCategories.setFieldValue('id', selectedCategory);
    }
  }, [selectedCategory]);

  function destoyCategory() {
    if (selectedCategory) {
      dispatch(onClickDestroy({ id: Number(selectedCategory) }));
      setSelectedCategory(0);
    } else {
      alert('Select Category');
    }
  }

  return (
    <>
      <Card style={{ width: 600 }} className="mt-5">
        <h2 className="d-flex justify-content-center mt-2">Select {name}</h2>
        <Form.Group className="mx-4 mt-3">
          <Form.Label>Select {name}</Form.Label>
          <Form.Select
            placeholder={`Select Device`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option>Select {name}</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form className="m-4" onSubmit={UpdateCategories.handleSubmit}>
          <Form.Group className="mb-3" />
          <Form.Label htmlFor="name">{name}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder={`Enter new name`}
            value={UpdateCategories.values.name}
            onChange={UpdateCategories.handleChange}
            onBlur={UpdateCategories.handleBlur}
          />
          <Row>
            <Col md={6} className="mt-4 d-flex justify-content-start">
              <Button variant="primary" type="submit" style={{ width: 150 }}>
                Update
              </Button>
            </Col>
            <Col md={6} className="mt-4 d-flex justify-content-end">
              <Button
                variant="danger"
                type="button"
                style={{ width: 150 }}
                onClick={destoyCategory}>
                Destroy Category
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default UpdateCategoriesForm;
