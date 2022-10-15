import React from 'react';
import Delivery from '../components/AboutPage/Delivery';
import Garanty from '../components/AboutPage/Garanty';
import Payment from '../components/AboutPage/Payment';

const About = () => {
  return (
    <div className="about">
      <Delivery />
      <Payment />
      <Garanty />
    </div>
  );
};

export default About;
