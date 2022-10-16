import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAdd, fetchRemove, minusItem, removeProduct } from '../../redux/slice/BasketSlice';
import { addProduct } from '../../redux/slice/BasketSlice';

interface BasketItemProps {
  id: number;
  name: string;
  price: number;
  img: string;
  basketDevice: {
    count: number;
  }[];
  count: number;
}

const BasketItem: React.FC<BasketItemProps> = ({ id, name, price, img, basketDevice, count }) => {
  const { user, token } = useAppSelector((store) => store.user.data);

  const dispatch = useAppDispatch();

  const addToCart = (userId: number, deviceId: number, decrement?: boolean) => {
    dispatch(fetchAdd({ userId: userId, deviceId: deviceId, decrement }));
  };

  const onRemove = (userId: number, deviceId: number) => {
    dispatch(fetchRemove({ userId: userId, deviceId: deviceId }));
  };

  const addToGuestCart = () => {
    const item = {
      id: id,
      name: name,
      price: price,
      img: price,
    };

    dispatch(addProduct(item));
  };

  const onDecrementGuestCart = (id: number) => {
    dispatch(minusItem(id));
  };

  const onRemoveGuestCart = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="basket-item">
      <img src={`https://pet-e-store.herokuapp.com/${img}`} alt="img" />
      <div className="basket-item__name">{name}</div>
      <div className="basket-item__price">{price * basketDevice[0].count}</div>
      <div className="basket-item__count">
        <span
          className="decrement"
          onClick={token ? () => addToCart(user.id, id, true) : () => onDecrementGuestCart(id)}>
          -
        </span>
        <span className="count">{basketDevice[0].count}</span>
        <span
          className="increment"
          onClick={token ? () => addToCart(user.id, id) : () => addToGuestCart()}>
          +
        </span>
      </div>
      <button
        className="delete"
        onClick={token ? () => onRemove(user.id, id) : () => onRemoveGuestCart(id)}>
        Remove
      </button>
    </div>
  );
};

export default BasketItem;
