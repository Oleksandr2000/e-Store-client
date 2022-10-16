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
  BASKET_ROUTE,
} from '../utils/constant';
import { logout } from '../redux/slice/UserSlice';
import { Container } from 'react-bootstrap';
import { calcTotalCount } from '../services';
import SearchPanel from './SearchPanel';

const Header = () => {
  const isAuth = useAppSelector((store) => store.user.data.token);
  const { basket, guestBasket } = useAppSelector((store) => store.basket);
  const dispatch = useAppDispatch();

  const totalBasketCount = calcTotalCount(basket.items);
  const totalGuestCount = calcTotalCount(guestBasket);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log')) {
      dispatch(logout());
    }
  };

  return (
    <>
      <div className="header">
        <Container>
          <div className="header__wrapper">
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
                <Link to={BASKET_ROUTE}>
                  <Button variant="warning">
                    Basket {' | '}
                    {totalBasketCount}
                  </Button>
                </Link>
                <Link to={ADMIN_ROUTE}>
                  <Button variant="warning">Admin</Button>
                </Link>
                <Link to={ABOUT_ROUTE}>
                  <Button variant="primary">About</Button>
                </Link>
                <Button variant="danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="header__nav">
                <Link to={SHOP_ROUTE}>
                  <Button variant="primary">All products</Button>
                </Link>
                <Link to={BASKET_ROUTE}>
                  <Button variant="warning">
                    Basket {' | '}
                    {totalGuestCount}
                  </Button>
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
          </div>
        </Container>
      </div>
      <div className="subheader">
        <Container>
          <SearchPanel />
        </Container>
      </div>
    </>
  );
};

export default Header;
