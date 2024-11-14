import { describe } from 'node:test';
import {
  addIngredientToConstructor,
  burgerConstructorSlice,
  removeIngredientFromConstructor,
  reorderIngredientInBurgerConstructor
} from './../src/services/burgerConstructor-slice';

jest.mock('nanoid', () => ({ id: () => '0000-0000-0000-0000' }));

afterAll(() => {
  jest.resetAllMocks();
});

describe('burgerConstructor-slice', () => {
  const ingredientState = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
  };

  const testInitialState = {
    bun: {
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
      __v: 0,
      id: 'evGAoSvO2t_qhDnuFeNEc'
    },
    ingredients: [
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
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        __v: 0,
        id: 'NStP34g5S2rt0IbzP7ilH'
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
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        __v: 0,
        id: 'EuoEmccempUSf47Y9jISc'
      }
    ],
    order: null,
    loading: false
  };

  const stateAfterDeleteIngredient = [
    {
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0942',
      calories: 30,
      carbohydrates: 40,
      fat: 20,
      id: 'EuoEmccempUSf47Y9jISc',
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      name: 'Соус Spicy-X',
      price: 90,
      proteins: 30,
      type: 'sauce'
    }
  ];

  const stateAfterReorderIngredient = [
    {
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0942',
      calories: 30,
      carbohydrates: 40,
      fat: 20,
      id: 'EuoEmccempUSf47Y9jISc',
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      name: 'Соус Spicy-X',
      price: 90,
      proteins: 30,
      type: 'sauce'
    },
    {
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0941',
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      id: 'NStP34g5S2rt0IbzP7ilH',
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      name: 'Биокотлета из марсианской Магнолии',
      price: 424,
      proteins: 420,
      type: 'main'
    }
  ];

  it('Добавление ингредиента в конструктор', () => {
    const state = burgerConstructorSlice.reducer(
      testInitialState,
      addIngredientToConstructor(ingredientState)
    );

    expect(state.ingredients).toEqual([
      ...testInitialState.ingredients,
      { ...ingredientState, id: expect.any(String) }
    ]);
  });

  it('Удаление ингердиента', () => {
    const state = burgerConstructorSlice.reducer(
      testInitialState,
      removeIngredientFromConstructor(0)
    );

    expect(state.ingredients).toEqual(stateAfterDeleteIngredient);
  });

  it('Изменение порядка ингедиентов', () => {
    const state = burgerConstructorSlice.reducer(
      testInitialState,
      reorderIngredientInBurgerConstructor({ from: 0, to: 1 })
    );

    expect(state.ingredients).toEqual(stateAfterReorderIngredient);
  });
});
