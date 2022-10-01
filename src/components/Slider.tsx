import React from 'react';
import CartItem from '../components/CartItem';
import { Device } from '../types';

interface SliderProps {
  title: string;
  items: Device[];
}

const Slider: React.FC<SliderProps> = ({ items, title }) => {
  const [currentSlide, setCurentSlide] = React.useState(1);
  const itemsPerPage = 4;
  const totalSlide = Math.ceil(items.length / itemsPerPage);

  const lastIndexSlide = currentSlide * itemsPerPage;
  const firstIndexSlide = lastIndexSlide - itemsPerPage;

  const slideContent = items.slice(firstIndexSlide, lastIndexSlide);

  const width = (currentSlide / totalSlide) * 100;

  const nextSlide = () => {
    if (totalSlide <= currentSlide) {
      setCurentSlide(1);
    } else {
      setCurentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="slider-hit">
      <h2>{title}</h2>
      <div className="slider-hit__wrapper">
        {slideContent.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </div>
      {slideContent.length > 4 ? (
        <>
          <span className="slider-hit__next" onClick={nextSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="currentColor"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </span>
          <div className="slider-hit__loader" style={{ width: `${width}%` }} />
        </>
      ) : null}
    </div>
  );
};

export default Slider;
