import { homePage } from "../../support/pageObjects/HomePage";
import { utils } from "../../support/Utilities/Utils";
import { addMeasures } from "../../support/pageObjects/AddMeasures";
import { manageElements } from "../../support/pageObjects/ManageElements";

class CopyData {
  addSeriesToMeasureAndSave = ".hGgsSS > button";
  addSeriesNameField = "#name";
  alertPopup = "div[role='alert'] > div";
  plusButtonToAddSeries =
    "(//div[text()='Show Deleted']//following::button)[1]";
  dataTypeDropdown = ".hztxxA div";
  selectCurrencyFromDataType = ".select__menu-list div";
  saveButtonToAddSeries = "//button[@type='submit']";

  initialSteps = () => {
    utils.getElement(homePage.cubeElement).eq(2).click();
    utils.clickOn(homePage.scorecardDropdown);
    addMeasures.selectElementFromDropdown("Hospital Scorecard");
    utils
      .getElement(homePage.manageElements)
      .should("be.visible", true)
      .click();
    utils.waitFor(2000);
    utils
      .getElement(manageElements.manageElementTitle)
      .should("be.visible", true);
    utils
      .getElement(manageElements.measureElementBox)
      .should("contain", "Measures")
      .click();
  };

  selectFromDropdown(measureText) {
    var element =
      '//div[contains(@class,"drag-drop-list-wrapper")]//a[contains(., "' +
      measureText +
      '")]';
    cy.waitUntil(() =>
      utils
        .scrollToElement(element, { timeout: 2000 })
        .should("be.visible", true)
        .click()
    );
  }

  addSeriesToMeasure() {
    let seriesName = ["USD", "EURO", "Percentage"];
    let currency = ["Default Currency (USD - $)", "Euro (EUR - €)"];
    let dataType = ["Currency", "Currency", "Percentage"];
    for (let i = 0; i < seriesName.length; i++) {
      //click add plus button to add series//
      cy.waitUntil(() =>
        utils.getElement(copydata.plusButtonToAddSeries).click({ force: true })
      );
      //enter series name in name field//
      utils.clearAndType(copydata.addSeriesNameField, seriesName[i]);

      //click dataType dropdown
      cy.waitUntil(() =>
        utils.getElement(copydata.dataTypeDropdown).eq(3).click()
      );
      //select currency from DataType dropdown
      cy.waitUntil(() =>
        utils
          .getElement(copydata.selectCurrencyFromDataType)
          .contains(dataType[i])
          .click()
      );
      //if series name is not percentage
      if ((copydata.addSeriesNameField, seriesName[i] !== "Percentage")) {
        //click currency dropdown
        cy.waitUntil(() =>
          utils
            .getElement("(//label[text()='Currency']//following::div)[1]")
            .click()
        );
        utils.waitFor(3000);
        //select currency from dropdwon
        utils
          .getElement(".select__menu-list div")
          .contains(currency[i])
          .click();
        utils.waitFor(3000);
      }
      //click save button
      cy.waitUntil(() =>
        utils.getElement(copydata.saveButtonToAddSeries).eq(1).click()
      );
      //verify the series added popup
      cy.waitUntil(() =>
        utils.getElement(copydata.alertPopup).contains("Series Added")
      );
      utils.waitFor(3000);
    }
  }

  verifySeriesPresentOrNot(SeriesText) {
    utils.getElement(".hNIDpU a").each(($ele) => {
      cy.wrap($ele).invoke("text");
      if ($ele.text().includes(SeriesText)) {
        cy.log("duplicate series present");
      } else {
        cy.log("duplicate series is not present");
      }
    });
  }

  readDataInMeasureTable(){
    cy.visit('/index');
    

  }
}
export const copydata = new CopyData();
