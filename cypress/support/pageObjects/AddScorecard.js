import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";

class AddScorecard {
  addScorecardElement = ".jYJgOS button";
  manageScorecardElement = ".jpuzKD > a:nth-child(4)";
  addScorecardTitle = ".itzORk > div";
  addScorecardNameField = "#name";
  alertToAddScorecard = "div[role='alert'] > div";
  verifyScorecardDropdown = ".sc-bBABsx div div:first";
  manageReportsForScorecard = "a.dYRBdn:last";
  reportNameField = ".input-group";
  editCategoriesField = ".gjVKHl a";

  initialSteps = () => {
    utils.getElement(homePage.leftNavBarElements).eq(1).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    utils
      .getElement(addScorecard.manageScorecardElement)
      .should("be.visible", true)
      .click();
    utils.waitFor(2000);
    utils
      .getElement(addScorecard.addScorecardTitle)
      .eq(0)
      .should("be.visible", true);
  };
}
export const addScorecard = new AddScorecard();
