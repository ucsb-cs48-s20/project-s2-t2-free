describe("Create Event", () => {
  before(() => {
    cy.prepareDatabase();
    cy.loginAsUser();
    cy.visit("http://localhost:3000");
  });
  context("When I am logged in as an student", () => {
    beforeEach(() => {
      cy.get(".navbar-nav").contains("Groups Management").click();
    });
  });
});
