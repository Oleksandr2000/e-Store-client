import React from 'react';
import Slider from '../components/Slider';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAllDevice, fetchAllHit, fetchAllSale } from '../redux/slice/DeviceSlice';
import Loader from '../components/Loader';
import Grid from '../components/Grid';
import SearchPanel from '../components/SearchPanel';

const Home = () => {
  const dispatch = useAppDispatch();

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
      {sale.length > 0 ? <Slider items={sale} title="Sale" /> : null}
      {hits.length > 0 ? <Slider items={hits} title="Most Popular Goods" /> : null}

      <Grid />
      <SearchPanel />
    </div>
  );
};

export default Home;
