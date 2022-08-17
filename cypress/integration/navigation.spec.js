describe("Navigation", () => {
  //Navigate the project root
  it("should visit root", () => {
    cy.visit("/");
  });

  //Navigate day of the appointment days
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")

  });

});
