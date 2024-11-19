import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  loginUserError: string;
  registerUserError: string;
  updateUserError: string;
  loginUserRequest: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  loginUserError: '',
  registerUserError: '',
  updateUserError: '',
  loginUserRequest: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    const reg_data = await registerUserApi(data);
    if (!reg_data?.success) {
      return rejectWithValue(reg_data);
    }
    setCookie('accessToken', reg_data.accessToken);
    localStorage.setItem('refreshToken', reg_data.refreshToken);
    return reg_data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (login: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(login);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    selectorIsAuthChecked: (state) => state.isAuthChecked,
    selectorData: (state) => state.data,
    selectorLoginUserError: (state) => state.loginUserError,
    selectorRegisterUserError: (state) => state.registerUserError,
    selectorUpdateUserError: (state) => state.updateUserError,
    selectorLoginUserRequest: (state) => state.loginUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserError = action.error.message || '';
        state.loginUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error.message || '';
        state.loginUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload;
        state.loginUserError = '';
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loginUserError = '';
        state.registerUserError = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError = action.error.message || '';
        state.loginUserRequest = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
      });
  }
});

export const {
  selectorIsAuthChecked,
  selectorData,
  selectorLoginUserError,
  selectorRegisterUserError,
  selectorUpdateUserError,
  selectorLoginUserRequest
} = userSlice.selectors;

export const { authChecked, userLogout } = userSlice.actions;
