import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";

class AddMilestone {
  //locators

  intiativeEditAndStarButton = ".hGgsSS > button";
  addNameField = "#name";
  saveButton = ".hMSeOi div div button:first";

  //milestoneNavBarLink = "//div[contains(@class,'gjVKHl')]//../a[contains(text(),'Milestones')]";
  initiativeNavBarLink = ".gjVKHl a";
  verifySaveAddInitiativePopup = ".iBwOVq > div";
  saveAddInitiative = ".modal-footer > button";
  alertToSaveInitiative = "div[role='alert'] > div";
  addMilestonePlusButton =
    "//div[contains(@class,'input-group-append')]/div/button";
  addMilestoneTitle = ".cAoKZd > span";
  addMilestoneSaveButton =
    "(//button[@type='submit'][normalize-space()='Save'])[2]";

  //Calender elements//
  startDateButton = '[data-testid="startDate"] button';
  daysCalenderElements = ".react-calendar__month-view__days >button";
  endDateButton = '[data-testid="endDate"] button';
  calenderSingleNextButton =
    ".react-calendar.calendar-display > div > button.react-calendar__navigation__next-button";

  //edit milestone elements
  editMilestoneEllipses = ".sc-bcXHqe.bKEyRj";
  editMilestoneButton = "div[class*='portal portal'] a";
  editMilestoneNavBar = ".jUhvmA div.sc-gswNZR.gjVKHl a";
  completeCheckBox =
    ".sc-gswNZR.bbBZlT [class='sc-bcXHqe lgUSOm form-group'] input";
  saveEditMilestoneProcess = ".sc-gswNZR.gCDViB div button.btn-primary";
  saveMilestoneButton =
    '.jUhvmA > form > .hMSeOi > .gCDViB > .sc-gswNZR > [data-testid="split-button-saveAndContinue"]';
  //link milestone
  linkMilestoneElement = ".milestone-list-item-container";
  milestoneLinkButton = ".input-group-append button:last";
  linkTypeDropdown = ".jlshdL div:last";
  linkTypeDropdownElements = ".select__menu-list div";
  linkMilestoneCurlingCheckbox = ".iDUJAB input[type='checkbox']";
  modalFooterSaveButton = ".modal-footer button[type='button']";
  actionItemsPod = ".link-list-item-container";

  //methods

  selectInitiativeFromDropdown(initiativeText) {
    var element =
      '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +
      initiativeText +
      '")]';
    cy.waitUntil(() =>
      utils
        .scrollToElement(element, { timeout: 2000 })
        .should("be.visible", true)
        .click()
    );
  }

  selectActionItems(index) {
    /*select link button on link milestone page*/
    utils.clickOn(addmilestone.milestoneLinkButton);
    utils.waitFor(3000);
    /*select link type from select elements*/
    cy.waitUntil(() => utils.getElement(addmilestone.linkTypeDropdown).click());
    utils.getElement(addmilestone.linkTypeDropdownElements).eq(index).click();
    cy.waitUntil(() =>
      utils.getElement(addmilestone.linkMilestoneCurlingCheckbox).check()
    );
    utils.getElement(addmilestone.modalFooterSaveButton).eq(1).click();
  }

  deleteLinkMilestone(milestoneLinkText) {
    cy.waitUntil(() =>
      utils.getElement(addmilestone.editMilestoneEllipses).eq(0).click()
    );
    cy.waitUntil(() =>
      utils.getElement(addmilestone.editMilestoneButton).eq(2).click()
    );
    utils.waitFor(3000);
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.editMilestoneNavBar)
        .contains(milestoneLinkText)
        .click()
    );
    cy.waitUntil(() =>
      utils.getElement('button[data-testid="unlink-button"]').click()
    );
    cy.waitUntil(() =>
      utils
        .getElement('div[class="modal-title h4"]')
        .contains("Unlink 'Curling'")
        .should("be.visible")
    );
    utils
      .getElement('div[class="sc-bcXHqe bOkzbP modal-body"]')
      .contains("Are you sure you want to unlink this element?")
      .should("be.visible");
    utils.getElement(".modal-footer button").contains("Unlink").click();
    cy.waitUntil(() =>
      utils
        .getElement(addmilestone.saveMilestoneButton, { timeout: 2000 })
        .click()
    );
  }
}
export const addmilestone = new AddMilestone();
