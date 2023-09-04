describe('App', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('NgWordle');

    cy.matchImageSnapshot();
  });
});
