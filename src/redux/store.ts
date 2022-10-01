import { configureStore } from '@reduxjs/toolkit';
import BasketSlice from './slice/BasketSlice';
import BrandSlice from './slice/BrandSlice';
import DeviceSlice from './slice/DeviceSlice';
import TypeSlice from './slice/TypeSlice';
import UserSlice from './slice/UserSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    device: DeviceSlice,
    brands: BrandSlice,
    types: TypeSlice,
    basket: BasketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
