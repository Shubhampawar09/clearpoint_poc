import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";

class AddObjective {
  addObjectiveSubTitle = ".kstTzp >div";
  addObjectiveElementBox = ".gHQGic div h4";
  addObjectiveSliderTitile = ".hcarbR span";
  addOjectiveNameField = "#name";
  alertToAddObjective = "div[role='alert'] > div";
  editObjectiveButton = ".hGgsSS > button";
  objectiveNavLinkOptions = ".gjVKHl > a";

  initialSteps = () => {
    utils.getElement(homePage.cubeElement).eq(2).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Objective Testing");
    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    utils.waitFor(2000);
    utils
      .getElement(manageElements.manageElementTitle)
      .should("be.visible", true);
  };
}
export const addObjective = new AddObjective();
