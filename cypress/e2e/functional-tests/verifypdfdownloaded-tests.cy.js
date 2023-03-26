import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";

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

  it("verify pdf downloaded", () => {
    cy.visit("/index");
    utils.getElement(homePage.cubeElement).eq(2).click();
    utils.clickOn(homePage.scorecardDropdown);
    cy.get(".fidMSc")
      .invoke("text")
      .then((titleText) => {
        pdfTitle = titleText;
      })
        /*select edit dropdown arrow */
        cy.waitUntil(()=>utils.getElement(".hGgsSS button").eq(3).click());
        /*select export pdf*/
        cy.waitUntil(()=>utils
          .getElement(".dropdown-menu.show a")
          .contains("Export to PDF")
          .click());
        /*verify popup title*/
        cy.waitUntil(()=>utils.getElement(".modal-title.h4").contains("Generate PDF"));
        /*click generate pdf button*/
        utils.getElement(".modal-footer button").contains("Generate").click();
        /*click to download pdf on popup*/
        cy.waitUntil(()=>utils.getElement("//div[@role='alert']//a").click());
        utils.waitFor(3000);
        cy.readFile('cypress/downloads/Pre-built+testing+account+-+Welcome+Page+-+2023-03-24+052551.pdf')
        .then((pdfContents)=>{
            expect(pdfContents).to.contain('Welcome Page');
        })
    });
  });

