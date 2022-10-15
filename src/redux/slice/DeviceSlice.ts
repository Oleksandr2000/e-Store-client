import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Device } from '../../types';

export const createDevice = createAsyncThunk<any, any>('device/createDevice', async (params) => {
  const { data } = await axios.post('/device', params);
  return data;
});

export const updateDevice = createAsyncThunk<any, any>('device/updateDevice', async (params) => {
  const { data } = await axios.patch('/device', params);
  return data;
});

export const fetchAllDevice = createAsyncThunk<
  DeviceRes,
  {
    filterBrand: string | null;
    filterType: string | null;
    limit: number;
    page: number;
  }
>('device/fetchAllDevice', async (params) => {
  const { filterBrand, filterType, limit, page } = params;

  const { data } = await axios.get(
    `/device/?brandId=${filterBrand}&typeId=${filterType}&limit=${limit}&page=${page}`,
  );

  return data;
});

export const fetchSearchDevice = createAsyncThunk<
  Device[],
  {
    filterBrand: string | null;
    filterType: string | null;
    str: string | null;
  }
>('device/fetchSearchDevice', async (params) => {
  const { filterBrand, filterType, str } = params;

  const { data } = await axios.get(
    `/device/?brandId=${filterBrand}&typeId=${filterType}&str=${str}`,
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

export const fetchReviews = createAsyncThunk<any>('device/fetchReviews', async () => {
  const { data } = await axios.get('/reviews');
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
  searchItems: Device[];
  device: Device;
  reviews: any;
  status: string | null;
  searchLoading: string | null;
  statusPOST: string | null;
  limit: number;
  page: number;
  searchValue: string;
}

const initialState: DeviceState = {
  items: {
    count: 0,
    rows: [],
  },
  searchItems: [],
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
  reviews: [],
  status: null,
  statusPOST: null,
  searchLoading: null,
  limit: 6,
  page: 1,
  searchValue: '',
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
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
      .addCase(updateDevice.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(updateDevice.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(updateDevice.rejected, (state) => {
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
      .addCase(fetchSearchDevice.pending, (state) => {
        state.searchLoading = 'loading';
      })
      .addCase(fetchSearchDevice.fulfilled, (state, action) => {
        state.searchLoading = 'loaded';
        state.searchItems = action.payload;
      })
      .addCase(fetchSearchDevice.rejected, (state) => {
        state.searchLoading = 'error';
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
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setActivePage, clearStatusPost, setSearchValue } = deviceSlice.actions;

export default deviceSlice.reducer;
