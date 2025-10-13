import { TIngredient } from "@utils-types";
import ingredientsReducer, { getIngredients, TIngredientsState } from "../services/slices/ingredients-slice";

const mockIngredients: TIngredient[] = [
  {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  },
  {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
  }
];

describe('ingredients-slice', () => {
  const initialState: TIngredientsState = {
    items: [],
    loading: false,
    error: false
  };

  describe('getIngredients', () => {
    test('Проверка состояния pending при загрузке ингредиентов', () => {
      const state = ingredientsReducer(initialState, { type: getIngredients.pending.type });

      expect(state.loading).toBe(true);
      expect(state.error).toBe(false);
    });

    test('Проверка состояния rejected при загрузке ингредиентов', () => {
      const state = ingredientsReducer(initialState, { type: getIngredients.rejected.type });

      expect(state.loading).toBe(false);
      expect(state.error).toBe(true);
    });

    test('Проверка состояния fulfilled при загрузке ингредиентов', () => {
      const state = ingredientsReducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      });

      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockIngredients);
    });
  });
});
