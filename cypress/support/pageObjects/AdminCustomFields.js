import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";

class AdminCustomFields {
  settingNavBarIcon = ".jYJgOS button";
  systemSetupOption = ".gkuRqy div a";
  verifySetupTitle = ".sc-gswNZR.fidMSc";
  customFieldOption =
    "//div[@class='sc-gswNZR guAv']/following::div[text()='Custom Fields']";
  selectObjectiveOption = ".gjVKHl a";
  addCustomFieldButton = ".input-group-append button svg";
  verifyCustomNameFieldError = ".hzKYCo.form-group div";
  customFieldNameBox = "#name";
  verifyFieldIsToLongErrorMeassge =".sc-gswNZR.hjwsSB";  
  verifyGlobalCustomFieldInList = ".custom-field-list-item-container-objective div.bnZTyx";
  manageElement =".jZySzZ div.sc-gswNZR.gHQGic";


  CustomFieldsInitialSteps() {
    utils.getElement(customFields.settingNavBarIcon).eq(7).click();
    /*select system setup*/
    utils
      .getElement(customFields.systemSetupOption)
      .contains("System Setup")
      .click();
    /*verify system setup title */
    utils
      .getElement(customFields.verifySetupTitle)
      .should("have.text", "System Setup")
      .should("be.visible", true);
    /*select custom field option*/
    utils.getElement(customFields.customFieldOption).click();
    /*select objective form list*/
    utils.getElement(customFields.selectObjectiveOption).eq(1).click();
    /*add custom field plus button*/
    cy.waitUntil(() =>
      utils.getElement(customFields.addCustomFieldButton).eq(1).click()
    );
    /*verify the custom name error message */
    utils
      .getElement(customFields.verifyCustomNameFieldError)
      .should("have.text", "This field is required");
  }

  selectObjectiveFromList(){
    var Objectivename = "Sampl Objective";
    return '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +
      Objectivename +
      '")]';
  }
}
export const customFields = new AdminCustomFields();
