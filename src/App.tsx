import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';
import Header from './components/Header';
import './sass/app.scss';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchBrands } from './redux/slice/BrandSlice';
import { fetchType } from './redux/slice/TypeSlice';

import { fetchAuth } from './redux/slice/UserSlice';
import Footer from './components/Footer';
import { fetchBasket } from './redux/slice/BasketSlice';
import { Container } from 'react-bootstrap';

function App() {
  const isAuth = true;
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((store) => store.user.data.user);
  const { statusConfirm, statusAdd, status } = useAppSelector((store) => store.basket);
  const isFetchType = useAppSelector((store) => store.types.statusPOST) === 'loaded';
  const isFetchBrand = useAppSelector((store) => store.brands.statusPOST) === 'loaded';

  const fetchEffect = (id: number) => {
    if (isAuth) {
      dispatch(fetchBasket({ id: id }));
    }
  };

  React.useEffect(() => {
    fetchEffect(id);
  }, [id, statusConfirm, statusAdd, status]);

  React.useEffect(() => {
    dispatch(fetchType());
    dispatch(fetchBrands());

    dispatch(fetchAuth());
  }, [isFetchType, isFetchBrand]);

  return (
    <>
      <Header />
      <Routes>
        {isAuth &&
          authRoutes.map((route: any, i: number) => (
            <Route path={route.path} element={<route.element />} key={i} />
          ))}
        {publicRoutes.map((route: any, i: number) => (
          <Route path={route.path} element={<route.element />} key={i} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
