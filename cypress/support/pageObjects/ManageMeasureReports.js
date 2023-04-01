import { utils } from "../Utilities/Utils";
import { homePage } from "../pageObjects/HomePage";
import { addMeasures } from "../pageObjects/AddMeasures";

class ManageMeasureReports {
  manageReports = ".iJrfjt > a:nth-child(4)";
  verifyManageReportsTitleAndSubTitle = ".sc-gswNZR.itzORk";
  manageReportsList = ".gHQGic";
  manageReportPlusButton = "button[data-testid='split-button-add']";
  verifyManageReportBadge = 'span[class="sc-bcXHqe cGokcz badge badge-info"]';
  nameValidationMessage = 'div[class="sc-fnGiBr hzKYCo form-group"] div[class="sc-gswNZR hjwsSB"]';
  /*column page locator*/
  measureReportOptions = 'div[class="sc-gswNZR gjVKHl"] a';
  verifyMeasureContainer = 'div[class="smooth-dnd-container horizontal"] label';
  addColumnButton = ".sc-gswNZR.bzMwXP.field-column-title button";
  summaryReportPopup = ".modal-content div.modal-header";
  summaryReportSaveButton = ".modal-footer button";
  measureReportColumnsCount ='div[class="sc-cUEOzv hqLCbA"] div[class="sc-bcXHqe bnjZEc smooth-dnd-draggable-wrapper"]'
  columnPercentageInputField = 'input[class="sc-bcXHqe gXsWdM sc-bcXHqe fLUPzy form-control"]'
  getCheckboxesText = "(//legend[text()='Measure']/following::div[@class='sc-gswNZR egwTGS icheckbox_label-content--cps'])[2]";
  //measure page locators
  verifySelectScorecardsTitle = 'legend[class="sc-bcXHqe eVpZcf"]'
  clickToSelectSpecificElement= '.btn-outline-primary.btn-block.btn-sm'
  verifySelectElementsPopupTitle = '.modal-content div.modal-title.h4'

  navigateAndSelectManageReportElements(scorecard,elementBoxes,elementText) {
    utils.getElement(homePage.leftNavBarElements).eq(4).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown(scorecard);
    addMeasures.loadingElement();
    utils
      .getElement(this.manageReports)
      .should("be.visible")
      .click();
    utils
      .getElement(this.verifyManageReportsTitleAndSubTitle)
      .should("contain", "Manage Reports")
      .should("contain", "Upward Airlines Corporate");
    utils.getElement(elementBoxes).contains(elementText).should('be.visible').click();
  }

    randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

selectMeasureSummaryReportCheckboxes(checkboxName){
    return '(//div[text()="'+checkboxName+'"])[2]/../div[@class="icheckbox_square-green"]'
}

verifyPercentageAccordingToColumnsAdded(){
  var columnLength;
  /*length of the column*/
  utils
  .getElement(this.measureReportColumnsCount)
  .then(($elelength) => {
    columnLength = $elelength.length;
    cy.log(columnLength);
  });
  /*verify the percent based on columns*/
  utils.getElement(this.columnPercentageInputField).invoke('attr','value').should('include', '50%');
}

selectElementsFromMeasurePage(elementName){
  return '//div[text()="'+elementName+'"]/../../div[@class="icheckbox_square-green"]'
}

selectReportNameFromList(manageReportName){
return '//div[contains(@class,"list-item-container")]/div/following::a[text()="'+manageReportName+'"]'
}

}
export const manageMeasureReports = new ManageMeasureReports();
