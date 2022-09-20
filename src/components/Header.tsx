import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Link } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
  ABOUT_ROUTE,
} from '../utils/constant';
import { logout } from '../redux/slice/UserSlice';
import { Container } from 'react-bootstrap';

const Header = () => {
  const isAuth = useAppSelector((store) => store.user.data);
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <Container className="header__wrapper">
        <Link to={HOME_ROUTE}>
          <div className="header__logo">
            <img src="/logo-eStore.svg" alt="eStore" className="logo" />
          </div>
        </Link>

        {isAuth ? (
          <div className="header__nav">
            <Link to={SHOP_ROUTE}>
              <Button variant="primary">All products</Button>
            </Link>
            <Link to={ADMIN_ROUTE}>
              <Button variant="warning">Admin</Button>
            </Link>
            <Link to={ABOUT_ROUTE}>
              <Button variant="primary">About</Button>
            </Link>
            <Button variant="danger" onClick={() => dispatch(logout())}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className="header__nav">
            <Link to={SHOP_ROUTE}>
              <Button variant="primary">All products</Button>
            </Link>
            <Link to={ABOUT_ROUTE}>
              <Button variant="primary">About</Button>
            </Link>
            <Link to={LOGIN_ROUTE}>
              <Button variant="primary">Login</Button>
            </Link>
            <Link to={REGISTER_ROUTE}>
              <Button variant="primary">Register</Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;
