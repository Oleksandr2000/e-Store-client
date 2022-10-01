import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Type } from '../../types';

export const createType = createAsyncThunk<void, { name: string }>(
  'brand/createType',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/type', params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchType = createAsyncThunk<Type[]>('brand/fetchType', async () => {
  const { data } = await axios.get('/type');
  return data;
});

interface TypeState {
  types: Type[];
  status: string | null;
  statusPOST: string | null;
  activeType: number[];
}

const initialState: TypeState = {
  types: [],
  status: null,
  statusPOST: null,
  activeType: [],
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setActiveType: (state, action: any) => {
      if (state.activeType.includes(action.payload)) {
        state.activeType = state.activeType.filter((type) => type !== action.payload);
      } else {
        state.activeType.push(action.payload);
      }
    },
    setOneType: (state, action: any) => {
      state.activeType[0] = action.payload;
    },
    clearStatusType: (state) => {
      state.statusPOST = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createType.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(createType.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(createType.rejected, (state) => {
        state.statusPOST = 'error';
      })
      .addCase(fetchType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchType.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.types = action.payload;
      })
      .addCase(fetchType.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setActiveType, setOneType, clearStatusType } = typeSlice.actions;

export default typeSlice.reducer;
