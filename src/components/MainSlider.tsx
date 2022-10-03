import { Carousel } from 'react-bootstrap';

const MainSlider = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src="/slideIphone.jpg" alt="Samsung" className="slider__image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/slideMacbook.jpg" alt="Samsung" className="slider__image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/slideApple.jpg" alt="Samsung" className="slider__image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="/slideXiaomi.jpg" alt="Samsung" className="slider__image" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default MainSlider;
