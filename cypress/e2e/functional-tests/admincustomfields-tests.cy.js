import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { customFields } from "../../support/pageObjects/AdminCustomFields";
import { addmilestone } from "../../support/pageObjects/AddMilestone";
import { homePage } from "../../support/pageObjects/HomePage";
import { manageElements } from "../../support/pageObjects/ManageElements";
import { addObjective } from "../../support/pageObjects/AddObjective";

import "cypress-wait-until";
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

var pageUrl;
var title;
title = `Sample Custom ${addMeasures.randomNumber(2)}`;

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

/**
 * Testcase
 * Add Global Custom Fields
 */
describe("verify custom fields name", () => {
  it("verify custom field error message ", () => {
    cy.visit("/index");
    /*select setting left navbar button */
    utils.getElement(customFields.settingNavBarIcon).eq(7).click();
    /*select system setup*/
    utils.getElement(customFields.systemSetupOption).contains("System Setup").click();
    /*verify system setup title */
    utils
      .getElement(customFields.verifySetupTitle)
      .should("have.text", "System Setup")
      .should("be.visible", true);
    /*select custom field option*/
    utils
      .getElement(customFields.customFieldOption)
      .click();
    /*select objective form list*/
    utils.getElement(customFields.selectObjectiveOption).eq(1).click();
    /*add custom field plus button*/
    cy.waitUntil(() =>
      utils.getElement(customFields.addCustomFieldButton).eq(1).click()
    );
    /*verify the custom name error message */
    utils
      .getElement(customFields.verifyCustomNameFieldError)
      .should("have.text", "This field is required");
  });

  it("verify error message for custom name to long", () => {
    cy.visit("/index");
    customFields.CustomFieldsInitialSteps();

    /*type long name in custom field*/
    utils.clearAndType(
      customFields.customFieldNameBox,
      "this is a really really really looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
    );
    /*verify error message for long custom name*/
    utils
      .getElement(customFields.verifyFieldIsToLongErrorMeassge)
      .should("have.text", "This field is too long");
  });

  it("add global custom field", () => {
    cy.visit("/index");
    customFields.CustomFieldsInitialSteps();
    /*add global custom name*/
    cy.waitUntil(() => utils.clearAndType(customFields.customFieldNameBox, title));
    /*save custom global field*/
    cy.waitUntil(() => utils.clickOn(addmilestone.addMilestoneSaveButton));
    /*verify custom field added */
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.AlertPopup, { timeout: 2000 })
        .contains("Custom Field Added")
        .should("be.visible")
    );
    /*verify the global custom field in objective list*/
    cy.waitUntil(() =>
      utils
        .getElement(customFields.verifyGlobalCustomFieldInList)
        .contains(title)
    );
  });

  it("verify global custom field added to objective", () => {
    cy.visit("/index");
    /*select cube element*/
    utils.getElement(homePage.cubeElement).eq(3).click();
    /*select scorecard hospital from dropdown*/
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    addMeasures.loadingElement();
    /*select manage elements from list*/
    utils
      .getElement(homePage.manageElements)
      .should("be.visible")
      .click();
      utils.waitFor(5000)   
    addMeasures.loadingElement();
    /*verify manage element title*/
    cy.waitUntil(() =>
      utils
        .getElement(manageElements.manageElementTitle)
        .should("be.visible")
    );
    /*select objective*/
    cy.waitUntil(() =>
      utils
        .getElement(addObjective.addObjectiveElementBox)
        .eq(0)
        .should("contain", "Objectives")
        .click()
    );
    utils
      .scrollToElement(customFields.selectObjectiveFromList(), { timeout: 10_000 })
      .should("be.visible", true)
      .click();
    utils.waitFor(3000);
    /*select edit dropdown*/
    utils.getElement(".dropdown-toggle.btn.btn-primary").eq(1).click();
    /*selecy edit layout from dropdown*/
    cy.waitUntil(() =>
      utils.getElement(".dropdown-menu.show a").contains("Edit Layout").click()
    );
    /*type danger in filter type*/
    utils.clearAndType(".sc-gswNZR.bpVOgy input", "Danger");
    /*verify the Danger zone custom field */
    utils
      .getElement(".list-item-container div.sc-gswNZR.cRJhXY")
      .contains("Danger zone")
      .should("be.visible");
  });
});
