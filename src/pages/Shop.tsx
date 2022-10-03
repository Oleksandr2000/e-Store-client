import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import CartItem from '../components/CartItem';
import { Card, Container, Pagination } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAllDevice, setActivePage } from '../redux/slice/DeviceSlice';
import NoDevice from '../components/NoDevice';
import Skeleton from '../components/Skeleton';
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

  const setPage = (i: number) => {
    dispatch(setActivePage(i));
  };

  return (
    <>
      <Container>
        <Row className="device">
          <Col xs={2}>
            <Card className="p-3 device__card">
              <Filter />
            </Card>
          </Col>

          {items.rows.length === 0 && !isLoadingItems ? (
            <Col xs={10} className="mb-5">
              <NoDevice />
            </Col>
          ) : (
            <Col xs={10} className="device__wrapper mb-5">
              {isLoadingItems
                ? [...Array(6)].map((item) => (
                    <div className="m-auto">
                      <Skeleton />
                    </div>
                  ))
                : items.rows.map((item) => <CartItem {...item} key={item.id} />)}
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
      </Container>
    </>
  );
};

export default Shop;
