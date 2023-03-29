import { homePage } from "./HomePage";
import { utils } from "../Utilities/Utils";
import { addMeasures } from "./AddMeasures";
import { manageElements } from "./ManageElements";

class AddSeries {
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

export const addSeries = new AddSeries();
