import { BasketDevice, Device } from '../types';

export const calcTotalCount = (arr: BasketDevice[] | Device[]) => {
  const totalCount = arr
    .map((item: any) => item.basketDevice[0].count)
    .reduce((value: number, sum: number) => sum + value, 0);

  return totalCount;
};

export const calcTotalPrice = (arr: BasketDevice[] | Device[]) => {
  const totalPrice = arr
    .map((item: any) => item.basketDevice[0].count * item.price)
    .reduce((value: number, sum: number) => sum + value, 0);

  return totalPrice;
};
