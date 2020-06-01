describe("Create Event", () => {
  before(() => {
    cy.prepareDatabase();
  });

  context("When I am logged in as a user", () => {
    beforeEach(() => {
      cy.loginAsUser();
      cy.visit("http://localhost:3000/my-schedule");
    });

    it("check name", () => {
      cy.get("h1").contains("Schedule");
    });

    it("check create event exists", () => {
      cy.get("form");
    });

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
        .select("2:00 PM")
        .should("have.value", "2:00 PM");
      cy.get('select[id="endtime"]')
        .select("2:50 PM")
        .should("have.value", "2:50 PM");
      cy.get('input[id="Monday"]').check({ force: true }).should("be.checked");
      cy.get('button[id="addevent"]').click();
    });

    it("create Untitled Event", () => {
      cy.get("form");
      cy.get('select[id="starttime"]')
        .select("5:00 PM")
        .should("have.value", "5:00 PM");
      cy.get('select[id="endtime"]')
        .select("6:15 PM")
        .should("have.value", "6:15 PM");
      cy.get('input[id="Sunday"]').check({ force: true }).should("be.checked");
      cy.get('button[id="addevent"]').click();
    });

    it("check schedule table exists", () => {
      cy.get('table[id="schedule"]');
    });

    it("check schedule table CS48 Lecture", () => {
      cy.get('table[id="schedule"]').contains("CS48 Lecture");
    });

    it("check schedule table CS48 Section", () => {
      cy.get('table[id="schedule"]').contains("CS48 Section");
    });

    it("check schedule table Untitled", () => {
      cy.get('table[id="schedule"]').contains("Untitled");
    });

    it("check freetime table exists", () => {
      cy.get('table[id="freetime"]');
    });

    it("check freetime table data", () => {
      cy.get('table[id="freetime"]').contains(
        "12:00 AM-5:00 PM, 6:15 PM-11:59 PM"
      );
    });

    it("check freetime table data", () => {
      cy.get('table[id="freetime"]').contains(
        "12:00 AM-2:00 PM, 2:50 PM-11:59 PM"
      );
    });
  });
});
