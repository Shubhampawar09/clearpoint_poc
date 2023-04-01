import { utils } from "../../support/Utilities/Utils";
import { addmilestone } from "../../support/pageObjects/AddMilestone";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";
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

describe("Validate and create initiative", () => {
  it("Verify and add initiative and add milestone to initiative", () => {
    /*verify and add initiative */
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement(
      "Hospital Scorecard",
      manageElements.manageElementsList,
      "Initiatives"
    );
    addMeasures.loadingElement();
    /*perform actions on initiative page*/
    utils.clickOn(addmilestone.intiativeEditAndStarButton);
    utils.clearAndType(addmilestone.addNameField, title);
    utils.getElement(addmilestone.initiativeNavBarLink).eq(2).click();
    /*verify and save the initiative on popup*/
    utils
      .getElement(addmilestone.verifySaveAddInitiativePopup, { timeout: 2000 })
      .contains("Please Save To Continue");
    utils.getElement(addmilestone.saveAddInitiative).eq(1).click();
    cy.log("toast message");
    utils.waitFor(3000);
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.alertToSaveInitiative, { timeout: 4000 })
        .contains("Initiative Added")
    );
    /*verify and create milestone*/
    utils.waitFor(6000);
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.addMilestonePlusButton, { timeout: 1000 })
        .eq(0)
        .should("be.visible")
        .click()
    );
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.addMilestoneTitle)
        .eq(1)
        .should("be.visible")
    );
    /*enter credentials and save milestone*/
    utils.clearAndType(addmilestone.addNameField, title);
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
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.saveMilestoneButton, { timeout: 2000 })
        .click()
    );
    /*verify the milestone created  */
    cy.waitUntil(() =>
      utils
        .getElement(".milestone-list-item-container div.hNIDpU")
        .should("contain", title)
    );
    /*edit the milestone */
    utils.clickOn(addmilestone.editMilestoneEllipses);
    utils.getElement(addmilestone.editMilestoneButton).eq(2).click();
    utils.waitFor(3000);
    cy.waitUntil(() =>
      utils.getElement(addmilestone.editMilestoneNavBar).eq(1).click()
    );
    /*click on completed check box in edit milestone field */
    utils.getElement(addmilestone.completeCheckBox).eq(0).click();
    cy.get(
      '.jUhvmA > form > .hMSeOi > .gCDViB > .sc-gswNZR > [data-testid="split-button-saveAndContinue"]'
    ).click();
    /*verify initivative updated alert */
    utils.waitFor(2000);
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.alertToSaveInitiative, { timeout: 4000 })
        .contains("Milestone Updated")
    );
    cy.waitUntil(() =>
      utils.getElement(".sc-gswNZR.gCDViB div button.btn-primary").eq(0).click()
    );
    //verify toast updated
    utils
      .getElement(addmilestone.alertToSaveInitiative, { timeout: 2000 })
      .contains("Initiative Updated");
    utils.waitFor(2000);
  });

  it("Add milestone link to initiative and delete link", () => {
    /*select initiative(i.e winter initiative) and add links to initiative*/
    cy.visit("/index");
    manageElements.navigateToManageElementsAndSelectElement(
      "Sports",
      manageElements.manageElementsList,
      "Initiatives"
    );
    addmilestone.selectInitiativeFromDropdown("Winter Olympics");
    utils.waitFor(3000);
    /*select edit option*/
    cy.waitUntil(() =>
      utils.getElement(addmilestone.intiativeEditAndStarButton).eq(1).click()
    );
    /*select milestone option from links */
    utils.getElement(addmilestone.initiativeNavBarLink).eq(2).click();
    /*verify link milestone is visible*/
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.linkMilestoneElement)
        .contains("Link Milestone").should('be.visible')
    );
    /*select milestone ellipses button*/
    utils.waitFor(3000)
    cy.waitUntil(()=>utils.getElement(addmilestone.editMilestoneEllipses).eq(0).click());
    cy.waitUntil(() =>
      utils.getElement(addmilestone.editMilestoneButton).eq(2).click()
    );
    utils.waitFor(3000);
    cy.waitUntil(()=>utils.getElement(addmilestone.editMilestoneNavBar).contains('Links').click());
    /*select link button to add link tabs*/
    addmilestone.selectActionItems(0);
    cy.waitUntil(() =>
      utils.getElement(addmilestone.actionItemsPod).should("contain", "Curling")
    );
    utils.getElement(addmilestone.addMilestoneSaveButton).click();
    /*delete link for milestone*/
    addmilestone.deleteLinkMilestone('Links');
    utils.getElement(addMeasures.AlertPopup).should('contain','Milestone Updated');
  });
});
