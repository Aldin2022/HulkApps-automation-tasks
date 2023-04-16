const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa-practical-test.myshopify.com/',
    setupNodeEvents(on, config) {
      require('cypress-high-resolution')(on, config)
      // implement node event listeners here
    },
  },
  videoCompression: false,
  trashAssetsBeforeRuns: false,
});
