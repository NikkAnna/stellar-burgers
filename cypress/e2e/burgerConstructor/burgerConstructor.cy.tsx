describe('Тест конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1400, 1000);
    cy.visit('http://localhost:4000/');
  });

  it('булка добавляется в конструктор', () => {
    const buns = cy.get('[data-cy=buns-category]');
    buns.contains('Добавить').click();

    const topBun = cy.get('[data-cy=top-bun-constructor]');
    const bottomBun = cy.get('[data-cy=bottom-bun-constructor]');

    topBun.contains('Ingredient 1').should('exist');
    bottomBun.contains('Ingredient 1').should('exist');
  });

  it('игредиенты добавляются в конструктор', () => {
    const mains = cy.get('[data-cy=mains-category]');
    mains.contains('Добавить').click();
    cy.get('[data-cy=ingredients-constructor]')
      .contains('Ingredient 2')
      .should('exist');

    const sauces = cy.get('[data-cy=sauces-category]');
    sauces.contains('Добавить').click();
    cy.get('[data-cy=ingredients-constructor]')
      .contains('Ingredient 4')
      .should('exist');
  });
});
