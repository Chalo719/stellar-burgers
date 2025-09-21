import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TConstructorItems } from '../../components/ui/burger-constructor/type';

const initialState: TConstructorItems = {
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
        state.ingredients.push(action.payload);
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
