describe('Тестирование функции оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'orderBurger.json' });
    cy.viewport(1400, 1000);

    window.localStorage.setItem('refreshToken', 'test');
    cy.setCookie('accessToken', JSON.stringify('test'));

    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('оформление заказа', () => {
    const buns = cy.get('[data-cy=buns-category]');
    buns.contains('Добавить').click();
    const mains = cy.get('[data-cy=mains-category]');
    mains.contains('Добавить').click();

    const orderButton = cy.get('[data-cy=order-button]');
    orderButton.contains('Оформить заказ').click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('exist');

    const orderNumber = cy.get('[data-cy=order-number]');
    orderNumber.contains('111').should('exist');

    const modalCloseButton = cy.get('[data-cy=modal-button]');
    modalCloseButton.click();
    modal.should('not.exist');

    cy.get('[data-cy=no-top-bun]').should('exist');
    cy.get('[data-cy=no-bottom-bun]').should('exist');
    cy.get('[data-cy=no-ingredients]').should('exist');
  });
});
