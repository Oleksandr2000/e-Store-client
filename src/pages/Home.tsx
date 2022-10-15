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
import Skeleton from '../components/Skeleton';
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
  const { sale, hits, status } = useAppSelector((store) => store.device);
  const isLoadingItems = useAppSelector((store) => store.device.status) === 'loading';

  React.useEffect(() => {
    dispatch(fetchAllHit());
    dispatch(fetchAllSale());
  }, []);

  return (
    <div className="main-page">
      <Description />

      <Container>
        {isLoadingItems || !status ? (
          [...Array(4)].map((item) => (
            <div className="m-auto">
              <Skeleton />
            </div>
          ))
        ) : (
          <Slider items={sale} title="Sale" />
        )}
        {isLoadingItems || !status ? (
          [...Array(4)].map((item) => (
            <div className="m-auto">
              <Skeleton />
            </div>
          ))
        ) : (
          <Slider items={hits} title="Most Popular Goods" />
        )}
      </Container>
      <Feedback />
      <Advantages />
      <Container>
        <Grid />
        <motion.section
          className="reviews-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}>
          <h2 className="reviews-block__title">Reviews our customers</h2>
          {reviews.map((item: any, i: number) => (
            <motion.div custom={i + 1} variants={LeftAnimation} className="reviews-block__item">
              <ReviewItem {...item} key={item.id} />
            </motion.div>
          ))}
        </motion.section>
        <div className="search">
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
      </Container>
    </div>
  );
};

export default Home;
