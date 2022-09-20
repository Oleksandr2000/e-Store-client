import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

export type Brand = {
  id: number;
  name: string;
};

export const createBrand = createAsyncThunk<void, { name: string }>(
  'brand/createBrand',
  async (params, { rejectWithValue }) => {
    const { data } = await axios.post('/brand', params);
    return data;
  },
);

export const fetchBrands = createAsyncThunk<Brand[]>('brand/fetchBrands', async () => {
  const { data } = await axios.get('/brand');
  return data;
});

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
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setActiveBrand, setOneBrand } = brandSlice.actions;

export default brandSlice.reducer;
