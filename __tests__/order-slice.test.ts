import {
  getOrderByNumber,
  initialState,
  orderSlice
} from './../src/services/order-slice';
describe('order-slice', () => {
  const orderStateData = {
    data: {
      _id: '673786feb27b06001c3e8657',
      createdAt: '2024-11-15T17:38:06.530Z',
      updatedAt: '2024-11-15T17:38:07.347Z',
      name: 'Бессмертный spicy бургер',
      owner: '6737867bb27b06001c3e8651',
      status: 'done',
      number: '59501',
      __v: 0,
      ingredients: ['643d69a5c3f7b9001cfa093f', '643d69a5c3f7b9001cfa0942']
    },
    loading: false
  };

  const newOrderStateData = {
    data: {
      _id: '6737b53db27b06001c3e869f',
      createdAt: '2024-11-15T20:55:25.423Z',
      updatedAt: '2024-11-15T20:55:27.102Z',
      name: 'Краторный space минеральный люминесцентный бургер',
      owner: '67140acad829be001c7771f5',
      status: 'done',
      number: '59509',
      __v: 0,
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ]
    },
    loading: false
  };

  describe('getOrderByNumber', () => {
    it('получение заказа (fulfilled)', () => {
      const state = orderSlice.reducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: orderStateData
      });

      expect(state.data).toEqual(orderStateData);
      expect(state.loading).toBe(false);
    });

    it('получение заказа (pending)', () => {
      const state = orderSlice.reducer(initialState, {
        type: getOrderByNumber.pending.type
      });

      expect(state.loading).toBe(true);
    });

    it('получение заказа (rejected)', () => {
      const state = orderSlice.reducer(initialState, {
        type: getOrderByNumber.rejected.type
      });

      expect(state.loading).toBe(false);
    });
  });

  describe('оформление заказа', () => {
    it('fulfilled', () => {
      const state = orderSlice.reducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: newOrderStateData
      });

      expect(state.data).toEqual(newOrderStateData);
      expect(state.loading).toBe(false);
    });

    it('pending', () => {
      const state = orderSlice.reducer(initialState, {
        type: getOrderByNumber.pending.type
      });

      expect(state.loading).toBe(true);
    });

    it('rejected', () => {
      const state = orderSlice.reducer(initialState, {
        type: getOrderByNumber.rejected.type
      });

      expect(state.loading).toBe(false);
    });
  });
});
