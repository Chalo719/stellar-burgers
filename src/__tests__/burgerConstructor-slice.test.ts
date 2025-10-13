import { TIngredient, TConstructorIngredient } from "@utils-types";
import { TConstructorItems } from "../components/ui/burger-constructor/type";
import burgerConstructorReducer, { addIngredient, removeIngredient, moveIngredient, clearConstructor } from "../services/slices/burgerConstructor-slice";

const mockBun: TIngredient = {
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
};

const mockReplaceBun: TIngredient = {
  "_id": "643d69a5c3f7b9001cfa093d",
  "name": "Флюоресцентная булка R2-D3",
  "type": "bun",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/bun-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
};

const mockMain: TIngredient = {
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
};

describe('burgerConstructor-slice', () => {
  const initialState: TConstructorItems = {
    bun: null,
    ingredients: []
  };

  describe('addIngredient', () => {
    test('Добавление булки в конструктор', () => {
      const state = burgerConstructorReducer(initialState, addIngredient({ ...mockBun, id: 'test-id' }));

      expect(state.bun).toEqual({
        ...mockBun,
        id: 'test-id'
      });
      expect(state.ingredients).toEqual([]);
    });

    test('Добавление начинки в конструктор', () => {
      const state = burgerConstructorReducer(initialState, addIngredient({ ...mockMain, id: 'test-id' }));

      expect(state.bun).toBe(null);
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual({
        ...mockMain,
        id: 'test-id'
      });
    });

    test('Замена булки, если она уже есть', () => {
      const stateWithBun: TConstructorItems = {
        bun: { ...mockBun, id: 'test-id' } as TConstructorIngredient,
        ingredients: []
      };
      const newState = burgerConstructorReducer(stateWithBun, addIngredient({ ...mockReplaceBun, id: 'test-replace-id' }));

      expect(newState.bun).toEqual({
        ...mockReplaceBun,
        id: 'test-replace-id'
      });
    });

    test('Добавление ингредиента, если в конструкторе уже есть ингредиенты', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'test-1' } as TConstructorIngredient,
        ]
      };
      const newState = burgerConstructorReducer(stateWithIngredients, addIngredient({ ...mockMain, id: 'test-2' }));

      expect(newState.ingredients).toHaveLength(2);
      expect(newState.ingredients[0].id).toBe('test-1');
      expect(newState.ingredients[1].id).toBe('test-2');
    });
  });

  describe('removeIngredient', () => {
    test('Удаление ингредиента по id', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'test-1' } as TConstructorIngredient,
          { ...mockMain, id: 'test-2' } as TConstructorIngredient
        ]
      };
      const newState = burgerConstructorReducer(stateWithIngredients, removeIngredient('test-1'));

      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0].id).toBe('test-2');
    });
  });

  describe('moveIngredient', () => {
    test('Перемещение ингредиента внутри конструктора', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'test-1' } as TConstructorIngredient,
          { ...mockMain, id: 'test-2' } as TConstructorIngredient,
          { ...mockMain, id: 'test-3' } as TConstructorIngredient
        ]
      };
      const newState = burgerConstructorReducer(stateWithIngredients, moveIngredient({ from: 0, to: 1 }));

      expect(newState.ingredients[0].id).toBe('test-2');
      expect(newState.ingredients[1].id).toBe('test-1');
      expect(newState.ingredients[2].id).toBe('test-3');
    });
  });

  describe('clearConstructor', () => {
    test('Очистка конструктора', () => {
      const stateWithIngredients = {
        bun: { ...mockBun, id: 'test-bun-id' } as TConstructorIngredient,
        ingredients: [
          { ...mockMain, id: 'test-ingredient-id' } as TConstructorIngredient
        ]
      };
      const newState = burgerConstructorReducer(stateWithIngredients, clearConstructor());

      expect(newState.bun).toBe(null);
      expect(newState.ingredients).toEqual([]);
    });
  });
});
