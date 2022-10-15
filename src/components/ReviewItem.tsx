import React from 'react';

const ReviewItem: React.FC<any> = ({ author, text, createdAt }) => {
  return (
    <div className="review">
      <div className="review__info">
        <h4 className="review__author">{author}</h4>
        <div className="review__data">{createdAt.slice(0, 10)}</div>
      </div>
      <div className="review__text">{text}</div>
    </div>
  );
};

export default ReviewItem;
