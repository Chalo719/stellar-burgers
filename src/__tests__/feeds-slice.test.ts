import feedsReducer, { getFeeds } from "../services/slices/feeds-slice";
import { TFeed } from "../components/ui/feed-info/type";

const mockFeeds: TFeed = {
  orders: [
    {
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
    },
    {
      _id: '68eccc95b9d496001c83972e',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-10-13T09:55:33.906Z',
      updatedAt: '2025-10-13T09:55:35.240Z',
      number: 2
    },
    {
      _id: '68ebc8adb9d496001c83959b',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-10-12T15:26:37.537Z',
      updatedAt: '2025-10-12T15:26:39.129Z',
      number: 3
    }
  ],
  total: 10,
  totalToday: 3
};

describe('feeds-slice', () => {
  const initialState: TFeed = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: false
  };

  describe('getFeeds', () => {
    test('Проверка состояния pending при загрузке ленты заказов', () => {
      const state = feedsReducer(initialState, { type: getFeeds.pending.type });

      expect(state.loading).toBe(true);
      expect(state.error).toBe(false);
    });

    test('Проверка состояния rejected при загрузке ленты заказов', () => {
      const state = feedsReducer(initialState, { type: getFeeds.rejected.type });

      expect(state.loading).toBe(false);
      expect(state.error).toBe(true);
    });

    test('Проверка состояния fulfilled при загрузке ленты заказов', () => {
      const state = feedsReducer(initialState, {
        type: getFeeds.fulfilled.type,
        payload: mockFeeds
      });

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockFeeds.orders);
      expect(state.total).toEqual(mockFeeds.total);
      expect(state.totalToday).toEqual(mockFeeds.totalToday);
    });
  });
});
