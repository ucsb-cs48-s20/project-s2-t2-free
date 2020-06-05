describe("Group Management Page", () => {
  before(() => {
    cy.prepareDatabase();
  });

  context("When I am logged in as a user", () => {
    beforeEach(() => {
      cy.loginAsUser();
      cy.visit("http://localhost:3000/groups-management");
    });

    it("create group", () => {
      cy.get('input[id="enternewgroupname"]').type("Awesome Group");
      cy.get('button[id="creategroup"]').click();
    });

    it("check group exists", () => {
      cy.get("table");
    });

    it("check group data", () => {
      cy.get("table").contains("Awesome Group");
    });

    it("check group data", () => {
      cy.get("table").contains("Student Gaucho");
    });

    it("check group data", () => {
      cy.get('td[id="group-code-0"]');
    });

    it("check group data", () => {
      cy.get('a[id="group-link-0"]').click();
      cy.get('button[id="leavegroup"]');
    });
  });
});
