import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

type TOrderBurger = string[];

export const orderBurger = createAsyncThunk<TOrder, TOrderBurger>(
  'burgerConstructor/orderBurger',
  async (id) => {
    const response = await orderBurgerApi(id);
    return response.order;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredientFromConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    }
  },
  selectors: {
    selectorBurgerIngredients: (state) => state
  }
});

export const { addIngredientToConstructor, removeIngredientFromConstructor } =
  burgerConstructorSlice.actions;
export const { selectorBurgerIngredients } = burgerConstructorSlice.selectors;
