import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";

class AdminCustomFields{

CustomFieldsInitialSteps(){

    utils.getElement(".jYJgOS button").eq(7).click();
    /*select system setup*/
    utils.getElement(".gkuRqy div a").contains("System Setup").click();
    /*verify system setup title */
    utils
      .getElement(".sc-gswNZR.fidMSc")
      .should("have.text", "System Setup")
      .should("be.visible", true);
    /*select custom field option*/
    utils
      .getElement(
        "//div[@class='sc-gswNZR guAv']/following::div[text()='Custom Fields']"
      )
      .click();
    /*select objective form list*/
     utils.getElement(".gjVKHl a").eq(1).click();    
    /*add custom field plus button*/
    cy.waitUntil(()=>utils.getElement(".input-group-append button svg").eq(1).click());
    /*verify the custom name error message */
    utils
      .getElement(".hzKYCo.form-group div")
      .should("have.text", "This field is required");

}    


}
export const customFields = new AdminCustomFields();