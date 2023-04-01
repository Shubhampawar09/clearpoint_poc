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
  manageReportsForScorecard = "//div[@class='sc-gswNZR jpuzKD']/a";
  reportNameField = ".input-group";
  editCategoriesField = ".gjVKHl a";
  logoNavBarList = ".jYJgOS button";

  initialSteps(NavBarIndex,scorecard){
    utils.getElement(addScorecard.logoNavBarList).eq(NavBarIndex).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown(scorecard);
    addMeasures.loadingElement();
    utils
      .getElement(addScorecard.manageScorecardElement)
      .should("be.visible")
      .click();
    utils.waitFor(3000);
    addMeasures.loadingElement();
    utils
      .getElement(addScorecard.addScorecardTitle)
      .eq(0)
      .should("be.visible", true);
  };

  selectScorecard(ScorecardName){
    return '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +ScorecardName+'")]'
  }

  editScorecard(scrollTillScorecard,ScorecaredName){
    //scroll to the element with the scorecard
    addMeasures.loadingElement();
    var ScorecardElement = addScorecard.selectScorecard(scrollTillScorecard);
    cy.waitUntil(() =>
      utils
        .scrollToElement(ScorecardElement, { timeout: 2000 })
        .should("be.visible")
    );
    utils
      .getElement(
        "(//a[text()='Sample Scorecard 48'])[2]/ancestor::div[@class='sc-cabOPr bnZTyx']/following-sibling::div/button"
      )
      .click();
      utils.waitFor(3000);
    /*clear the name field and edit*/  
    cy.waitUntil(() =>
      utils.getElement(addScorecard.addScorecardNameField).clear()
    );
    utils.waitFor(2000);
    utils.clearAndType(addScorecard.addScorecardNameField, ScorecaredName);
    cy.waitUntil(() => utils.clickOn(addMeasures.saveButton));
  }
}
export const addScorecard = new AddScorecard();
