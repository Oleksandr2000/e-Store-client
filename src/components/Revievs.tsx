import React from 'react';
import RevievsForm from './Forms/RevievsForm';
import { useAppSelector } from '../hooks';
import { Review } from '../types';
import ReviewItem from './ReviewItem';

const Revievs = () => {
  const { device } = useAppSelector((store) => store.device);

  return (
    <>
      <div className="reviews">
        {device.reviews && (
          <div className="reviews__wrapper">
            {device.reviews.map((item: Review) => (
              <ReviewItem {...item} key={item.id} />
            ))}
          </div>
        )}
      </div>
      <RevievsForm />
    </>
  );
};

export default Revievs;
