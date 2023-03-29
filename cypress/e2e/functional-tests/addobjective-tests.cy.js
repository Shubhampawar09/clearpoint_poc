import { utils } from "../../support/Utilities/Utils";
import { addObjective } from "../../support/pageObjects/AddObjective";
import { manageElements } from "../../support/pageObjects/ManageElements";
import { addMeasures } from "../../support/pageObjects/AddMeasures";

import "cypress-wait-until";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

var ObjectiveName = `Sample Objective ${utils.randomNumber(2)}`;

describe("Add objective", () => {
  it("Verify elements and add objective", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement('Objective Testing',manageElements.manageElementsList,'Objectives');
    utils.clickOn(manageElements.PlusButtonToAdd);
    utils
      .getElement(addObjective.addObjectiveSliderTitile)
      .should("contain", "Add Objective");
    utils.clearAndType(addObjective.addOjectiveNameField, ObjectiveName);
    utils.clickOn(addMeasures.saveButton);
    utils.waitFor(3000);
    /*Verify Toast message for Add Objective*/
    utils
      .getElement(addObjective.alertToAddObjective, { timeout: 2000 })
      .contains("Objective Added");
  });

  it("Verify and edit the Objective", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement('Objective Testing',manageElements.manageElementsList,'Objectives');
    /*select objective from the list  */
    var objectiveElement = addObjective.scrollTillObjectiveElement(ObjectiveName);
    utils
      .scrollToElement(objectiveElement, { timeout: 10_000 })
      .should("be.visible", true)
      .click();
    utils.waitFor(3000);
    cy.waitUntil(() =>
      utils.getElement(addObjective.editObjectiveButton).eq(1).click()
    );
    utils.getElement(addObjective.objectiveNavLinkOptions).eq(1).click();
    /*Edit the name of the objective */
    utils.getElement(addObjective.addOjectiveNameField).clear();
    utils.clearAndType(addObjective.addOjectiveNameField,'Sample Objective');
    utils.clickOn(addMeasures.saveButton);
    cy.waitUntil(() =>
      utils
        .getElement(addObjective.alertToAddObjective)
        .should("be.visible", true)
        .contains("Objective Updated")
    );
  });
});
