import React from 'react';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviews } from '../../redux/slice/UserSlice';
import { fetchOneDevice } from '../../redux/slice/DeviceSlice';
import { useParams } from 'react-router';

const RevievsForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { device } = useAppSelector((store) => store.device);
  const { user } = useAppSelector((store) => store.user.data);

  const ReviesForm = useFormik({
    initialValues: {
      text: '',
      author: user ? user.email : 'Guest',
      deviceId: device.id,
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
    }),

    onSubmit: async (values) => {
      await dispatch(postReviews(values));
      dispatch(fetchOneDevice({ id: Number(id) }));
    },
  });

  return (
    <Form onSubmit={ReviesForm.handleSubmit}>
      <Form.Group className="mb-3" />
      <Form.Label htmlFor="text"></Form.Label>
      <Form.Control
        as="textarea"
        type="text"
        name="text"
        placeholder={`Add reviews`}
        value={ReviesForm.values.text}
        onChange={ReviesForm.handleChange}
        onBlur={ReviesForm.handleBlur}
      />
      <Row className="d-flex">
        <Button variant="primary" type="submit" className="mt-3 m-auto" style={{ width: 200 }}>
          Add reviews
        </Button>
      </Row>
    </Form>
  );
};

export default RevievsForm;
