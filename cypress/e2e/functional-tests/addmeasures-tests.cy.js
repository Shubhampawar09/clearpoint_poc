import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";

import "cypress-wait-until";
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

var title;
title = `SampleMeasure ${addMeasures.randomNumber(2)}`;

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

/**
 * This describe block is used to add the measures.
 */
describe("Validate create measures", () => {
  it("Verify and click cube element", () => {
    cy.visit("/index");
    utils.getElement(homePage.cubeElement).eq(3).click();
  });

  it("Validate and select scorecard element", () => {
    cy.visit("/index");
    utils.waitFor(3000);
    utils.getElement(homePage.cubeElement).eq(3).click();
    cy.waitUntil(() => utils.clickOn(homePage.scorecardDropdown));
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
  });

  it("Validate manage element page", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement(
      "Hospital Scorecard",
      manageElements.manageElementsList,
      "Measures"
    );
    utils
      .getElement(manageElements.measureElementBox)
      .should("have.css", "border")
      .and("contain", "rgb(26, 179, 148)");
  });

  it("Verify and create add measure", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement(
      "Hospital Scorecard",
      manageElements.manageElementsList,
      "Measures"
    );
    /*verify and create measure */
    utils.clickOn(addMeasures.plusButtonToAddMeasure);
    utils
      .getElement(addMeasures.addMeasureTitle)
      .should("be.visible", true)
      .should("contain", "Add Measure");

    utils
      .clearAndType(addMeasures.measureNameField, title)
      .should("be.visible", true);
    //select and enter the credentials
    utils.clickOn(addMeasures.tagDropdown);
    addMeasures.selectElementFromDropdown("Tag for Series Filter");
    cy.waitUntil(() => utils.clickOn(addMeasures.ownerDropdown));
    addMeasures.selectElementFromDropdown("Not Defined");
    utils.getElement(addMeasures.collaboratorsDropdown).eq(1).click();
    addMeasures.selectElementFromDropdown("UG SC Admin");
    addMeasures.enterNumericValue("Numeric Edit", 25);
    addMeasures.enterNumericValue("Bulk Change Numeric", 30);
    utils.clickOn(addMeasures.dataGridScorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    utils.getElement(addMeasures.elemetTypeDropdown).click();
    addMeasures.selectElementFromDropdown("Initiative");
    utils
      .clearAndType(addMeasures.passesTextField, "Sample Text")
      .should("be.visible", true);
    utils
      .clearAndType(addMeasures.stringEditTextBox, "Sample Data")
      .should("be.visible", true);
    utils
      .clearAndType(addMeasures.longEditTextBox, "Random Text")
      .should("be.visible", true);
    //enter the numeric values
    cy.waitUntil(() => addMeasures.enterNumericValue("Currency Edit", 25));
    cy.waitUntil(() => addMeasures.enterNumericValue("Integer Edit", 30));
    cy.waitUntil(() => addMeasures.enterNumericValue("Accounting Edit", 40));
    cy.waitUntil(() => addMeasures.enterNumericValue("Percent Edit", 3));
    //select element from dropdown
    utils.clickOn(addMeasures.pickListDropdown);
    addMeasures.selectElementFromDropdown("Dog");
    utils.clickOn(addMeasures.multiplePickListDropdown);
    addMeasures.selectElementFromDropdown(" Green");
    utils.clickOn(addMeasures.userPickListDropdown);
    addMeasures.selectElementFromDropdown("Bree Bartee");
    utils.clickOn(addMeasures.statusIconEditDropdown);
    utils.clickOn(addMeasures.selectOnTargetStatusIcon);
    cy.waitUntil(() => utils.clickOn(addMeasures.saveButton));
    utils.waitFor(5000);
    cy.waitUntil(() =>
      utils.getElement(addMeasures.AlertPopup).contains("Measure Added")
    );
  });

  it("verify add and delete duplicate measures", () => {
    cy.visit("/index");
    var text = "Hello World!!!";
    manageElements.navigateToManageElementsAndSelectElement(
      "Hospital Scorecard",
      manageElements.manageElementsList,
      "Measures"
    );
    /*scroll and select the measure from list */
    var measureName = "SampleMeasure 53";
    var objectiveElement = addMeasures.selectMeasureFromList(measureName);
    utils
      .scrollToElement(objectiveElement, { timeout: 10_000 })
      .should("be.visible", true)
      .click();
    /*select owner*/
    utils.getElement(addMeasures.ownerPodTable).contains("Owner").dblclick();
    utils.getElement(addMeasures.ownerField).eq(1).click();
    utils
      .getElement(addMeasures.ownerListElements)
      .contains("Bree Bartee")
      .click();
    /*enter text in analysis field*/
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.analysisPodTable)
        .contains("Analysis")
        .dblclick()
    );
    cy.waitUntil(() =>
      utils.getElement(addMeasures.analysisTextArea).clear().type(text)
    );
    /*submit all the changes*/
    utils.getElement(addMeasures.submitChangesInMeasure).click();
    utils.waitFor(3000);
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.verifyAnalysisText)
        .should("contain.text", text)
    );
    /*select manage elements*/
    cy.waitUntil(() =>
      utils
        .getElement(homePage.manageElements)
        .should("be.visible", true)
        .click()
    );
    utils
      .getElement(manageElements.measureElementBox)
      .should("contain", "Measures")
      .click();
    /*select measures from list */
    addMeasures.selectMeasureFromList("SampleMeasure 53 (Copy)");
    utils
      .scrollToElement(objectiveElement, { timeout: 5_000 })
      .should("be.visible", true);
    utils
      .getElement(addMeasures.ellipsesButtonToDuplicateAndDelete)
      .eq(1)
      .click();
    /*select duplicate measure*/
    utils
      .getElement(addMeasures.selectDuplicateAndDeleteMeasureFromEllipses)
      .contains("Duplicate Measure")
      .click();
    /*select checkboxes */
    utils.getElement(addMeasures.selectCheckboxesToCopyData).eq(0).click();
    utils.waitFor(2000);
    utils.getElement(addMeasures.selectCheckboxesToCopyData).eq(0).click();
    utils
      .getElement(addMeasures.duplicateButtonOnPopup)
      .contains("Duplicate")
      .click();
    /*verify duplicate measure */
    utils.getElement(addMeasures.verifyDuplicateMeasure);
    /*delete duplicate measure */
    utils.getElement(addMeasures.deleteDuplicateElement).eq(1).click();
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.selectDuplicateAndDeleteMeasureFromEllipses)
        .contains("Delete Measure")
        .click()
    );
    /*verify delete popup*/
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.deletePopupTitle)
        .should("contain.text", "Delete  Measure")
        .and("be.visible")
    );
    cy.waitUntil(() =>
      utils
        .getElement(addMeasures.deletePopupButton)
        .contains("Delete ")
        .click()
    );
    utils
      .getElement(addMeasures.AlertPopup, { timeout: 2000 })
      .contains("Measure Deleted")
      .should("be.visible");
  });
});
