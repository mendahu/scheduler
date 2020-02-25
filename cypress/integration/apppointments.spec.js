describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
  });

  it("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an appointment", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Django McGee");

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Django McGee");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should delete an appointment", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});

    cy.contains("Confirm")
      .click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});

// Booking

// Visits the root of our web server
// Clicks on the "Add" button in the second appointment
// Enters their name
// Chooses an interviewer
// Clicks the save button
// Sees the booked appointment

// Editing

// Visits the root of our web server
// Clicks the edit button for the existing appointment
// Changes the name and interviewer
// Clicks the save button
// Sees the edit to the appointment

// Canceling

// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty