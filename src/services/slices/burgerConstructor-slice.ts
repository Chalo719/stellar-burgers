import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload, id: uuidv4() });
      }
    },
    removeIngredient: (state, action) => {
      if (state.ingredients) {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    moveIngredient: (state, action) => {
      if (state.ingredients && state.ingredients.length > 1) {
        const { from, to } = action.payload;
        const items = [...state.ingredients];
        const [moved] = items.splice(from, 1);

        items.splice(to, 0, moved);
        state.ingredients = items;
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

export default burgerConstructorSlice.reducer;
