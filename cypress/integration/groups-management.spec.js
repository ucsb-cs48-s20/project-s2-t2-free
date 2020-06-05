describe("Groups", () => {
  before(() => {
    cy.prepareDatabase();
  });
  context("When I am logged in as a user", () => {
    beforeEach(() => {
      cy.loginAsUser();
      cy.visit("http://localhost:3000/groups-management");
    });

    it("check buttons", () => {
      cy.get('button[id="findgroup"]');
      cy.get('button[id="creategroup"]');
    });

    it("enter any group code", () => {
      cy.get('input[id="entergroupcode"]').type("notacode");
      cy.get('button[id="findgroup"]').click();
    });

    it("enter wrong group code", () => {
      cy.get('input[id="entergroupcode"]').type("notacode");
      cy.get('button[id="findgroup"]').click();
      cy.get('h1[id="groupdoesnotexist"]').contains("Group Does Not Exist :(");
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
    });
  });
});
