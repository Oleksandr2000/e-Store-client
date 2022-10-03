import React from 'react';
import Slider from '../components/Slider';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAllHit, fetchAllSale, setSearchValue } from '../redux/slice/DeviceSlice';
import Loader from '../components/Loader';
import Grid from '../components/Grid';
import SearchPanel from '../components/SearchPanel';
import { Button, Container } from 'react-bootstrap';
import MainSlider from '../components/MainSlider';

const Home = () => {
  const dispatch = useAppDispatch();

  const buttons: string[] = [
    'iPhone',
    'Xiaomi',
    'Samsung',
    'Meizu',
    'Sony',
    'iPhone',
    'Xiaomi',
    'Samsung',
    'Meizu',
    'Sony',
  ];
  const { sale, hits, status } = useAppSelector((store) => store.device);
  const isLoadingItems = useAppSelector((store) => store.device.status) === 'loading';

  React.useEffect(() => {
    dispatch(fetchAllHit());
    dispatch(fetchAllSale());
  }, []);

  if (isLoadingItems || !status) {
    return <Loader styles={'loader'} />;
  }

  return (
    <div className="main-page">
      <MainSlider />
      <Container>
        {sale.length > 0 ? <Slider items={sale} title="Sale" /> : null}
        {hits.length > 0 ? <Slider items={hits} title="Most Popular Goods" /> : null}

        <Grid />
        <div className="search">
          <div className="search__control">
            <SearchPanel />
          </div>
          <div className="search__buttons d-flex justify-content-around flex-wrap mt-5">
            {buttons.map((item) => (
              <Button
                variant="success"
                className="m-2"
                onClick={() => {
                  dispatch(setSearchValue(item));
                }}>
                {item}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
