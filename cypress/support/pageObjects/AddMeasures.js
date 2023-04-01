import { utils } from "../Utilities/Utils";
import { homePage } from "../../support/pageObjects/HomePage";
import { manageElements } from "../../support/pageObjects/ManageElements";

class AddMeasures {
  //locators
  plusButtonToAddMeasure = "button[data-testid='split-button-add']";
  addMeasureTitle = ".sc-ipEyDJ > span";
  measureNameField = "input#name";
  tagDropdown = "#tags > div:nth-child(3)";
  tagListElements = "#react-select-2-listbox >div>div";
  ownerDropdown = "(//label[text()='Owner']//following::div)[7]";
  collaboratorsDropdown = ".select__value-container div.css-ackcql";
  numericEditTextBox =
    "//div[contains(@class,'hzKYCo')]/child::label[contains(text(),'Numeric Edit')]/following-sibling::input";
  bulkChangeNumericTextBox =
    "//div[contains(@class,'hzKYCo')]/child::label[contains(text(),'Bulk Change Numeric')]/following-sibling::input";
  dataGridScorecardDropdown =
    "(//legend[text()='Data Grid Edit']//following::div[@class='sc-fLcnxK iTNAtv'])[1]";
  elemetTypeDropdown = "(//label[text()='Element Type']//following::div)[1]";
  passesTextField = "//textarea[@id='custom88384.value']";
  datePicker = "div.input-group:nth-child(2)";
  stringEditTextBox = "(//div[contains(@class,'hzKYCo')])[6]//child::input";
  longEditTextBox = "(//div[contains(@class,'hzKYCo')])[7]//child::textarea";
  htmlTextEditActivateButton =
    "//button[contains(text(),'Click to activate HTML editor')]/ancestor::div/child::fieldset/legend[contains(text(),'HTML Text Edit')]";
  pickListDropdown =
    "(//label[normalize-space()='Picklist Edit']/..//span/div)[1]";
  multiplePickListDropdown =
    "(//div[contains(@class,'select__value-container')])[3]";
  userPickListDropdown =
    "(//label[normalize-space()='User Picklist Edit']/..//span/div)[1]";
  statusIconEditDropdown =
    "(//div[contains(@class,'select__value-container')])[4]";
  selectOnTargetStatusIcon = "//div[contains(text(),'On Target')]";
  saveButton = "(//button[normalize-space()='Save'])[1]";

  //duplicate measure
  ownerPodTable = "div[class='sc-gswNZR kQgDhL'] h3[class='sc-bcXHqe gZhPBL']";
  ownerField = "div[class='sc-cwSeag hztxxA'] div";
  ownerListElements = ".select__menu-list div";
  analysisPodTable = "div[class='sc-gswNZR NplrE'] table";
  analysisTextArea = ".form-group div p";
  verifyAnalysisText = "[class*='htmlarea html-display']";
  submitChangesInMeasure = ".sc-ilhmMj.gqpIMb.row button[type='submit']";
  ellipsesButtonToDuplicateAndDelete =
    "//a[contains(text(),'SampleMeasure 53')]/following::div/button";
  selectDuplicateAndDeleteMeasureFromEllipses = ".dropdown-menu.show a";
  selectCheckboxesToCopyData =
    ".modal-content [class='icheckbox_square-green']";
  duplicateButtonOnPopup = ".modal-footer button";
  verifyDuplicateMeasure = "//a[contains(text(),'SampleMeasure 53 (Copy)')]";
  deleteDuplicateElement =
    "//a[contains(text(),'SampleMeasure 53 (Copy)')]/following::div/button";
  deletePopupTitle = ".modal-title.h4";
  deletePopupButton = ".modal-footer button";
  AlertPopup = "div[role='alert'] > div";

  
  /**
   * This method is used to select the text from dropdown
   * @param {*} text
   * @returns
   */
  selectElementFromDropdown(text) {
    var element =
      "//div[contains(@class,'select__menu-list')]//div[contains(., '" +
      text +
      "')]";
    if (element.startsWith("/") || element.startsWith("(")) {
      return cy.xpath(element).click();
    } else {
      return cy.get(element).click();
    }
  }

  /**
   * Reference to the class add measures
   * function used to enter the numeric values into text fields
   */
  enterNumericValue(text, value) {
    var element =
      '//div[contains(@class,"hzKYCo")]/child::label[contains(text(),"' +
      text +
      '")]/following-sibling::input';
    return utils.clearAndType(element, value);
  }

  htmlButtonClick(index) {
    return cy
      .xpath(
        '(//button[@type="button"][normalize-space()="Click to activate HTML editor"])[' +
          index +
          "]"
      )
      .click();
  }

  randomNumber(text) {
    for (var i = 0; i < 10; i++) text += Math.floor(Math.random() * 10);
    return text;
  }

  selectMeasureFromList(measureText) {
    return (
      '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +
      measureText +
      '")]'
    );
  }

  verifyMeasure(title) {
    return (
      '//div[contains(@class,"kjabrV")]//a[contains(text(),"' + title + '")]'
    );
  }
  loadingElement(){
    return cy.xpath("//div[@class='sc-gswNZR bAuLSZ']",{timeout:10000}).should('not.exist');
  }

}
export const addMeasures = new AddMeasures();
