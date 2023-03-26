/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

class Utils {
  highightWebElement(element, its_type) {
    if (its_type == "xpath") {
      cy.xpath(element, { timeout: 90000 }).then(($ele) => {
        $ele.attr("style", "background: yellow; border: 2px solid red;");
        var millisecondsToWait = 250;
        setTimeout(function () {
          $ele.removeAttr(
            "style",
            "background: yellow; border: 2px solid red;"
          );
        }, millisecondsToWait);

        $ele.css({
          border: "3px solid red",
        });
      });
    } else if (its_type == "css") {
      cy.get(element, { timeout: 90000 }).then(($ele) => {
        $ele.attr("style", "background: yellow; border: 2px solid red;");
        var millisecondsToWait = 200;
        setTimeout(function () {
          $ele.removeAttr(
            "style",
            "background: yellow; border: 2px solid red;"
          );
        }, millisecondsToWait);

        $ele.css({
          border: "3px solid red",
        });
      });
    }
  }

  highLight($ele) {
    $ele.attr("style", "background: yellow; border: 2px solid red;");
    var millisecondsToWait = 250;
    setTimeout(function () {
      $ele.removeAttr("style", "background: yellow; border: 2px solid red;");
    }, millisecondsToWait);

    $ele.css({
      border: "3px solid red",
    });
  }

  /*  accepts type and highlight element
    to click on cypress element
    i.e. xpath or css */
  clickOn(element_xpath_or_css) {
    if (
      element_xpath_or_css.startsWith("/") ||
      element_xpath_or_css.startsWith("(")
    ) {
      this.highightWebElement(element_xpath_or_css, "xpath");
      return this.clickXpath(element_xpath_or_css);
    } else {
      this.highightWebElement(element_xpath_or_css, "css");
      return this.clickCss(element_xpath_or_css);
    }
  }

  /* returns chainable instance of 
    cypress element based on its type
    i.e. xpath or css */
  getElement(xpath_or_css) {
    if (xpath_or_css.startsWith("/") || xpath_or_css.startsWith("(")) {
      this.highightWebElement(xpath_or_css, "xpath");
      return cy.xpath(xpath_or_css, {
        timeout: "90000",
      });
    } else {
      this.highightWebElement(xpath_or_css, "css");
      return cy.get(xpath_or_css, {
        timeout: "90000",
      });
    }
  }

  /**
   * accept the text to handle the alert
   * @param {} text
   */
  handleAlert(text) {
    cy.on("window.alert", (alertText) => {
      expect(alertText).to.contains(text);
      console.log(text);
      return text;
      // return cy.on("window:alert", (text) => {
      //   console.log(text);
    });
  }

  /**
   * generate random numbers
   * @param {*} text
   * @returns
   */
  randomNumber(text) {
    for (var i = 0; i < 10; i++) text += Math.floor(Math.random() * 10);
    return text;
  }

  /**
   * accepts xpath to click on element
   * @param {*} element_xpath
   * @returns
   */

  clickXpath(element_xpath) {
    return cy
      .xpath(element_xpath, {
        timeout: "30000",
      })
      .click({ force: true });
  }

  /**
   * accept the css element to click
   * @param {} element_css
   * @returns
   */
  clickCss(element_css) {
    return cy
      .get(element_css, {
        timeout: "30000",
      })
      .click({ force: true });
  }

  /**
   * accept the element to clear the textfield
   * @param {*} element
   * @returns
   */

  clearTextField(element) {
    if (element.startsWith("/") || element.startsWith("(")) {
      this.highightWebElement(element, "xpath");
      return cy
        .xpath(element, {
          timeout: "3000",
        })
        .clear();
    } else {
      this.highightWebElement(element, "css");
      return cy
        .get(element, {
          timeout: "3000",
        })
        .clear();
    }
  }

  /**
   * accepts the element and keywords to
   * typekeys on textbox
   * @param {*} element
   * @param {*} keywords
   * @returns
   */
  typeKeys(element, keywords) {
    if (element.startsWith("/") || element.startsWith("(")) {
      return cy
        .xpath(element, {
          timeout: "3000",
        })
        .type(keywords);
    } else {
      return cy
        .get(element, {
          timeout: "3000",
        })
        .type(keywords);
    }
  }
  /**
   * accepts the element and keywords
   * to clear and type in textbox
   */

  clearAndType(element, keywords) {
    if (element.startsWith("/") || element.startsWith("(")) {
      this.highightWebElement(element, "xpath");
      this.clearTextField(element);
      return this.typeKeys(element, keywords);
    } else {
      this.highightWebElement(element, "css");
      this.clearTextField(element);
      return this.typeKeys(element, keywords);
    }
  }

  /**
   * accepts the element to scroll till
   * cypress element
   * @param {*} element
   * @returns
   */

  scrollToElement(element) {
    if (element.startsWith("/") || element.startsWith("(")) {
      return cy.xpath(element).scrollIntoView();
    } else {
      return cy.get(element).scrollIntoView();
    }
  }
  /**
   * This method is used to wait for seconds
   * @param {*} waitInSeconds
   */
  waitFor(waitInSeconds) {
    cy.wait(waitInSeconds);
  }

  /**
   * accepts an element and
   * returns an array of texts present inside multiple elements
   */
  getTextOfAllElements(element) {
    var textList = new Array();

    this.getElement(element).each(($ele) => {
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          textList.push(text.trim());
        });
    });

    return textList;
  }

  /**
   * accept the element and return the
   * count of an array
   * @param {*} element
   * @returns
   */

  getElementCount(element) {
    var textList = new Array();

    this.getElement(element).each(($ele) => {
      cy.wrap($ele).then(($ele) => {
        textList.push($ele);
      });
    });

    return textList;
  }

  getTextOfAllElementsSync(element) {
    var textList = new Array();
    this.getElement(element).each(($ele) => {
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          textList.push(text);
        });
    });
    return cy.wrap(textList);
  }

  /**
   * accepts an element and
   * returns texts present inside element
   */
  getText(element) {
    return this.getElement(element).invoke("text");
  }

  /**
   * accepts an element and
   * returns attribute of an element
   */
  getAttribute(element, property) {
    return this.getElement(element).invoke("prop", property);
  }

  upload_video(fileName) {
    cy.fixture(fileName, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type=file]").attachFile({
          fileContent,
          fileName,
          mimeType: "video/mp4",
          encoding: "utf8",
          lastModified: new Date().getTime(),
        });
      });
  }

  /**
   * accepts the element and validate if
   * element is present in dom or not
   * @param {*} xpath_or_css
   * @returns
   */
  validateIfElementExistsInDom(xpath_or_css) {
    if (xpath_or_css.startsWith("/") || xpath_or_css.startsWith("(")) {
      return cy.xpath("count(" + xpath_or_css + ")").then((count) => {
        if (count) {
          var temp = true;
          return cy.wrap(temp);
        } else {
          var temp2 = false;
          return cy.wrap(temp2);
        }
      });
    } else {
      var temp3 = Cypress.$(xpath_or_css).is(":visible");
      return cy.wrap(temp3);
    }
  }

  extractnumber(input) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    var str = input;
    var finalans = str.match(regex).map(function (v) {
      return parseFloat(v);
    });
    console.log(finalans[0]);
    return finalans[0];
  }

  /**
   * This method is used to maintain the cookies
   */
  maintainCookies() {
    afterEach(() => {
      //Code to Handle the Sesssion cookie in cypress.
      //Keep the Session alive when you jump to another test
      let str = [];
      cy.getCookies().then((cook) => {
        cy.log(cook);
        for (let l = 0; l < cook.length; l++) {
          if (cook.length > 0 && l == 0) {
            str[l] = cook[l].name;
            Cypress.Cookies.preserveOnce(str[l]);
          } else if (cook.length > 1 && l > 1) {
            str[l] = cook[l].name;
            Cypress.Cookies.preserveOnce(str[l]);
          }
        }
      });
    });
  }

  /**
   * This method is used to change the
   * viewport of browser
   */
  changeViewport(port1, port2) {
    cy.viewport(port1, port2);
  }

  makeElementAbsolute(Element) {
    return cy
      .get(Element)
      .invoke("css", "position", "absolute")
      .invoke("css", "width", "100%");
  }

  makeElementFixed(Element) {
    return cy
      .get(Element)
      .invoke("css", "position", "fixed")
      .invoke("css", "width", "100%");
  }

  /**
   * This method is used to take the screenshots
   * @param {*} screenshotName
   */
  takeScreenShot(screenshotName) {
    cy.screenshot(
      screenshotName,
      {
        widths: [380, 998, 1200],
      },
      { capture: "fullPage", scale: true }
    );
  }

  /**
   *
   */

  clickOnAnyCheckbox(Checkboxnumber) {
    var checkbox = Math.floor(Math.random() * Checkboxnumber);
    if (checkbox == 0 || checkbox == 1) {
      return cy
        .xpath("(//input[@type='checkbox'])[2]")
        .click()
        .xpath("(//li[@role='option'])[2]")
        .then(($ele) => {
          var playerSelected = $ele.text();
          return playerSelected;
        });
    } else {
      return cy
        .xpath("(//input[@type='checkbox'])[" + checkbox + "]")
        .click()
        .xpath("(//li[@role='option'])[" + checkbox + "]")
        .then(($ele) => {
          var playerSelected = $ele.text();
          return playerSelected;
        });
    }
  
  }
}
export const utils = new Utils();
