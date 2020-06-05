describe("Authentication", () => {
  before(() => {
    cy.prepareDatabase();
  });
  context("When I am logged in as a user", () => {
    beforeEach(() => {
      cy.loginAsUser();
      cy.visit("http://localhost:3000");
    });

    it("shows me student navbar options", () => {
      cy.get(".navbar-nav").contains("My Schedule");
      cy.get(".navbar-nav").contains("Groups Management");
    });
  });

  context("When I am not logged in", () => {
    it("has a login button", () => {
      cy.visit("http://localhost:3000");

      cy.get("[data-cy=login]").should("exist");
    });
  });
});
