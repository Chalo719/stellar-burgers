const CY_SELECTORS = {
  INGREDIENT_BUN: '[data-cy="ingredient-bun"]',
  INGREDIENT_MAIN: '[data-cy="ingredient-main"]',
  INGREDIENT_SAUCE: '[data-cy="ingredient-sauce"]',
  CONSTRUCTOR_TOP: '[data-cy="constructor-top"]',
  CONSTRUCTOR_BOTTOM: '[data-cy="constructor-bottom"]',
  CONSTRUCTOR_INGREDIENTS: '[data-cy="constructor-ingredients"]',
  MODAL: '[data-cy="modal"]',
  MODAL_CLOSE: '[data-cy="modal-close"]',
  MODAL_OVERLAY: '[data-cy="modal-overlay"]',
  ORDER_BUTTON: '[data-cy="order-button"]'
};

describe('constructor-page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-access-token');
    cy.window().then((w) => {
      w.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки', () => {
      cy.get(CY_SELECTORS.INGREDIENT_BUN).first().find('button').click();
      cy.get(CY_SELECTORS.CONSTRUCTOR_TOP)
        .find('.constructor-element__text')
        .contains('Краторная булка N-200i (верх)')
        .should('exist');
      cy.get(CY_SELECTORS.CONSTRUCTOR_BOTTOM)
        .find('.constructor-element__text')
        .contains('Краторная булка N-200i (низ)')
        .should('exist');
    });

    it('Добавление начинки', () => {
      cy.get(CY_SELECTORS.INGREDIENT_MAIN).first().find('button').click();
      cy.get(CY_SELECTORS.CONSTRUCTOR_INGREDIENTS)
        .find('.constructor-element__text')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('Добавление соуса', () => {
      cy.get(CY_SELECTORS.INGREDIENT_SAUCE).first().find('button').click();
      cy.get(CY_SELECTORS.CONSTRUCTOR_INGREDIENTS)
        .find('.constructor-element__text')
        .contains('Соус Spicy-X')
        .should('exist');
    });

    it('Добавление булки, начинки и соуса', () => {
      cy.get(CY_SELECTORS.INGREDIENT_BUN).last().find('button').click();
      cy.get(CY_SELECTORS.INGREDIENT_MAIN).last().find('button').click();
      cy.get(CY_SELECTORS.INGREDIENT_SAUCE).last().find('button').click();

      cy.get(CY_SELECTORS.CONSTRUCTOR_TOP)
        .find('.constructor-element__text')
        .contains('Флюоресцентная булка R2-D3 (верх)')
        .should('exist');
      cy.get(CY_SELECTORS.CONSTRUCTOR_BOTTOM)
        .find('.constructor-element__text')
        .contains('Флюоресцентная булка R2-D3 (низ)')
        .should('exist');

      cy.get(CY_SELECTORS.CONSTRUCTOR_INGREDIENTS)
        .find('.constructor-element__text')
        .contains('Сыр с астероидной плесенью')
        .should('exist');

      cy.get(CY_SELECTORS.CONSTRUCTOR_INGREDIENTS)
        .find('.constructor-element__text')
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
    });
  });

  describe('Работа модальных окон', () => {
    beforeEach(() => {
      cy.get(CY_SELECTORS.INGREDIENT_BUN).first().click();
    });

    it('Открытие модального окна ингредиента', () => {
      const modal = cy.get(CY_SELECTORS.MODAL);
      modal.should('be.visible');

      modal.find('h3').contains('Краторная булка N-200i').should('exist');
    });

    it('Закрытие по клику на крестик', () => {
      const modal = cy.get(CY_SELECTORS.MODAL);
      modal.should('be.visible');

      cy.get(CY_SELECTORS.MODAL_CLOSE).click();

      modal.should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      const modal = cy.get(CY_SELECTORS.MODAL);
      modal.should('be.visible');

      cy.get(CY_SELECTORS.MODAL_OVERLAY).click({ force: true });

      modal.should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Создание заказа', () => {
      cy.get(CY_SELECTORS.INGREDIENT_BUN).last().find('button').click();
      cy.get(CY_SELECTORS.INGREDIENT_MAIN).last().find('button').click();
      cy.get(CY_SELECTORS.INGREDIENT_SAUCE).last().find('button').click();

      cy.get(CY_SELECTORS.ORDER_BUTTON).click();
      cy.wait('@createOrder');

      const modal = cy.get(CY_SELECTORS.MODAL);
      modal.should('be.visible');

      modal.find('h2').contains(11111).should('exist');

      cy.get(CY_SELECTORS.MODAL_CLOSE).click();
      modal.should('not.exist');

      cy.get(CY_SELECTORS.CONSTRUCTOR_TOP).should('not.exist');
      cy.get(CY_SELECTORS.CONSTRUCTOR_BOTTOM).should('not.exist');
      cy.get(CY_SELECTORS.CONSTRUCTOR_INGREDIENTS)
        .contains('Выберите начинку')
        .should('exist');
    });
  });
});
