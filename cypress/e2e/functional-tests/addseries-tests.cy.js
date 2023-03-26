import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { manageElements } from "../../support/pageObjects/ManageElements";
import { measuredetail } from "../../support/pageObjects/MeasureDetail";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

var pageUrl;

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
    measuredetail.initialSteps();

    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    utils
      .getElement(manageElements.manageElementTitle)
      .should("be.visible", true);
    utils
      .getElement(manageElements.measureElementBox)
      .should("contain", "Measures")
      .click();
    cy.url().then(function (url) {
      pageUrl = url;
    });
  });

  it("Scroll till measure and go to measure detail page", () => {
    cy.visit("/manage");
    measuredetail.initialSteps();
    utils
      .getElement(manageElements.measureElementBox)
      .should("contain", "Measures")
      .click();
    var title = "SampleMeasure 53";
    var element =
      '//div[contains(@class,"kjabrV")]//a[contains(text(),"' + title + '")]';
    utils
      .scrollToElement(element, { timeout: 5000 })
      .should("be.visible", true)
      .click();
    utils
      .getElement(measuredetail.measureDetailPageTitle)
      .contains("SampleMeasure 53");

    utils
      .getElement(measuredetail.measureDetailSubTitle)
      .contains("Hospital Scorecard");
  });

  it("Verify the measure data table and double click", () => {
    cy.visit("/index");
    measuredetail.initialSteps();
    //verify and double click on measure data table
    utils
      .getElement(manageElements.measureElementBox)
      .should("contain", "Measures")
      .click();
    var title = "SampleMeasure 53";
    var element =
      '//div[contains(@class,"kjabrV")]//a[contains(text(),"' + title + '")]';
    utils
      .scrollToElement(element, { timeout: 5000 })
      .should("be.visible", true)
      .click();
    utils
      .getElement(measuredetail.measureDataTableHeader)
      .should("be.visible", true)
      .dblclick();
    utils.getElement(measuredetail.addSeriesButton).click();
    utils.waitFor(2000);
  });

  it("Verify add series page and enter credentials", () => {
    cy.visit("/index");
    measuredetail.initialSteps();
    utils
      .getElement(manageElements.measureElementBox)
      .should("contain", "Measures")
      .click();
    var title = "SampleMeasure 53";
    var element =
      '//div[contains(@class,"kjabrV")]//a[contains(text(),"' + title + '")]';
    utils
      .scrollToElement(element, { timeout: 5000 })
      .should("be.visible", true)
      .click();
    utils
      .getElement(measuredetail.measureDataTableHeader)
      .should("be.visible", true)
      .dblclick();
    utils.getElement(measuredetail.addSeriesButton).click();
    utils
      .clearAndType(measuredetail.addSeriesNameTextField, "Euro")
      .should("be.visible", true);
    utils.clickOn(measuredetail.tagsDropdown);
    measuredetail.selectTagsFromDropdown("Calculated Field test series");
    utils.clickOn(measuredetail.addSeriesSaveButton);
  });
});
