class ManageElements {
  //locators
  manageElementTitle = ".hVjXlY  >div >div:first";
  listOfElements = "//div[@class='sc-gswNZR jZySzZ']/*";
  measureElementBox = ".gHQGic:nth-child(2) >div>div:first";
  objectivesElementBox = ".gHQGic:nth-child(1) >div>div:first";
  PlusButtonToAdd = ".hGgsSS >button";

  //methods
  selectMeasure(text) {
    var element = '.sc-jcMfQk:contains("' + text + '")';
    return cy.get(element);
  }
}
export const manageElements = new ManageElements();
