import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import axios from '../../axios';

type UserData = {
  email: string;
  password: string;
};

export const fetchLogin = createAsyncThunk<string, UserData>('user/fetchLogin', async (params) => {
  const { data } = await axios.post('/login', params);
  localStorage.setItem('token', data.token);
  return data;
});

export const fetchRegister = createAsyncThunk<string, UserData>(
  'user/fetchRegister',
  async (params) => {
    const { data } = await axios.post('/register', params);
    localStorage.setItem('token', data.token);
    return data;
  },
);

export const fetchAuth = createAsyncThunk<string>('user/fetchAuth', async () => {
  const { data } = await axios.get('/auth');

  localStorage.setItem('token', data.token);
  return data;
});

interface UserState {
  data: string | null;
  status: string;
}

const initialState: UserState = {
  data: null,
  status: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectIsAuth = (state: UserState) => Boolean(state.data);

export default userSlice.reducer;
