import { utils } from "../../support/Utilities/Utils";
import { addmilestone } from "../../support/pageObjects/AddMilestone";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import "cypress-wait-until";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

var title = `Sample Milestone ${addMeasures.randomNumber(2)}`;

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("/login");
    cy.login(email, password);
    cy.url().should("include", "/login");
    cy.wait(3000);
  });
});

describe("validate and create initiative", () => {
  it("Verify and add the initiative", () => {
    cy.visit("/index");
    addmilestone.initialSteps("Hospital Scorecard");
    //click on initiative box on manage element//
    utils.clickOn(addmilestone.initiativesBox);
    /*perform actions on initiative page*/
    utils.clickOn(addmilestone.intiativePlusButton);
    utils.clearAndType(addmilestone.addNameField, "Sample Initiative");
    utils.getElement(addmilestone.initiativeNavBarLink).eq(2).click();
    /*verify and save the initiative on popup*/
    utils
      .getElement(addmilestone.verifySaveAddInitiativePopup, { timeout: 2000 })
      .contains("Please Save To Continue");
    utils.getElement(addmilestone.saveAddInitiative).eq(1).click();
    cy.log("toast message");
    cy.waitUntil(()=>utils
      .getElement(addmilestone.alertToSaveInitiative, { timeout: 4000 })
      .contains("Initiative Added"));
    /*verify and create milestone*/
    cy.waitUntil(()=>utils
      .getElement(addmilestone.addMilestonePlusButton, { timeout: 1000 })
      .eq(1)
      .click());
    utils
      .getElement(addmilestone.addMilestoneTitle)
      .eq(1)
      .should("be.visible", true);
    /*enter credentials and save milestone*/
    cy.waitUntil(() => utils.clearAndType(addmilestone.addNameField, title));
    utils.getElement(addmilestone.startDateButton).eq(1).click();
    utils
      .getElement(addmilestone.daysCalenderElements, { timeout: 2000 })
      .eq(6)
      .click();
    utils.getElement(addmilestone.endDateButton).eq(1).click();
    utils
      .getElement(addmilestone.calenderSingleNextButton, { timeout: 2000 })
      .click();
    cy.waitUntil(() =>
      utils.getElement(addmilestone.daysCalenderElements).eq(8).click()
    );
    cy.get(
      '.jUhvmA > form > .hMSeOi > .gCDViB > .sc-gswNZR > [data-testid="split-button-saveAndContinue"]',
      { timeout: 2000 }
    ).click();
    /*verify the milestone created  */
    utils
      .getElement(".milestone-list-item-container div.hNIDpU")
      .should("contain", title);
    /*edit the milestone */
    utils.clickOn(addmilestone.editMilestoneEllipses);
    utils.getElement(addmilestone.editMilestoneButton).eq(2).click();
    cy.waitUntil(() =>
      utils.getElement(addmilestone.editMilestoneNavBar).eq(1).click()
    );
    utils.getElement(addmilestone.completeCheckBox).eq(0).click();
    cy.get(
      '.jUhvmA > form > .hMSeOi > .gCDViB > .sc-gswNZR > [data-testid="split-button-saveAndContinue"]'
    ).click();
    
    cy.waitUntil(()=>utils
      .getElement(
        '.milestone-list-item-container div[class*="sc-iTFTee cJrDdT"] small'
      )
      .should("contain.text", "Completed "));
    
    cy.waitUntil(()=>utils.getElement(".sc-gswNZR.gCDViB div button.btn-primary").eq(0).click());
    //verify toast updated
    utils
      .getElement(addmilestone.alertToSaveInitiative, { timeout: 2000 })
      .contains("Initiative Updated");
    utils.waitFor(2000);
  });

  it.only("verify and add milestone links", () => {
    cy.visit("/index");
    /*verify and add links to milestone*/
    addmilestone.initialSteps("Sports");
    utils.clickOn(addmilestone.initiativesBox);
    addmilestone.selectInitiativeFromDropdown("Winter Olympics");
    /*add initiative plus button */
    cy.waitUntil(() =>
      utils.getElement(addmilestone.intiativePlusButton).eq(1).click()
    );
    utils.getElement(addmilestone.initiativeNavBarLink).eq(2).click();
    /*select link tab on milestone*/
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.linkMilestoneElement)
        .contains("Link Milestone")
    );
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.linkMilestoneElement)
        .should("be.visible", true)
    );
    /*edit milestone ellipses button*/
    utils.clickOn(addmilestone.editMilestoneEllipses);
    cy.waitUntil(() =>
      utils.getElement(addmilestone.editMilestoneButton).eq(2).click()
    );
    utils.getElement(addmilestone.editMilestoneNavBar).eq(5).click();
    /*select link button and edit the link tabs*/
    addmilestone.selectActionItems(0);
    cy.waitUntil(() =>
      utils.getElement(addmilestone.actionItemsPod).should("contain", "Curling")
    );
    utils.getElement(addmilestone.addMilestoneSaveButton).click();
  });
});
