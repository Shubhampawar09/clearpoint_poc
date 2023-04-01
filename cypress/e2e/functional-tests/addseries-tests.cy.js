import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { manageElements } from "../../support/pageObjects/ManageElements";
import { addSeries } from "../../support/pageObjects/AddSeries";


import "cypress-wait-until";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
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

describe("Validate and add series to measure", () => {
  
  it("Verify manage element page", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement('Hospital Scorecard',manageElements.manageElementsList,'Measures');
    });
  });

  it("Scroll till measure and go to measure detail page", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement('Hospital Scorecard',manageElements.manageElementsList,'Measures');

    var measureName = addMeasures.selectMeasureFromList('SampleMeasure 53');
    utils
      .scrollToElement(measureName, { timeout: 5000 })
      .should("be.visible")
      .click();
    utils
      .getElement(addSeries.measureDetailPageTitle)
      .contains('SampleMeasure 53');

    utils
      .getElement(addSeries.measureDetailSubTitle)
      .contains("Hospital Scorecard");
  });

  it("Verify the measure data table and double click", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement('Hospital Scorecard',manageElements.manageElementsList,'Measures');
    //verify and double click on measure data table
    var measureName = addMeasures.selectMeasureFromList('SampleMeasure 53');
    utils
      .scrollToElement(measureName, { timeout: 5000 })
      .should("be.visible")
      .click();
    utils.waitFor(3000);
    /*scroll till measure data table */
    utils
      .scrollToElement(addSeries.measureDataTableHeader)
      .should("be.visible", true)
      .dblclick();
    utils.getElement(addSeries.addSeriesButton).click();
    utils.waitFor(2000);
  });

  it("Verify add series page and enter credentials", () => {
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement('Hospital Scorecard',manageElements.manageElementsList,'Measures');
    // var title = "SampleMeasure 53";
    // var element =
    //   '//div[contains(@class,"kjabrV")]//a[contains(text(),"' + title + '")]';
    var measureName = addMeasures.selectMeasureFromList('SampleMeasure 53');
    utils
      .scrollToElement(measureName, { timeout: 5000 })
      .should("be.visible")
      .click();
    utils.waitFor(3000);
    /*scroll till measure table and doubleclick*/
    cy.waitUntil(()=>utils
      .scrollToElement(addSeries.measureDataTableHeader)
      .should("be.visible", true)
      .dblclick());
    /*click add series*/
    cy.waitUntil(()=>utils.getElement(addSeries.addSeriesButton).click());
    utils
      .clearAndType(addSeries.addSeriesNameTextField, "Euro")
      .should("be.visible", true);
    utils.clickOn(addSeries.tagsDropdown);
    addSeries.selectTagsFromDropdown("Calculated Field test series");
    utils.clickOn(addSeries.addSeriesSaveButton);
    cy.waitUntil(()=>utils.getElement(addMeasures.AlertPopup).contains('Series Added'));
  });


