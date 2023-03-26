import { utils } from "../../support/Utilities/Utils";
import { addObjective } from "../../support/pageObjects/AddObjective";
import { copydata } from "../../support/pageObjects/CopyData";

import "cypress-wait-until";

const neatCSV = require("neat-csv");

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

let table;

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

before(() => {
  cy.fixture("sample.csv")
    .then(neatCSV) //convert csv file into object
    .then((data) => {
      table = data;
    })
    .then(console.table);
});

describe("add series", () => {
  it("add series to measure", () => {
    cy.visit("/index");
    copydata.initialSteps();
    /*Select measures from the list and edit measure */
    copydata.selectFromDropdown("SampleMeasure 53");
    /*click edit button*/
    cy.waitUntil(() =>
      utils.getElement(addObjective.editObjectiveButton).eq(1).click()
    );
    cy.waitUntil(() =>
      utils.getElement(addObjective.objectiveNavLinkOptions).eq(3).click()
    );
    /*add series to measure */
    copydata.addSeriesToMeasure();
    /*verify series is present in series list*/
    utils.getElement(copydata.addSeriesToMeasureAndSave).eq(3).click();
    cy.waitUntil(() =>
      utils
        .getElement(
          ".detail-page-pod.drag-item div.eGiaan div.ht_clone_top.handsontable"
        )
        .contains("USD")
    );
    utils.waitFor(3000);
  });

  it.only("read csv data into table", () => {
    cy.visit("/index");
    copydata.initialSteps();
    /*Select measures from the list and edit measure */
    copydata.selectFromDropdown("SampleMeasure 53");
    utils.scrollToElement("//h3[text()='Measure Data']", { timeout: 5_000 });
  });
});
