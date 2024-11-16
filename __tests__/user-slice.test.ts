import { error } from 'console';
import {
  authChecked,
  checkUserAuth,
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from './../src/services/user-slice';
describe('user-slice', () => {
  const userStateData = {
    email: 'etternall.forgotten@mail.ru',
    name: 'Михаил'
  };

  const updateUserStateData = {
    email: 'test@mail.ru',
    name: 'testName'
  };

  describe('register', () => {
    it('fulfilled', () => {
      const state = userSlice.reducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: userStateData
      });

      expect(state.data).toEqual(userStateData);
      expect(state.loginUserRequest).toBe(false);
    });

    it('pending', () => {
      const state = userSlice.reducer(initialState, {
        type: registerUser.pending.type
      });

      expect(state.loginUserRequest).toBe(true);
    });

    it('rejected', () => {
      const state = userSlice.reducer(initialState, {
        type: registerUser.rejected.type,
        error
      });

      expect(state.loginUserRequest).toBe(false);
      expect(state.registerUserError).toBe('');
    });
  });

  describe('login', () => {
    it('authChecked', () => {
      const state = userSlice.reducer(initialState, authChecked());

      expect(state.isAuthChecked).toBe(true);
    });

    it('checkUserAuth', () => {
      const state = userSlice.reducer(initialState, {
        type: checkUserAuth.pending.type
      });

      expect(state.loginUserError).toBe('');
      expect(state.registerUserError).toBe('');
    });

    it('getUser', () => {
      const state = userSlice.reducer(initialState, {
        type: getUser.fulfilled.type,
        payload: { success: true, user: userStateData }
      });

      expect(state.data).toBe(userStateData);
    });

    it('fulfilled', () => {
      const state = userSlice.reducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: userStateData
      });

      expect(state.data).toEqual(userStateData);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserRequest).toBe(false);
    });

    it('pending', () => {
      const state = userSlice.reducer(initialState, {
        type: loginUser.pending.type
      });

      expect(state.loginUserRequest).toBe(true);
    });

    it('rejected', () => {
      const state = userSlice.reducer(initialState, {
        type: loginUser.rejected.type,
        error
      });

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserError).toBe('');
    });
  });

  describe('logout', () => {
    it('fulfilled', () => {
      const state = userSlice.reducer(initialState, {
        type: logoutUser.fulfilled.type
      });

      expect(state.loginUserRequest).toBe(false);
    });

    it('pending', () => {
      const state = userSlice.reducer(initialState, {
        type: logoutUser.pending.type
      });

      expect(state.loginUserRequest).toBe(true);
    });

    it('rejected', () => {
      const state = userSlice.reducer(initialState, {
        type: logoutUser.rejected.type,
        error
      });

      expect(state.loginUserRequest).toBe(false);
    });
  });

  describe('updateUser', () => {
    it('fulfilled', () => {
      const state = userSlice.reducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: { success: true, user: updateUserStateData }
      });

      expect(state.data).toEqual(updateUserStateData);
    });

    it('pending', () => {
      const state = userSlice.reducer(initialState, {
        type: updateUser.pending.type
      });

      expect(state.loginUserRequest).toBe(true);
    });

    it('rejected', () => {
      const state = userSlice.reducer(initialState, {
        type: updateUser.rejected.type,
        error
      });

      expect(state.loginUserRequest).toBe(false);
      expect(state.updateUserError).toEqual('');
    });
  });
});
