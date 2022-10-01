import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Device } from '../../types';

export const createDevice = createAsyncThunk<void, any>('device/createDevice', async (params) => {
  const { data } = await axios.post('/device', params);
  return data;
});

export const fetchAllDevice = createAsyncThunk<
  DeviceRes,
  { filterBrand: string | null; filterType: string | null; limit: number; page: number }
>('device/fetchAllDevice', async (params) => {
  const { filterBrand, filterType, limit, page } = params;
  const { data } = await axios.get(
    `/device/?brandId=${filterBrand}&typeId=${filterType}&limit=${limit}&page=${page}`,
  );
  return data;
});

export const fetchOneDevice = createAsyncThunk<Device, { id: number }>(
  'device/fetchOneDevice',
  async (params) => {
    const { id } = params;
    const { data } = await axios.get(`/device/${id}`);
    return data;
  },
);

export const fetchAllSale = createAsyncThunk<Device[]>('device/fetchAllSale', async () => {
  const { data } = await axios.get('/sale');
  return data;
});

export const fetchAllHit = createAsyncThunk<Device[]>('device/fetchAllHit', async () => {
  const { data } = await axios.get('/hit');
  return data;
});

export type DeviceRes = {
  count: number;
  rows: Device[];
};

interface DeviceState {
  items: DeviceRes;
  hits: Device[];
  sale: Device[];
  device: Device;
  status: string | null;
  statusPOST: string | null;
  limit: number;
  page: number;
}

const initialState: DeviceState = {
  items: {
    count: 0,
    rows: [],
  },
  hits: [],
  sale: [],
  device: {
    rating: 0,
    id: 0,
    name: '',
    price: 0,
    brandId: 0,
    typeId: 0,
    sale: false,
    discount: 0,
    hit: false,
    img: '',
    info: [],
  },
  status: null,
  statusPOST: null,
  limit: 6,
  page: 1,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.page = action.payload;
    },
    clearStatusPost: (state) => {
      state.statusPOST = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDevice.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(createDevice.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(createDevice.rejected, (state) => {
        state.statusPOST = 'error';
      })
      .addCase(fetchAllDevice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDevice.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
      })
      .addCase(fetchAllDevice.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchOneDevice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOneDevice.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.device = action.payload;
      })
      .addCase(fetchOneDevice.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAllHit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllHit.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.hits = action.payload;
      })
      .addCase(fetchAllHit.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAllSale.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSale.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.sale = action.payload;
      })
      .addCase(fetchAllSale.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setActivePage, clearStatusPost } = deviceSlice.actions;

export default deviceSlice.reducer;
