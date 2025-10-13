import { TOrder } from "@utils-types";
import orderReducer, { createOrder, getOrderByNumber, TOrderState } from "../services/slices/order-slice";

const mockOrder: TOrder = {
  _id: '68ecf97ab9d496001c83977c',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Флюоресцентный spicy бургер',
  createdAt: '2025-10-13T13:07:06.726Z',
  updatedAt: '2025-10-13T13:07:07.914Z',
  number: 1
};

describe('order-slice', () => {
  const initialState: TOrderState = {
    order: null,
    loading: false,
    error: false
  };

  describe('getOrderByNumber', () => {
    test('Проверка состояния pending при загрузке заказа по номеру', () => {
      const state = orderReducer(initialState, { type: getOrderByNumber.pending.type });

      expect(state.loading).toBe(true);
      expect(state.error).toBe(false);
    });

    test('Проверка состояния rejected при загрузке заказа по номеру', () => {
      const state = orderReducer(initialState, { type: getOrderByNumber.rejected.type });

      expect(state.loading).toBe(false);
      expect(state.error).toBe(true);
    });

    test('Проверка состояния fulfilled при загрузке заказа по номеру', () => {
      const state = orderReducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      });

      expect(state.loading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });
  });

  describe('createOrder', () => {
    test('Проверка состояния pending при создании заказа', () => {
      const state = orderReducer(initialState, { type: createOrder.pending.type });

      expect(state.loading).toBe(true);
      expect(state.error).toBe(false);
    });

    test('Проверка состояния rejected при создании заказа', () => {
      const state = orderReducer(initialState, { type: createOrder.rejected.type });

      expect(state.loading).toBe(false);
      expect(state.error).toBe(true);
    });

    test('Проверка состояния fulfilled при создании заказа', () => {
      const state = orderReducer(initialState, {
        type: createOrder.fulfilled.type,
        payload: { order: mockOrder }
      });

      expect(state.loading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });
  });
});
