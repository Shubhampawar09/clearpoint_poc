import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";
import { addScorecard } from "../../support/pageObjects/AddScorecard";
import { homePage } from "../../support/pageObjects/HomePage";
import "cypress-wait-until";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

beforeEach(() => {
  Cypress.session.clearAllSavedSessions();
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(2000);
  });
});

var ScorecardName = `Sample Scorecard ${utils.randomNumber(2)}`;

describe("Add scorecard", () => {
  it("verify and create add scorecard", () => {
    cy.visit("/index");
    addScorecard.initialSteps(2, "Hospital Scorecard");
    /*add scorecard from scorecard slider*/
    utils.clickOn(manageElements.PlusButtonToAdd);
    utils.getElement(addScorecard.addScorecardNameField).clear().type(ScorecardName);
    cy.waitUntil(() => utils.clickOn(addMeasures.saveButton));
    cy.waitUntil(() => utils.getElement(addScorecard.editCategoriesField))
      .eq(1)
      .click();
    cy.waitUntil(() =>
      utils
        .getElement(addScorecard.alertToAddScorecard, { timeout: 2000 })
        .contains("Scorecard Added")
    );
  });

  it.only("select and edit the scorecard", () => {
    cy.visit("/index");
    addScorecard.initialSteps(2, "Hospital Scorecard");
    /*edit scorecard name*/
    addScorecard.editScorecard("Sample Scorecard 48","Sample Scorecarddddddd");
    /*verify the scorecard updated*/
    utils.waitFor(2000);
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.AlertPopup)
        .should('contain.text', "Scorecard Updated")
    );
    addMeasures.loadingElement();
    utils.waitFor(10000);
    /*edit scorecard name*/
    addScorecard.editScorecard("Sample Scorecarddddddd","Sample Scorecard 48");
    /*verify scorecard updated*/
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.AlertPopup)
        .should('contain.text', "Scorecard Updated")
    );
  });

  it("verify and add reports to scorecard", () => {
    cy.visit("/index");
    utils.waitFor(3000);
    addScorecard.initialSteps(2, "Hospital Scorecard");
    /*verify and add reports to scorecard*/
    cy.waitUntil(() =>
      utils.getElement(homePage.leftNavBarElements).eq(2).click()
    );
    utils.clickOn(homePage.scorecardDropdown);
    cy.waitUntil(() => addMeasures.selectElementFromDropdown(ScorecardName));
    utils.waitFor(4000);
    addMeasures.loadingElement();
    cy.waitUntil(() =>
      utils
        .getElement(addScorecard.verifyScorecardDropdown)
        .invoke("text")
        .should("contains", ScorecardName)
    );
    cy.waitUntil(() =>
      utils
        .getElement(addScorecard.manageReportsForScorecard)
        .contains("Manage Scorecards")
        .click()
    );
    utils.waitFor(5000);
    cy.waitUntil(() => utils.clickOn(manageElements.PlusButtonToAdd));
    utils.clearAndType(addScorecard.addScorecardNameField, ScorecardName);
    cy.waitUntil(() => utils.clickOn(addMeasures.saveButton));
    utils.waitFor(3000);
    cy.waitUntil(() =>
      cy.get(".drag-drop-list-wrapper").should("contain", ScorecardName)
    );
  });
});
