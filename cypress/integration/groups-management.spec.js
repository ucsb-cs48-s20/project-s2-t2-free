describe("Groups", () => {
  before(() => {
    cy.prepareDatabase();
  });
  context("When I am logged in as a user", () => {
    beforeEach(() => {
      cy.loginAsUser();
      cy.visit("http://localhost:3000/groups-management");
    });

    it("shows me student navbar options", () => {
      cy.get(".navbar-nav").contains("My Schedule");
      cy.get(".navbar-nav").contains("Groups Management");
    });
  });
});
