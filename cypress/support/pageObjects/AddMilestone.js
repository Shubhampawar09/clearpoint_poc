import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";

class AddMilestone {
  //locators

  initiativesBox = ".gHQGic:nth-child(3) > div > div:first";
  intiativePlusButton = ".hGgsSS >button";
  addNameField = "#name";
  saveButton = ".hMSeOi div div button:first";

  //milestoneNavBarLink = "//div[contains(@class,'gjVKHl')]//../a[contains(text(),'Milestones')]";
  initiativeNavBarLink = ".gjVKHl a";
  verifySaveAddInitiativePopup = ".iBwOVq > div";
  saveAddInitiative = ".modal-footer > button";
  alertToSaveInitiative = "div[role='alert'] > div";
  addMilestonePlusButton = ".hGgsSS > button";
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
  editMilestoneEllipses =
    ".list-item-container.milestone-list-item-container > div >div >button svg";
  editMilestoneButton = "div[class*='portal portal'] a";
  editMilestoneNavBar =
    "div[class='sc-gswNZR jUhvmA'] a[class*='sc-gswNZR eWYLqL'] ";
  completeCheckBox =
    ".sc-gswNZR.bbBZlT [class='sc-bcXHqe lgUSOm form-group'] input";
  saveEditMilestoneProcess = ".sc-gswNZR.gCDViB div button.btn-primary";

  //link milestone
  linkMilestoneElement = ".milestone-list-item-container";
  milestoneLinkButton = ".input-group-append button:last";
  linkTypeDropdown = ".jlshdL div:last";
  linkTypeDropdownElements = ".select__menu-list div";
  linkMilestoneCurlingCheckbox = ".iDUJAB input[type='checkbox']";
  modalFooterSaveButton = ".modal-footer button[type='button']";
  actionItemsPod = ".link-list-item-container";

  //methods

  initialSteps = (scorecard) => {
    //utils.clickOn(homePage.cubeElement).eq(2);
    utils.getElement(homePage.cubeElement).eq(2).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown(scorecard);
    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    utils
      .getElement(manageElements.manageElementTitle)
      .should("be.visible", true);
  };

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
    utils.clickOn(addmilestone.milestoneLinkButton);
    utils.waitFor(3000);
    cy.waitUntil(() => utils.getElement(addmilestone.linkTypeDropdown).click());
    utils.getElement(addmilestone.linkTypeDropdownElements).eq(index).click();
    utils
      .getElement(addmilestone.linkMilestoneCurlingCheckbox)
      .check()
      .should("be.checked");
    utils.getElement(addmilestone.modalFooterSaveButton).eq(1).click();
  }
}
export const addmilestone = new AddMilestone();
