import { homePage } from "../../support/pageObjects/HomePage";
import { loginPage } from "../../support/pageObjects/LoginPage";
import { utils } from "../../support/Utilities/Utils";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

beforeEach(() => {
  
  cy.visit("/login");
  //by default home page should be visible
  cy.url().should("include", "/login");
});

describe("Validate elements on login page", () => {
  it("Verify Page Title-Postive", () =>{
    // Assert page title- positive
    cy.title();
    cy.title().should("be.eq", "ClearPoint Strategy");
  });

  // Assert heading
  it("Verify login form heading", () => {
    utils
      .getElement(loginPage.PageTitle)
      .contains("Welcome to ClearPoint Strategy");
  });

  // Assert Email Field is visible and placeholder
  it("Verify email address field is visible", () => {
    utils.getElement(loginPage.emailAddressField).should("be.visible");
  });

  // Assert Email Field is visible and placeholder
  it("Verify password field is visible", () => {
    utils.getElement(loginPage.passwordField).should("be.visible");
  });

  // Assert label of Login Button
  it("Verify log in button is visible and it's label", () => {
    utils
      .getElement(loginPage.loginButton)
      .should("be.visible", "contain", "Log in");
  });
});

describe("Verify error messages", () => {
  it("Verify error message if user leaves Email field blank and click on sign in", () => {
    utils.clearTextField(loginPage.emailAddressField);
    utils.clearTextField(loginPage.passwordField);
    utils.clickOn(loginPage.loginButton);
    utils
      .getElement(loginPage.emailAlertMessage)
      .should("contain", "This field is required");
  });

  it("Verify error message if user enters Email but leaves Password field blank and click on sign in", () => {
    utils.clearAndType(
      loginPage.emailAddressField,
      "cps_prebuilt@ascendantsmg.com"
    );
    utils.clearTextField(loginPage.passwordField);

    utils.clickOn(loginPage.loginButton);
    utils
      .getElement(loginPage.passwordAlertMessage)
      .should("contain", "Please enter a valid password");
  });

  it("Please enter the email field", () => {
    utils.clearTextField(loginPage.emailAddressField);
    utils.clearAndType(loginPage.passwordField, "Test@123");

    utils.clickOn(loginPage.loginButton);
    utils
      .getElement(loginPage.emailAlertMessage)
      .should("contain", "This field is required");
  });

     it.skip("Verify account blocked alert with valid email and invalid password", () => {
       utils.clearAndType(loginPage.emailAddressField, "cps_prebuilt@ascendantsmg.com");
       utils.clearAndType(loginPage.passwordField, "Test@123");

       utils.clickOn(loginPage.loginButton);
       utils
         .getElement(loginPage.alertMessage).should('be.visible');
         cy.contains("Your user account is locked. Please reset your password below or contact support@clearpointstrategy.com.");
     });
   });

  it.skip("Verify error validating alert with valid email and invalid password", () => {

    utils.clearAndType(loginPage.emailAddressField, email);
    utils.clearAndType(loginPage.passwordField, 'Test@123');

    utils.clickOn(loginPage.loginButton);
    utils.getElement(loginPage.alertMessage).should('be.visible');
    cy.contains("Error validating your username or password. You have 5 more attempt(s) before your account is locked.");

  })

  describe("Verify Login", () => {
    it("Verify login with valid email and password", () => {
      cy.login(email, password);
      cy.url().should("include", "/index");
      utils
        .getElement(homePage.loggedInUser)
        .should("contain", "Pre-built testing account");
    });
});
