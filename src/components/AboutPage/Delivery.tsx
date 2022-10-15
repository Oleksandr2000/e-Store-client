import React from 'react';
import { Container } from 'react-bootstrap';

const Delivery = () => {
  return (
    <section className="delivery about-page__section">
      <Container>
        <div className="about-page__wrapper">
          <h2 className="about-page__title">Delivery</h2>
          <div className="about-page__item">
            <div className="about-page__item_title">
              Do you want to receive this product today?{' '}
            </div>
            <div className="about-page__item_description">
              Place your order before 4:00 p.m. and pick it up at our store in Kyiv (provided the
              product is in stock in Kyiv): TK Olimpiyskiy (Olympicskaya city) daily from 10:00 a.m.
              to 7:00 p.m. TRC Globus (Maidan Nezalezhnosti) daily from 10:00 a.m. to 7:00 p.m.
              Delivery of goods to the store according to your order is carried out FREE OF CHARGE.
              When placing an order, the operator of the eStore.ua contact center will specify the
              place and time of arrival for the purchase that is convenient for you. After
              confirming the order, you will receive a notification with information about its
              readiness. Reserved goods are stored in the store for no more than 24 hours. Please
              note that during an air raid, the Shopping Center will be closed at the entrance. At
              the point of issue, we comply with the requirements and norms corresponding to the
              sanitary and epidemiological situation in Ukraine. The staff works in masks, and there
              are also sanitizers that visitors can use to clean their hands and gadgets.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">Address delivery in Kyiv </div>
            <div className="about-page__item_description">
              Address delivery of orders in Kyiv is carried out from Monday to Saturday from 11:00
              a.m. to 6:00 p.m., the cost of delivery is UAH 150. The delivery time is agreed by the
              operator upon confirmation of your order. The specific delivery time will be agreed
              with you in advance directly by the courier. For comfortable customer service and
              timely delivery of all orders, the courier will be able to wait for you no more than
              15 minutes from the moment of arrival. Please be ready to receive your order. Orders
              made before 11:00 a.m. will be delivered on the day of the order if the goods are in
              stock in the city of Kyiv. Please note that orders are temporarily not delivered to
              the following areas: Sofievskaya Borshchagovka, Petropavlovskaya Borshchagovka and
              Koncha-Zaspa. Delivery is carried out to the entrance to the building, with the
              possibility of free passage. In the presence of the courier, carefully inspect the
              appearance and packaging of the goods. Be sure to check your order for compliance with
              the sales receipt before paying the courier. For safety reasons, product inspection
              and product-money exchange are carried out in the courier's car. We draw your
              attention to the fact that upon receiving the parcel from the courier and signing the
              act of acceptance and delivery, you confirm the fact of checking the parcel for
              compliance with your order, as well as agree with the appearance of the product, its
              packaging, and have no complaints against the online store.
            </div>
          </div>
          <div className="about-page__item">
            <div className="about-page__item_title">Delivery to the "Novaya Pochta" branch</div>
            <div className="about-page__item_description">
              Delivery is carried out to any branch of Nova Poshta of your choice. The cost of
              delivery depends on the type of payment and the cost of the product. The shipment of
              goods across Ukraine is paid by the buyer according to the tariffs of the Novaya
              Poshta delivery service. When the package arrives at your department, you will receive
              a notification and you will be able to pick up your order. If the order is confirmed
              before 16:00, the shipment is made on the day of the order. Delivery time to the
              department is 1 - 7 days. After sending the order, you will receive an SMS message
              with the express waybill number. You can find out the date of receipt and the cost of
              delivery of your order by calling our hotline or visiting the Novaya Pochta website.
              Payment of the order by cash on delivery is possible only on the condition of
              prepayment in the amount of the cost of delivery in both directions. The ability to
              pay by cash on delivery is temporarily unavailable in Kherson, Zaporozhye, Luhansk and
              Donetsk regions. Shipping to these areas is available after full payment of the order.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Delivery;
