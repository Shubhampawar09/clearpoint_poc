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
    utils.getElement(".jYJgOS button").eq(7).click();
    /*select system setup*/
    utils.getElement(".gkuRqy div a").contains("System Setup").click();
    /*verify system setup title */
    utils
      .getElement(".sc-gswNZR.fidMSc")
      .should("have.text", "System Setup")
      .should("be.visible", true);
    /*select custom field option*/
    utils
      .getElement(
        "//div[@class='sc-gswNZR guAv']/following::div[text()='Custom Fields']"
      )
      .click();
    /*select objective form list*/
    utils.getElement(".gjVKHl a").eq(1).click();
    /*add custom field plus button*/
    utils.getElement(".js-add-button.btn.btn-primary svg").click();

    /*verify the custom name error message */
    utils
      .getElement(".hzKYCo.form-group div")
      .should("have.text", "This field is required");
  });

  it("verify error message for custom name to long", () => {
    cy.visit("/index");
    customFields.CustomFieldsInitialSteps();
    /*type long name in custom field*/
    utils.clearAndType(
      "#name",
      "this is a really really really looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
    );
    /*verify error message for long custom name*/
    utils
      .getElement(".sc-gswNZR.hjwsSB")
      .should("have.text", "This field is too long");
  });

  it("add global custom field", () => {
    cy.visit("/index");
    customFields.CustomFieldsInitialSteps();
    /*add global custom name*/
    cy.waitUntil(() => utils.clearAndType("#name", title));
    /*save custom global field*/
    cy.waitUntil(() => utils.clickOn(addmilestone.addMilestoneSaveButton));
    /*verify custom field added */
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.AlertPopup, { timeout: 2000 })
        .contains("Custom Field Added")
        .should("be.visible")
    );
    utils.waitFor(5000);
    /*verify the global custom field in objective list*/
    cy.waitUntil(() =>
      utils
        .getElement(".custom-field-list-item-container-objective div.bnZTyx")
        .contains(title)
    );
  });

  it.only("verify global custom field added to objective", () => {
    cy.visit("/index");
    /*select cube element*/
    utils.getElement(homePage.cubeElement).eq(3).click();
    /*select scorecard hospital from dropdown*/
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    /*select manage elements from list*/
    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    /*verify manage element title*/
    cy.waitUntil(() =>
      utils
        .getElement(manageElements.manageElementTitle)
        .should("be.visible", true)
    );
    /*select objective*/
    cy.waitUntil(() =>
      utils
        .getElement(addObjective.addObjectiveElementBox)
        .eq(0)
        .should("contain", "Objectives")
        .click()
    );
    /*select objective from list of objectives*/
    var Objectivename = "Sampl Objective";
    var objectiveElement =
      '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +
      Objectivename +
      '")]';
    utils
      .scrollToElement(objectiveElement, { timeout: 10_000 })
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
