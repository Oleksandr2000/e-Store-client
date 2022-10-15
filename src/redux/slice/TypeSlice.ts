import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Type } from '../../types';

export const createType = createAsyncThunk<void, { name: string }>(
  'type/createType',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/type', params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateType = createAsyncThunk<void, { name: string; id: number }>(
  'type/updateType',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/type', params);
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

export const destroyType = createAsyncThunk<void, { id: number }>(
  'type/destroyType',
  async (params) => {
    const { id } = params;
    await axios.delete(`/type/${id}`);
  },
);

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
      .addCase(updateType.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(updateType.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(updateType.rejected, (state) => {
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
      })
      .addCase(destroyType.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(destroyType.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(destroyType.rejected, (state) => {
        state.statusPOST = 'error';
      });
  },
});

export const { setActiveType, setOneType, clearStatusType } = typeSlice.actions;

export default typeSlice.reducer;
