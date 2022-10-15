import React from 'react';
import { Container } from 'react-bootstrap';

const Payment = () => {
  return (
    <section className="payment about-page__section">
      <Container>
        <div className="about-page__wrapper">
          <h2 className="about-page__title">Payment</h2>
          <div className="about-page__item">
            <div className="about-page__item_title">Payment in cash upon receipt of goods</div>
            <div className="about-page__item_description">
              Payment in cash upon receipt of the goods is possible when choosing delivery by
              courier in Lviv or Samovyvozo in Kyiv Payment is made exclusively in national
              currency.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">Transfer to FOP Visa \ MasterCard </div>
            <div className="about-page__item_description">
              You can pay for your order by transfer to the FLP account through online banking or
              the application of your bank, when choosing this payment method, the amount will be
              equal to the cost of the order + 2%. Money is credited within an hour. If you used the
              "Buy in one click" button or placed an order by phone, our manager will send you
              payment details. For a refund upon order cancellation, contact our hotline +38 097 800
              8888 and leave a request. Money will be returned to the card within 3 working days.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">Payment by card on the site</div>
            <div className="about-page__item_description">
              You can pay for your order with Visa and Mastercard payment cards directly on the
              website, at the time of placing the order. When choosing this payment method, the
              amount will be equal to the cost of the order + 5%. If you used the "Buy in one click"
              button or placed an order by phone, our manager will send you a link through which you
              can pay by card online. For a refund upon order cancellation, contact our hotline +38
              097 800 8888 and leave a request. Money will be returned to the card within 3 working
              days.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">Cryptocurrency payment without commission.</div>
            <div className="about-page__item_description">
              You can pay for your order with Tether, Bitcoin, Ethereum, and more than 10 other
              cryptocurrencies. When the order is processed, our manager will contact you and
              provide a link for payment. The link is valid for 30 minutes. If you haven't made the
              payment within this time, please contact our contact center to receive a new link.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Payment;
