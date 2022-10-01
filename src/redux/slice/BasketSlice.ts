import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { BasketDevice, Device, FetchAddParams, FetchConfirmParams } from '../../types';

export const fetchAdd = createAsyncThunk<any, any>('basket/fetchAdd', async (params) => {
  const { data } = await axios.post('/basket', params);
  return data;
});

export const fetchBasket = createAsyncThunk<Device[], { id: number }>(
  'basket/fetchBasket',
  async ({ id }) => {
    const { data } = await axios.get(`basket/${id}`);
    return data;
  },
);

export const fetchConfirm = createAsyncThunk<void, FetchConfirmParams>(
  'basket/fetchConfirm',
  async (params) => {
    await axios.post('/order', params);
  },
);

export const fetchRemove = createAsyncThunk<void, { deviceId: number; userId: number }>(
  'basket/fetchRemove',
  async (params) => {
    const { userId, deviceId } = params;
    await axios.delete(`/basket/${userId.toString()}.${deviceId.toString()}`);
  },
);

interface BasketState {
  basket: {
    items: Device[];
    status: string;
  };
  guestBasket: BasketDevice[];
  status: string;
  statusConfirm: string;
  statusAdd: string;
}

const initialState: BasketState = {
  basket: {
    items: [],
    status: '',
  },
  guestBasket: [],
  status: '',
  statusConfirm: '',
  statusAdd: '',
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.guestBasket.find((obj: BasketDevice) => obj.id === action.payload.id);

      if (findItem?.basketDevice) {
        findItem.basketDevice[0].count++;
      } else {
        state.guestBasket.push({ ...action.payload });
      }
    },
    minusItem(state, action) {
      const findItem = state.guestBasket.find((obj: BasketDevice) => obj.id === action.payload);

      if (findItem?.basketDevice[0].count && findItem.basketDevice[0].count > 1) {
        findItem.basketDevice[0].count--;
      } else {
        state.guestBasket = state.guestBasket.filter((obj) => obj.id !== action.payload);
      }
    },
    removeProduct(state, action) {
      state.guestBasket = state.guestBasket.filter((obj) => obj.id !== action.payload);
    },
    clearBasket(state) {
      state.guestBasket = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdd.pending, (state) => {
        state.statusAdd = 'loading';
      })
      .addCase(fetchAdd.fulfilled, (state) => {
        state.statusAdd = 'loaded';
      })
      .addCase(fetchAdd.rejected, (state) => {
        state.statusAdd = 'error';
      })
      .addCase(fetchBasket.pending, (state) => {
        state.basket.status = 'loading';
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.basket.items = action.payload;
        state.basket.status = 'loaded';
      })
      .addCase(fetchBasket.rejected, (state) => {
        state.basket.status = 'error';
      })
      .addCase(fetchConfirm.pending, (state) => {
        state.statusConfirm = 'loading';
      })
      .addCase(fetchConfirm.fulfilled, (state) => {
        state.statusConfirm = 'loaded';
      })
      .addCase(fetchConfirm.rejected, (state) => {
        state.statusConfirm = 'error';
      })
      .addCase(fetchRemove.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRemove.fulfilled, (state) => {
        state.status = 'loaded';
      });
  },
});

export const { addProduct, minusItem, removeProduct, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
