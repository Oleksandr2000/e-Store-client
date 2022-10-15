import React from 'react';
import { Container } from 'react-bootstrap';

const Advantages = () => {
  return (
    <div className="advantages">
      <Container>
        <div className="advantages__wrapper">
          <div className="advantages__item">
            <img className="advantages__item_icon" src="advantages.png" alt="icon" />
            <div className="advantages__item_count"> 100 000 +</div>
            <div className="advantages__item_name">Customers were satisfied</div>
          </div>
          <div className="advantages__item">
            <img className="advantages__item_icon" src="advantages.png" alt="icon" />
            <div className="advantages__item_count">1000 +</div>
            <div className="advantages__item_name">Different goods in assortment</div>
          </div>
          <div className="advantages__item">
            <img className="advantages__item_icon" src="advantages.png" alt="icon" />
            <div className="advantages__item_count">2 +</div>
            <div className="advantages__item_name">Guarantees from the store</div>
          </div>
          <div className="advantages__item">
            <img className="advantages__item_icon" src="advantages.png" alt="icon" />
            <div className="advantages__item_count">100 000 +</div>
            <div className="advantages__item_name">We pay this tax every month</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Advantages;
