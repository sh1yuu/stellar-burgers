import {
  feedSlice,
  getFeeds,
  initialState
} from './../src/services/feed-slice';
describe('feed-slice', () => {
  const orderStateData = {
    orders: [
      {
        _id: '67378a48b27b06001c3e865c',
        status: 'done',
        name: 'Флюоресцентный био-марсианский бургер',
        createdAt: '2024-11-15T17:52:08.442Z',
        updatedAt: '2024-11-15T17:52:09.417Z',
        number: '59502',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941'
        ]
      }
    ],
    total: '59131',
    totalToday: '65'
  };

  it('получение списка заказов (fulfilled)', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.fulfilled.type,
      payload: orderStateData
    });

    expect(state.orders).toEqual(orderStateData.orders);
    expect(state.total).toEqual(orderStateData.total);
    expect(state.totalToday).toEqual(orderStateData.totalToday);
  });
});
