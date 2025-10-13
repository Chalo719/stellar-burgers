import { TUser } from "@utils-types";
import authReducer, { getUser, loginUser, logoutUser, registerUser, TAuthState, updateUser } from "../services/slices/auth-slice";

const mockUser: TUser = { name: 'Test', email: 'example@mail.com' };
const mockUpdateUser: TUser = { name: 'TestUpdate', email: 'exampleUpdate@mail.com' };

describe('auth-slice', () => {
  const initialState: TAuthState = {
    user: null,
    isAuthChecked: false,
    loginLoading: false,
    loginError: false,
    registerLoading: false,
    registerError: false,
    updateLoading: false,
    updateError: false,
    logoutLoading: false,
    logoutError: false
  };

  describe('getUser', () => {
    test('Проверка состояния pending при getUser', () => {
      const state = authReducer(initialState, { type: getUser.pending.type });

      expect(state.isAuthChecked).toBe(false);
    });

    test('Проверка состояния rejected при getUser', () => {
      const state = authReducer(initialState, { type: getUser.rejected.type });

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(null);
    });

    test('Проверка состояния fulfilled при getUser', () => {
      const state = authReducer(initialState, { type: getUser.fulfilled.type, payload: { user: mockUser } });

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('loginUser', () => {
    test('Проверка состояния pending при loginUser', () => {
      const state = authReducer(initialState, { type: loginUser.pending.type });

      expect(state.loginLoading).toBe(true);
      expect(state.loginError).toBe(false);
    });

    test('Проверка состояния rejected при loginUser', () => {
      const state = authReducer(initialState, { type: loginUser.rejected.type });

      expect(state.loginLoading).toBe(false);
      expect(state.loginError).toBe(true);
    });

    test('Проверка состояния fulfilled при loginUser', () => {
      const state = authReducer(initialState, { type: loginUser.fulfilled.type, payload: { user: mockUser } });

      expect(state.loginLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('registerUser', () => {
    test('Проверка состояния pending при registerUser', () => {
      const state = authReducer(initialState, { type: registerUser.pending.type });

      expect(state.registerLoading).toBe(true);
      expect(state.registerError).toBe(false);
    });

    test('Проверка состояния rejected при registerUser', () => {
      const state = authReducer(initialState, { type: registerUser.rejected.type });

      expect(state.registerLoading).toBe(false);
      expect(state.registerError).toBe(true);
    });

    test('Проверка состояния fulfilled при registerUser', () => {
      const state = authReducer(initialState, { type: registerUser.fulfilled.type, payload: { user: mockUser } });

      expect(state.registerLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    test('Проверка состояния pending при updateUser', () => {
      const state = authReducer({ ...initialState, user: mockUser }, { type: updateUser.pending.type });

      expect(state.updateLoading).toBe(true);
      expect(state.updateError).toBe(false);
    });

    test('Проверка состояния rejected при updateUser', () => {
      const state = authReducer({ ...initialState, user: mockUser }, { type: updateUser.rejected.type });

      expect(state.updateLoading).toBe(false);
      expect(state.updateError).toBe(true);
    });

    test('Проверка состояния fulfilled при updateUser', () => {
      const state = authReducer({ ...initialState, user: mockUser }, { type: updateUser.fulfilled.type, payload: { user: mockUpdateUser } });

      expect(state.updateLoading).toBe(false);
      expect(state.user).toEqual(mockUpdateUser);
    });
  });

  describe('logoutUser', () => {
    test('Проверка состояния pending при logoutUser', () => {
      const state = authReducer({ ...initialState, user: mockUser }, { type: logoutUser.pending.type });

      expect(state.logoutLoading).toBe(true);
      expect(state.logoutError).toBe(false);
    });

    test('Проверка состояния rejected при logoutUser', () => {
      const state = authReducer({ ...initialState, user: mockUser }, { type: logoutUser.rejected.type });

      expect(state.logoutLoading).toBe(false);
      expect(state.logoutError).toBe(true);
    });

    test('Проверка состояния fulfilled при logoutUser', () => {
      const state = authReducer({ ...initialState, user: mockUser }, { type: logoutUser.fulfilled.type, payload: { user: mockUser } });

      expect(state.logoutLoading).toBe(false);
      expect(state.user).toBe(null);
      expect(state.isAuthChecked).toBe(true);
    });
  });
});
