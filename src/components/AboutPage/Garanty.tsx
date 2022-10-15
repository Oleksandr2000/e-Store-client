import React from 'react';
import { Container } from 'react-bootstrap';

const Garanty = () => {
  return (
    <section className="garanty about-page__section">
      <Container>
        <div className="about-page__wrapper">
          <h2 className="about-page__title">Garanty</h2>
          <div className="about-page__item">
            <div className="about-page__item_title">Guaranteed repair</div>
            <div className="about-page__item_description">
              If the product requires warranty service, please contact us by phone (050)-704-0704
              (Mon - Fri from 9:00 a.m. to 6:00 p.m.) If you are not in the city of Kyiv, the
              shipment of goods for warranty repair is carried out through the "New Post" postal
              service. Provided that the warranty conditions are met, the costs of shipping the
              goods are borne by the eStore company. The device cannot be accepted for warranty
              repair if: - the presence of mechanical and other damage caused by intentional or
              careless actions of the buyer or third parties - violations of the rules of use set
              forth by the manufacturer - unauthorized opening, repair or modification of internal
              communications and components - damage caused by foreign objects, substances, liquids
              or extreme temperatures falling inside the product Unfortunately, the manufacturer
              does not provide a warranty for accessories that are included with the device, but you
              can always purchase original Apple accessories on our website.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">
              Exchange and return of goods within 14 days after purchase.
            </div>
            <div className="about-page__item_description">
              According to the "Law of Ukraine on the Protection of Consumer Rights", buyers of our
              store have the right to exchange goods of proper quality within fourteen days. Please
              note that only new goods that have not been used and have no signs of use are subject
              to exchange or return, namely: scratches, scuffs, damage, software that has not been
              modified, etc. The following must be preserved: a complete set of goods, integrity,
              undamaged and all parts of the packaging, labels, protective films, factory markings.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">Refund of funds </div>
            <div className="about-page__item_description">
              For orders paid by cash on delivery or bank card, the refund is made to the card
              within 3 working days from the moment of confirmation of the refund by our manager.
              The term of crediting money depends on the bank issuing your card and can be 3-5
              working days. Depositing and withdrawing funds according to the tariffs of your card.
              We want your devices to work properly and you don't have to face additional
              inconveniences. But if such a problem does happen, we will do everything possible so
              that you can use a working device as soon as possible. During the warranty period, we
              can provide you with a second iPhone so that you can stay connected. We recommend that
              you regularly make a backup copy of your device data. The principles of our work in
              warranty service are based on loyalty to our customers and an individual approach to
              each application.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Garanty;
