import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";

import "cypress-wait-until";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

let pdfTitle;
beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

describe("verify pdf downloaded", () => {
  it.skip("verify pdf downloaded", () => {
    cy.visit("/index");
    utils.getElement(homePage.cubeElement).eq(3).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    /*select edit dropdown arrow */
    cy.waitUntil(() => utils.getElement(".hGgsSS button").eq(3).click());
    /*select export pdf*/
    cy.waitUntil(() =>
      utils
        .getElement(".dropdown-menu.show a")
        .contains("Export to PDF")
        .click()
    );
    /*verify popup title*/
    cy.waitUntil(() =>
      utils.getElement(".modal-title.h4").contains("Generate PDF")
    );
    /*click generate pdf button*/
    cy.waitUntil(()=>utils.getElement(".modal-footer button").contains("Generate").click());
    utils.waitFor(20000);
    cy.waitUntil(() =>
      utils
        .getElement(".UDJqv strong a")
        .contains("Click here to download.")
        .click()
    );
    /*click to download pdf on popup*/
    cy.waitUntil(() => utils.getElement("//div[@role='alert']//a").click());
    utils.waitFor(3000);
    cy.readFile(
      "cypress/downloads/Pre-built+testing+account+-+Welcome+Page+-+2023-03-24+052551.pdf"
    ).then((pdfContents) => {
      expect(pdfContents).to.contain("Welcome Page");
    });
  });
});
