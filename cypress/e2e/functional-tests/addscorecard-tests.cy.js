import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";
import { addScorecard } from "../../support/pageObjects/AddScorecard";
import { homePage } from "../../support/pageObjects/HomePage";
import "cypress-wait-until";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(2000);
  });
});

var ScorecardName = `Sample Scorecard ${utils.randomNumber(2)}`;

describe("Add Scorecard", () => {
  it.only("verify and create add scorecard", () => {
    cy.visit("/index");
    addScorecard.initialSteps();
    /*add scorecard from scorecard slider*/
    utils.clickOn(manageElements.PlusButtonToAdd);
    utils.clearAndType(addScorecard.addScorecardNameField, ScorecardName);
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

  it("select and edit the scorecard", () => {
    cy.visit("/index");
    addScorecard.initialSteps();
    /*Edit the scorecard */
    var ScorecardElement =
      '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +
      ScorecardName +
      '")]';
    cy.waitUntil(() =>
      utils
        .scrollToElement(ScorecardElement, { timeout: 2000 })
        .should("be.visible", true)
        .click()
    );
    cy.waitUntil(() =>
      utils
        .getElement(addScorecard.verifyScorecardDropdown)
        .invoke("text")
        .should("contains", ScorecardName)
    );
  });

  it.only("verify and add reports to scorecard", () => {
    cy.visit("/manage");
    /*verify and add reports to scorecard*/
    utils.getElement(homePage.leftNavBarElements).eq(3).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown(ScorecardName);
    cy.waitUntil(() =>
      utils
        .getElement(addScorecard.verifyScorecardDropdown)
        .invoke("text")
        .should("contains", ScorecardName)
    );
    cy.waitUntil(() =>
      utils
        .getElement(addScorecard.verifyScorecardDropdown)
        .invoke("text")
        .should("contains", ScorecardName)
    );
    utils.clickOn(addScorecard.manageReportsForScorecard);
    utils.clickOn(manageElements.PlusButtonToAdd);
    utils.clearAndType(addScorecard.addScorecardNameField, ScorecardName);
    cy.waitUntil(() => utils.clickOn(addMeasures.saveButton));
    cy.waitUntil(() =>
      cy
        .get(".sc-gswNZR.doAFQo div.list-item-container")
        .should("contain", ScorecardName)
    );
  });
});
