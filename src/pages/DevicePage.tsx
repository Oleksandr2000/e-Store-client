import React from 'react';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import AdditionalDeviceBar from '../components/AdditionalDeviceBar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchOneDevice, fetchAllSale } from '../redux/slice/DeviceSlice';
import { addProduct, fetchAdd } from '../redux/slice/BasketSlice';
import { BasketDevice } from '../types';
import ModalLoader from '../components/ModalLoader';

const DevicePage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { device, status } = useAppSelector((store) => store.device);
  const { types } = useAppSelector((store) => store.types);
  const { user, token } = useAppSelector((store) => store.user.data);

  const isLoadingBrands = useAppSelector((store) => store.brands.status) === 'loading';
  const isLoadingTypes = useAppSelector((store) => store.types.status) === 'loading';
  const isLoadingItems = useAppSelector((store) => store.device.status) === 'loading';
  const isAddDevice = useAppSelector((store) => store.basket.statusAdd) === 'loading';
  const isAddReviews = useAppSelector((store) => store.user.statusPOST) === 'loading';

  const deviceType = types.filter((type) => type.id == device.typeId);

  React.useEffect(() => {
    dispatch(fetchOneDevice({ id: Number(id) }));
  }, []);

  React.useEffect(() => {
    dispatch(fetchAllSale());
  }, []);

  const addToCart = (userId: number, deviceId: number) => {
    dispatch(fetchAdd({ userId: userId, deviceId: deviceId }));
  };

  const addToGuestCart = () => {
    if (device) {
      const item: BasketDevice = {
        id: device.id,
        name: device.name,
        price: device.price,
        img: device.img,
        basketDevice: [
          {
            count: 1,
          },
        ],
      };

      dispatch(addProduct(item));
    }
  };

  if (isLoadingBrands || isLoadingTypes || isLoadingItems || !status) {
    return <Loader styles={'loader'} />;
  }

  return (
    <div>
      <div className="device">
        <div className="device__image">
          <img src={`http://localhost:4444/${device.img}`} alt="logo" />
        </div>
        <div className="device__info">
          <div className="device__header">
            <h1 className="mb-1">{device.name}</h1>
            {[...Array(5)].map((__, i) => (
              <svg
                key={i}
                style={{ color: '#f89b24' }}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-star-fill mx-1"
                viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            ))}
          </div>
          <div className="d-flex ">
            <div className="device__info-engineering">
              <div className="device-engineering__item-price">
                <b>{device.price}</b>
              </div>
              <div className="device-engineering__item">
                {deviceType.map((type) => (
                  <button key={type.id} className="px-2 button__filter">
                    {type.name}
                  </button>
                ))}
              </div>

              {device.info && (
                <div className="device-engineering__item-descr">
                  {device.info.map((item) => (
                    <div key={item.id} className="d-flex">
                      <div className="m-1">{item.title} :</div>
                      <div className="m-1">{item.description};</div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="device-engineering__item-buy button__buy"
                onClick={token ? () => addToCart(user.id, device.id) : () => addToGuestCart()}>
                Add to Cart
              </button>
            </div>
            <div className="device__info-general">
              <div className="payment">
                <div className="d-flex">
                  <img
                    className="mx-2"
                    src="https://estore.ua/ua/media/benefit/image/i/c/icons8-empty-box-35-2-2.png"
                    alt="icons"
                    width={35}
                    height={35}
                  />
                  <h3>Payment:</h3>
                </div>
                <ul className="payment__list">
                  <li>Cash on delivery.</li>
                  <li>Cryptocurrency. </li>
                  <li>Payment by card.</li>
                  <li>Installment up to six payments.</li>
                </ul>
              </div>
              <div className="delivery">
                <div className="d-flex">
                  <img
                    className="mx-2"
                    src="https://estore.ua/ua/media/benefit/image/i/c/icons8-ukrainian-hryvnia-35-2_1-2.png"
                    alt="icons"
                    width={35}
                    height={35}
                  />
                  <h3>Delivery:</h3>
                </div>
                <ul className="delivery__list">
                  <li>Pickup from the store</li>
                  <li>Delivery to the post office. </li>
                  <li>Delivery by courier.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdditionalDeviceBar />
      {isAddDevice && <ModalLoader />}
      {isAddReviews && <ModalLoader />}
    </div>
  );
};

export default DevicePage;
