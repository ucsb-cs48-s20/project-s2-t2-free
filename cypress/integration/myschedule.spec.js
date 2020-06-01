describe("Create Event", () => {
  before(() => {
    cy.prepareDatabase();
    cy.loginAsUser();
    cy.visit("http://localhost:3000");
    cy.get(".navbar-nav").contains("My Schedule").click();
  });
  context("When I am logged in as an student", () => {
    it("create event for CS48 Lecture", () => {
      cy.get("form");
      cy.get('input[id="eventname"]')
        .type("CS48 Lecture")
        .should("have.value", "CS48 Lecture");
      cy.get('select[id="starttime"]')
        .select("5:00 PM")
        .should("have.value", "5:00 PM");
      cy.get('select[id="endtime"]')
        .select("6:15 PM")
        .should("have.value", "6:15 PM");
      cy.get('input[id="Tuesday"]').check({ force: true }).should("be.checked");
      cy.get('input[id="Thursday"]')
        .check({ force: true })
        .should("be.checked");
      cy.get('button[id="addevent"]').click();
    });

    it("create event for CS48 Section", () => {
      cy.get("form");
      cy.get('input[id="eventname"]')
        .type("CS48 Section")
        .should("have.value", "CS48 Section");
      cy.get('select[id="starttime"]')
        .select("5:00 PM")
        .should("have.value", "5:00 PM");
      cy.get('select[id="endtime"]')
        .select("6:15 PM")
        .should("have.value", "6:15 PM");
      cy.get('input[id="Monday"]').check({ force: true }).should("be.checked");
      cy.get('button[id="addevent"]').click();
    });
  });
});
