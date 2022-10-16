import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const descrRightAnimation = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: (custom: any) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};

const pathAnimation = {
  hidden: {
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
  },
};

const Description = () => {
  return (
    <Container>
      <div className="description">
        <div className="description__wrapper">
          <motion.section initial="hidden" whileInView="visible" className="description__info">
            <motion.h1 custom={1} variants={descrRightAnimation} className="description__title">
              eStore.ua
            </motion.h1>
            <motion.div custom={2} variants={descrRightAnimation} className="description__subtitle">
              Internet shop that specialization generally on Apple, Samsung and Xiaomi. Our devices
              are original and new, we work with only official distributors and will be able garants
              high quality our products and high service in our shops.
              <br />
              We wait you in Kiev, Vynnytsa and Lviv.
            </motion.div>
            <motion.div custom={3} variants={descrRightAnimation}>
              <Button variant="primary">Leave contacts</Button>
            </motion.div>
          </motion.section>
          <div className="description__media">
            <div className="description__img">
              <img src="macbook.png" alt="MacBook" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Description;
