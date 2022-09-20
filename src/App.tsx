import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';
import Header from './components/Header';
import './sass/app.scss';
import { useAppDispatch } from './hooks';
import Container from 'react-bootstrap/Container';
import { fetchBrands } from './redux/slice/BrandSlice';
import { fetchType } from './redux/slice/TypeSlice';

import { fetchAuth } from './redux/slice/UserSlice';
import Footer from './components/Footer';

function App() {
  const isAuth = true;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchType());
    dispatch(fetchBrands());

    dispatch(fetchAuth());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          {isAuth &&
            authRoutes.map((route: any, i: number) => (
              <Route path={route.path} element={<route.element />} key={i} />
            ))}
          {publicRoutes.map((route: any, i: number) => (
            <Route path={route.path} element={<route.element />} key={i} />
          ))}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
