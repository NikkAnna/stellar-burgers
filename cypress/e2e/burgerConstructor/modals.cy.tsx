describe('Проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1400, 1000);
    cy.visit('http://localhost:4000/');
  });

  it('Открытие модального окна игредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');

    const ingredient = cy.get('[data-cy=mains-category]');
    ingredient.contains('Ingredient 2').click();

    cy.contains('Детали ингредиента').should('exist');

    const modal = cy.get('[data-cy=modal]');
    modal.contains('Ingredient 2').should('exist');
  });

  it('Закрытие модального окна нажатием на крестик', () => {
    const ingredient = cy.get('[data-cy=mains-category]');
    ingredient.contains('Ingredient 2').click();

    cy.contains('Детали ингредиента').should('exist');

    const modalCloseButton = cy.get('[data-cy=modal-button]');
    modalCloseButton.click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('not.exist');
  });

  it('Закрытие модального окна нажатием на оверлей', () => {
    const ingredient = cy.get('[data-cy=mains-category]');
    ingredient.contains('Ingredient 2').click();

    cy.contains('Детали ингредиента').should('exist');

    const modalOverlay = cy.get('[data-cy=modal-overlay]');
    modalOverlay.click('right', { force: true });

    const modal = cy.get('[data-cy=modal]');
    modal.should('not.exist');
  });
});
