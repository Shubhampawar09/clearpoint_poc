import { manageMeasureReports } from "../../support/pageObjects/ManageMeasureReports";
import { utils } from "../../support/Utilities/Utils";

import "cypress-wait-until";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

beforeEach(() => {
  Cypress.session.clearAllSavedSessions();
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

describe("Verify measure manage report", () => {
  it("Create manage measure report & add columns and measures", () => {
    cy.visit("/index");
    var measureReportName = manageMeasureReports.randomString(5);
    /*select manage reports in hospital scorecard */
    manageMeasureReports.navigateAndSelectManageReportElements(
      "Upward Airlines Corporate",
      manageMeasureReports.manageReportsList,
      "Measure Reports"
    );
    cy.waitUntil(() =>
      utils
        .getElement(manageMeasureReports.manageReportPlusButton)
        .should("be.visible")
        .click()
    );
    /*verify measure report badge*/
    cy.waitUntil(() =>
      utils
        .getElement(manageMeasureReports.verifyManageReportBadge)
        .should("contain", "Measure Report")
    );
    /*validation message on name field */
    utils
      .getElement(manageMeasureReports.nameValidationMessage)
      .should("contain", "This field is required");
    /*enter random string in measure report name field */
    utils.clearAndType(addMeasures.measureNameField, measureReportName);
    /*select column option from measure report list*/
    utils
      .getElement(manageMeasureReports.measureReportOptions)
      .contains("Columns")
      .click();
    /*verify measure container in column page*/
    cy.waitUntil(() =>
      utils
        .getElement(manageMeasureReports.verifyMeasureContainer)
        .contains("Measure")
        .should("be.visible")
    );
    /*verify & click Add Column button*/
    utils
      .getElement(manageMeasureReports.addColumnButton)
      .should("have.text", "Add Column")
      .click();
    /*verify summary report popup*/
    cy.waitUntil(() =>
      utils
        .getElement(manageMeasureReports.summaryReportPopup)
        .should("have.text", "Select Summary Report Fields")
    );
    /*select checkbox for summary report field*/
    var checkbox =
      manageMeasureReports.selectMeasureSummaryReportCheckboxes("Owner");
    cy.waitUntil(() => utils.getElement(checkbox).click());
    /*get checkbox text*/
    var checkboxText;
    utils.getElement(manageMeasureReports.getCheckboxesText).then(($ele) => {
      checkboxText = $ele.text();
      cy.log(checkboxText);
    });
    /*save summary report popup*/
    utils
      .getElement(manageMeasureReports.summaryReportSaveButton)
      .contains("Save")
      .should("be.visible")
      .click();
    /*verify the owner title*/
    cy.waitUntil(() =>
      utils
        .getElement(
          'div[class="sc-bcXHqe bnjZEc smooth-dnd-draggable-wrapper"] div[class="sc-gswNZR cNrGqi"]'
        )
        .should("contain", checkboxText)
    );
    /*get length of columns added and verify the percent of input field*/
    manageMeasureReports.verifyPercentageAccordingToColumnsAdded();
    /*select measures from columns list*/
    utils
      .getElement(manageMeasureReports.measureReportOptions)
      .contains("Measures")
      .click();
    /*verify select scorecard title */
    utils.waitFor(3000);
    utils
      .getElement(manageMeasureReports.verifySelectScorecardsTitle)
      .contains("Select Scorecards");
    /*verify select scorecard checkbox is selected*/
    utils
      .getElement(manageMeasureReports.clickToSelectSpecificElement)
      .should("have.text", "Click to select specific elements.")
      .click();
    /*verify and select the elements from select elements popup*/
    utils
      .getElement(manageMeasureReports.verifySelectElementsPopupTitle)
      .should("contain.text", "Select Elements");
    /*select elements from list*/
    utils
      .getElement(manageMeasureReports.selectElementsFromMeasurePage("Revenue"))
      .click();
    /*save selected element*/
    cy.waitUntil(() =>
      utils
        .getElement(manageMeasureReports.summaryReportSaveButton)
        .contains("Save")
        .click()
    );
    /*save measure */
    cy.waitUntil(() => utils.getElement(addMeasures.saveButton).click());
    /*verify report added popup*/
    utils
      .getElement(addMeasures.AlertPopup)
      .contains("Report Added")
      .should("be.visible");
    /*scroll till measure report & select*/
    var reportName = manageMeasureReports.selectReportNameFromList(measureReportName);
    utils
      .scrollToElement(reportName, { timeout: 5000 })
      .should("be.visible")
      .click();
    /*elements to load*/      
    addMeasures.loadingElement(); 
  });
});
