const { defineConfig } = require("cypress");
const {addMatchImageSnapshotPlugin} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    screenshotOnRunFailure: true,
    videoCompression: 15
  },
  e2e: {
    baseUrl: 'https://app.storyblok.com',
    //experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 30000,
    viewportHeight: 625,
    viewportWidth: 1115,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env:{
    userName: 'brendaondieki17@gmail.com',
    password: 'Test@123'
  }
});
