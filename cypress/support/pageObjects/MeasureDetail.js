import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";

class MeasureDetail {
  //locators
  measureDetailPageTitle = ".ctWUhV > div > div";
  measureDetailSubTitle = ".ctWUhV > div > div > div";
  selectedEditMeasureIcon = ".hGgsSS > button.btn-primary";
  measureDataTableHeader =
    ".jJPDEG table[class*='sc-bcXHqe gBmhZK no-table-pdf-tag']:last";
  addSeriesButton = ".evfOwK >button";
  addSeriesNameTextField = "#name";
  tagsDropdown = ".select__input-container";
  addSeriesSaveButton = "div.hGgsSS > button.btn-primary:last";
  orangeBarSubmitButton = "div.sc-ilhmMj > div button.btn-primary";

  //methods
  initialSteps = () => {
    utils.getElement(homePage.cubeElement).eq(2).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    utils
      .getElement(manageElements.manageElementTitle)
      .should("be.visible", true);
  };

  selectTagsFromDropdown(text) {
    var element =
      '//div[contains(@class,"select__menu-list")]//span[contains(text(),"' +
      text +
      '")]';
    if (element.startsWith("/") || element.startsWith("(")) {
      return cy.xpath(element).click();
    } else {
      return cy.get(element).click();
    }
  }
}

export const measuredetail = new MeasureDetail();
