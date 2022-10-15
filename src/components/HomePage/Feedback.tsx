import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { LeftAnimation, OpacityAnimation } from '../../animation';
import ContactsForm from '../Forms/ContactsForm';

const Feedback = () => {
  return (
    <div className="feedback">
      <Container>
        <motion.section initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }}>
          <motion.h2 custom={1} variants={LeftAnimation} className="feedback__title m-4">
            Leave Contacts
          </motion.h2>
          <div className="feedback__wrapper">
            <ContactsForm />
            <div className="feedback__media">
              <motion.img custom={5} variants={OpacityAnimation} src="iPhone.png" alt="mac" />
            </div>
          </div>
        </motion.section>
      </Container>
    </div>
  );
};

export default Feedback;
