import React from 'react';
import Slider from '../components/Slider';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchAllHit,
  fetchAllSale,
  fetchReviews,
  setSearchValue,
} from '../redux/slice/DeviceSlice';
import Grid from '../components/HomePage/Grid';
import SearchPanel from '../components/SearchPanel';
import { Button, Container } from 'react-bootstrap';
import Description from '../components/HomePage/Description';
import Advantages from '../components/HomePage/Advantages';
import Feedback from '../components/HomePage/Feedback';
import ReviewItem from '../components/ReviewItem';
import { motion } from 'framer-motion';
import { LeftAnimation } from '../animation';

const Home = () => {
  const dispatch = useAppDispatch();
  const { reviews } = useAppSelector((store) => store.device);

  React.useEffect(() => {
    dispatch(fetchReviews());
  }, []);

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
  const { sale, hits } = useAppSelector((store) => store.device);
  const isLoadingItems = useAppSelector((store) => store.device.status) === 'loading';

  React.useEffect(() => {
    dispatch(fetchAllHit());
    dispatch(fetchAllSale());
  }, []);

  return (
    <div className="main-page">
      <Description />

      <Slider items={sale} loading={isLoadingItems} className="home-page__title" title="Sale" />

      <Slider
        items={hits}
        loading={isLoadingItems}
        className="home-page__title"
        title="Most Popular Goods"
      />

      <Feedback />
      <Advantages />
      <Grid />
      <div className="container">
        <motion.section
          className="reviews-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}>
          <h2 className="home-page__title">Reviews our customers</h2>
          {reviews.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              custom={i + 1}
              variants={LeftAnimation}
              className="reviews-block__item">
              <ReviewItem {...item} />
            </motion.div>
          ))}
        </motion.section>
        <div className="search">
          <h2 className="home-page__title">Search Device</h2>
          <div className="search__control">
            <SearchPanel />
          </div>
          <div className="search__buttons d-flex justify-content-around flex-wrap mt-5">
            {buttons.map((item, i) => (
              <Button
                key={i}
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
      </div>
    </div>
  );
};

export default Home;
