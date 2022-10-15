import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Brand } from '../../types';

export const createBrand = createAsyncThunk<void, { name: string }>(
  'brand/createBrand',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/brand', params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateBrand = createAsyncThunk<void, { name: string; id: number }>(
  'brand/updateBrand',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/brand', params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchBrands = createAsyncThunk<Brand[]>('brand/fetchBrands', async () => {
  const { data } = await axios.get('/brand');
  return data;
});

export const destroyBrand = createAsyncThunk<void, { id: number }>(
  'brand/destroyBrand',
  async (params) => {
    const { id } = params;
    await axios.delete(`/brand/${id}`);
  },
);

interface BrandState {
  brands: Brand[];
  status: string | null;
  statusPOST: string | null;
  activeBrands: number[];
}

const initialState: BrandState = {
  brands: [],
  status: null,
  statusPOST: null,
  activeBrands: [],
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setActiveBrand: (state, action: any) => {
      if (state.activeBrands.includes(action.payload)) {
        state.activeBrands = state.activeBrands.filter((brand) => brand !== action.payload);
      } else {
        state.activeBrands.push(action.payload);
      }
    },
    setOneBrand: (state, action: any) => {
      state.activeBrands[0] = action.payload;
    },
    clearStatusBrand: (state) => {
      state.statusPOST = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(createBrand.rejected, (state) => {
        state.statusPOST = 'error';
      })
      .addCase(updateBrand.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(updateBrand.rejected, (state) => {
        state.statusPOST = 'error';
      })
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(destroyBrand.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(destroyBrand.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(destroyBrand.rejected, (state) => {
        state.statusPOST = 'error';
      });
  },
});

export const { setActiveBrand, setOneBrand, clearStatusBrand } = brandSlice.actions;

export default brandSlice.reducer;
