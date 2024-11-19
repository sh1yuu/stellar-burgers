import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from '../src/services/burgerConstructor-slice';
import { feedSlice } from '../src/services/feed-slice';
import { ingredientsSlice } from '../src/services/ingredients-slice';
import { orderSlice } from '../src/services/order-slice';
import { ordersSlice } from '../src/services/orders-slice';
import { userSlice } from '../src/services/user-slice';
import { rootReducer } from './../src/services/store';
describe('rootReducer', () => {
  const rootReducerState = {
    [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
    [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
    [feedSlice.name]: feedSlice.getInitialState(),
    [orderSlice.name]: orderSlice.getInitialState(),
    [ordersSlice.name]: ordersSlice.getInitialState(),
    [userSlice.name]: userSlice.getInitialState()
  };

  it('возвращает корректное начальное состояние хранилища', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    expect(state).toEqual(rootReducerState);
  });

  it('вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(rootReducerState, action);

    expect(state).toEqual(rootReducerState);
  });
});
