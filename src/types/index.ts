export type Review = {
  id: number;
  text: string;
  author: string;
  createdAt: string;
};

export type Info = {
  id: number;
  title: string;
  description: string;
};

export type Device = {
  rating: number;
  id: number;
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  img: string;
  sale: boolean;
  hit: boolean;
  discount: number;
  info?: Info[];
  reviews?: Review[];
  count?: number;
};

export type BasketDevice = {
  id: number;
  name: string;
  price: number;
  img: string;
  basketDevice: { count: number }[];
};

export type FetchAddParams = {
  userId: number;
  deviceId: number;
  decrement?: boolean;
};

export type FetchConfirmParams = {
  userId?: number;
  guestBasket?: number[];
  email?: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type Type = {
  id: number;
  name: string;
};

export type UserData = {
  email: string;
  password: string;
};
