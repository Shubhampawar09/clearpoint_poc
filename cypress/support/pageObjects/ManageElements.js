import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";

class ManageElements {
  //locators
  manageElementTitle = ".hVjXlY  >div >div:first";
  listOfElements = "//div[@class='sc-gswNZR jZySzZ']/*";
  measureElementBox = ".gHQGic:nth-child(2) >div>div:first";
  objectivesElementBox = ".gHQGic:nth-child(1) >div>div:first";
  PlusButtonToAdd = ".hGgsSS >button";
  manageElementsList = ".gHQGic";

  //methods
  selectMeasure(text) {
    var element = '.sc-jcMfQk:contains("' + text + '")';
    return cy.get(element);
  }

  navigateToManageElementsAndSelectElement(scorecard, elementBoxes, elementText) {
    utils.getElement(homePage.leftNavBarElements).eq(3).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown(scorecard);
    addMeasures.loadingElement();
    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    utils.waitFor(3000);
    addMeasures.loadingElement();
    utils
      .getElement(manageElements.manageElementTitle)
      .should("be.visible", true);
    utils.waitFor(3000);
    utils.getElement(elementBoxes).contains(elementText).click();
  }
}
export const manageElements = new ManageElements();
