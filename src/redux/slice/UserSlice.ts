import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { UserData } from '../../types';

type userResponce = {
  token: string | null;
  user: {
    email: string;
    id: number;
    role: string;
  };
};

export const postReviews = createAsyncThunk<void, any>('reviews/postReviews', async (params) => {
  const { data } = await axios.post('/review', params);
  return data;
});

export const fetchLogin = createAsyncThunk<userResponce, UserData>(
  'user/fetchLogin',
  async (params) => {
    const { data } = await axios.post('/login', params);
    localStorage.setItem('token', data.token);
    return data;
  },
);

export const fetchRegister = createAsyncThunk<string, UserData>(
  'user/fetchRegister',
  async (params) => {
    const { data } = await axios.post('/register', params);
    localStorage.setItem('token', data.token);
    return data;
  },
);

export const fetchAuth = createAsyncThunk<userResponce>('user/fetchAuth', async () => {
  const { data } = await axios.get('/auth');

  localStorage.setItem('token', data.token);
  return data;
});

interface UserState {
  data: userResponce;
  status: string;
  statusPOST: string | null;
}

const initialState: UserState = {
  data: {
    token: null,
    user: {
      id: 0,
      email: '',
      role: '',
    },
  },
  status: 'loading',
  statusPOST: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data.token = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data.token = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data.token = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data.token = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data.token = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data.token = action.payload.token;
        state.data.user = action.payload.user;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
        state.data.token = null;
      })
      .addCase(postReviews.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(postReviews.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(postReviews.rejected, (state) => {
        state.statusPOST = 'error';
      });
  },
});

export const { logout } = userSlice.actions;

export const selectIsAuth = (state: UserState) => Boolean(state.data.token);

export default userSlice.reducer;
