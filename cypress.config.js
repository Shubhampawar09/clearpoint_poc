const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    embeddedScreenshots: false,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },

    baseUrl: "https://stage.clearpointstrategy.com/#/login",
    chromeWebSecurity: false,
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: 1,
    env: {
      DEFAULT_USER_EMAIL: "cps_prebuilt@ascendantsmg.com",
      DEFAULT_USER_PASSWORD: "abc123",
    },
  },
});
