import {
  getOrders,
  initialState,
  orderRequest,
  ordersSlice
} from './../src/services/orders-slice';
describe('orders-slice', () => {
  const ordersStateData = [
    {
      _id: '673877bbb27b06001c3e87ad',
      createdAt: '2024-11-16T10:45:15.056Z',
      updatedAt: '2024-11-16T10:45:16.046Z',
      name: 'Флюоресцентный space био-марсианский экзо-плантаго spicy люминесцентный бургер',
      owner: '6724d7a2b27b06001c3e5b93',
      status: 'done',
      number: 59534,
      __v: 0,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ]
    },
    {
      _id: '67386609b27b06001c3e876f',
      createdAt: '2024-11-16T09:29:45.419Z',
      updatedAt: '2024-11-16T09:29:46.333Z',
      name: 'Флюоресцентный астероидный минеральный био-марсианский метеоритный бургер',
      owner: '67386603b27b06001c3e876d',
      status: 'done',
      number: 59533,
      __v: 0,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093d'
      ]
    }
  ];

  it('получение списка заказов', () => {
    const state = ordersSlice.reducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: ordersStateData
    });

    expect(state.orders).toEqual(ordersStateData);
  });

  it('orderRequest', () => {
    const state = ordersSlice.reducer(initialState, orderRequest(true));

    expect(state.orders).toEqual([]);
  });
});
