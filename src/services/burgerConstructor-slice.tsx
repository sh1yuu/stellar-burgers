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
  order: TOrder | null;
  loading: boolean;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  loading: false
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
    removeIngredientFromConstructor: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      state.ingredients.splice(payload, 1);
    },
    reorderIngredientInBurgerConstructor: (state, action) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    selectorBurgerIngredients: (state) => state,
    selectorBurgerLoading: (state) => state.loading,
    selectorBurgerOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.loading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.bun = initialState.bun;
        state.ingredients = initialState.ingredients;
      });
  }
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  reorderIngredientInBurgerConstructor,
  resetConstructor
} = burgerConstructorSlice.actions;
export const {
  selectorBurgerIngredients,
  selectorBurgerLoading,
  selectorBurgerOrder
} = burgerConstructorSlice.selectors;
