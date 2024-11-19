import {
  getIngredients,
  ingredientsSlice,
  initialState
} from './../src/services/ingredients-slice';
describe('ingredients-slice', () => {
  const ingredientsStateData = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      __v: 0
    }
  ];

  it('получение ингредиентов (fulfilled)', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: ingredientsStateData
    });

    expect(state.ingredients).toEqual(ingredientsStateData);
    expect(state.loading).toBe(false);
  });

  it('получение ингредиентов (pending)', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(state.loading).toBe(true);
  });

  it('получение ингредиентов (rejected)', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.rejected.type
    });

    expect(state.loading).toBe(false);
  });
});
