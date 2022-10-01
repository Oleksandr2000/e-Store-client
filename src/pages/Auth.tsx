import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { fetchLogin, fetchRegister } from '../redux/slice/UserSlice';
import { LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE } from '../utils/constant';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import Loader from '../components/Loader';

const Login = () => {
  const { pathname } = useLocation();
  const { status, data } = useAppSelector((store) => store.user);
  const isLogin = pathname === '/login';

  const dispatch = useAppDispatch();

  const authForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
      password: Yup.string()
        .min(2, 'Минимальное количевство символов 2')
        .required('Обьязательное поле'),
    }),

    onSubmit: (values) => {
      isLogin ? dispatch(fetchLogin(values)) : dispatch(fetchRegister(values));
    },
  });

  if (status === 'loading') {
    return <Loader styles={'loader'} />;
  }

  if (status === 'loaded' && data.token) {
    return <Navigate to={SHOP_ROUTE} />;
  }

  if (status === 'error' && data.token) {
    alert('An error occurred');
  }

  return (
    <div className="auth">
      <Card style={{ width: 600 }} className="m-auto">
        <h2 className="m-auto mt-2">{isLogin ? 'Login' : 'Registration'}</h2>
        <Form className="m-4" onSubmit={authForm.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" placeholder="Enter email" onChange={authForm.handleChange} />
            {authForm.errors.email && authForm.touched.email ? (
              <div>{authForm.errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={authForm.handleChange}
            />
            {authForm.errors.password && authForm.touched.password ? (
              <div>{authForm.errors.password}</div>
            ) : null}
          </Form.Group>
          <Row className="d-flex justify-content-between">
            {isLogin ? (
              <div>
                You haven`t account? <Link to={REGISTER_ROUTE}>Registration</Link>
              </div>
            ) : (
              <div>
                You have account? <Link to={LOGIN_ROUTE}>Login</Link>
              </div>
            )}
            <Button variant="primary" type="submit" className="mt-4 m-auto" style={{ width: 200 }}>
              {isLogin ? 'Login' : 'Registration'}
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
