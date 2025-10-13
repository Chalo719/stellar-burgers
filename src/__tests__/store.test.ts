import store from '../services/store';

describe('store', () => {
  test('Инициализация rootReducer', () => {
    const initialState = store.getState();

    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('profileOrders');
    expect(initialState).toHaveProperty('burgerConstructor');
  });


  test('Вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const initialState = store.getState();

    store.dispatch({ type: 'UNKNOWN_ACTION' });

    const newState = store.getState();

    expect(newState).toEqual(initialState);
  });
});
