import React from 'react';
import RevievsForm from '../components/RevievsForm';
import { useAppSelector } from '../hooks';
import { Review } from '../types';

const Revievs = () => {
  const { device } = useAppSelector((store) => store.device);

  return (
    <>
      <div className="reviews">
        {device.reviews && (
          <div className="reviews__wrapper">
            {device.reviews.map((item: Review) => (
              <div className="review" key={item.id}>
                <div className="review__info">
                  <h4 className="review__author">{item.author}</h4>
                  <div className="review__data">{item.createdAt.slice(0, 10)}</div>
                </div>

                <div className="review__text">{item.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <RevievsForm />
    </>
  );
};

export default Revievs;
