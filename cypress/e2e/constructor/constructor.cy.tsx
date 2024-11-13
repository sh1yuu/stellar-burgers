/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:8080/');
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json'
  });
});

describe('Добавление ингредиента из списка ингредиентов в конструктор', () => {
  it('Добавление булки в конструктор', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').contains('Добавить').click();
    cy.get('[data-cy=burger-bun]').should('exist');
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').contains('Добавить').click();
    cy.get('[data-cy=burger-item]').should('exist');
  });

  it('Добавление соуса в конструктор', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').contains('Добавить').click();
    cy.get('[data-cy=burger-item]').should('exist');
  });
});

describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
  it('Открыть модальное окно', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=modal]').should('exist');
  });

  it('Закрыть модальное окно', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal_close-btn]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Процесс создания заказа', () => {
  before(() => {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshToken-fake')
    );

    cy.setCookie('accessToken', 'refreshToken-fake');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    });
  });

  after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Создание заказа', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').contains('Добавить').click();
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').contains('Добавить').click();
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').contains('Добавить').click();

    cy.get('[data-cy=order-summ]').contains('Оформить заказ').click();

    cy.get('[data-cy=modal]').contains('57156').should('exist');

    cy.get('[data-cy=modal_close-btn').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=burger-item').should('have.length', 0);
    cy.get('[data-cy=burger-bun').should('have.length', 0);
  });
});
