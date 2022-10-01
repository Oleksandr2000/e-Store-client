import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import CartItem from '../components/CartItem';
import { Card, Pagination } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBrands } from '../redux/slice/BrandSlice';
import { fetchAllDevice, setActivePage } from '../redux/slice/DeviceSlice';
import { fetchType } from '../redux/slice/TypeSlice';
import NoDevice from '../components/NoDevice';
import Loader from '../components/Loader';

const Shop = () => {
  const dispatch = useAppDispatch();
  const { items, status, limit, page } = useAppSelector((store) => store.device);
  const { activeBrands } = useAppSelector((store) => store.brands);
  const { activeType } = useAppSelector((store) => store.types);

  const pages = Math.ceil(items.count) / limit;

  const arrPage = [];

  for (let i = 0; i < pages; i++) {
    arrPage.push(i + 1);
  }

  const isLoadingBrands = useAppSelector((store) => store.brands.status) === 'loading';
  const isLoadingTypes = useAppSelector((store) => store.types.status) === 'loading';
  const isLoadingItems = useAppSelector((store) => store.device.status) === 'loading';

  React.useEffect(() => {
    dispatch(fetchAllDevice({ filterBrand: '', filterType: '', limit, page: 1 }));
  }, []);

  React.useEffect(() => {
    const filterParseBrand = activeBrands.join(',');
    const filterParseType = activeType.join(',');
    dispatch(
      fetchAllDevice({ filterBrand: filterParseBrand, filterType: filterParseType, limit, page }),
    );
  }, [page, activeBrands, activeType]);

  React.useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  React.useEffect(() => {
    dispatch(fetchType());
  }, []);

  const setPage = (i: number) => {
    dispatch(setActivePage(i));
  };

  if (isLoadingBrands || isLoadingTypes || isLoadingItems || !status) {
    return <Loader styles={'loader'} />;
  }

  return (
    <>
      <Row className="device">
        <Col xs={2}>
          <Card className="p-3 device__card">
            <Filter />
          </Card>
        </Col>

        {items.rows.length > 0 ? (
          <Col xs={10} className="device__wrapper mb-5">
            {items.rows.map((item) => (
              <CartItem {...item} key={item.id} />
            ))}
          </Col>
        ) : (
          <Col xs={10} className="mb-5">
            <NoDevice />
          </Col>
        )}
      </Row>
      <Row className="mb-5">
        <Pagination>
          {arrPage.map((item, i) => (
            <Pagination.Item active={page === item} onClick={() => setPage(item)} key={i}>
              {item}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </>
  );
};

export default Shop;
