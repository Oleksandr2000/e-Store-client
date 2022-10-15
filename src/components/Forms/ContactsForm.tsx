import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { LeftAnimation } from '../../animation';

const ContactsForm = () => {
  const FeedbackForm = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      phone: Yup.number()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      email: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
    }),

    onSubmit: (values) => {
      FeedbackForm.resetForm();
    },
  });
  return (
    <div className="feedback__form">
      <Form className="m-4" onSubmit={FeedbackForm.handleSubmit}>
        <motion.div custom={2} variants={LeftAnimation}>
          <Form.Group className="my-4">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder={`Enter name`}
              value={FeedbackForm.values.name}
              onChange={FeedbackForm.handleChange}
              onBlur={FeedbackForm.handleBlur}
            />
          </Form.Group>
        </motion.div>
        <motion.div custom={3} variants={LeftAnimation}>
          <Form.Group className="my-4">
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder={`Enter E-mail`}
              value={FeedbackForm.values.email}
              onChange={FeedbackForm.handleChange}
              onBlur={FeedbackForm.handleBlur}
            />
          </Form.Group>
        </motion.div>
        <motion.div custom={4} variants={LeftAnimation}>
          <Form.Group className="my-4">
            <Form.Label htmlFor="phone">Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder={`Enter number`}
              value={FeedbackForm.values.phone}
              onChange={FeedbackForm.handleChange}
              onBlur={FeedbackForm.handleBlur}
            />
          </Form.Group>
        </motion.div>
        <motion.div custom={5} variants={LeftAnimation}>
          <Button variant="primary" type="submit" className="mt-4" style={{ width: 200 }}>
            Enter
          </Button>
        </motion.div>
      </Form>
    </div>
  );
};

export default ContactsForm;
