const { defineConfig } = require('cypress');

module.exports = defineConfig({ 
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: 'http://localhost:8080',
    viewportWidth: 1920,
    viewportHeight: 1080
  },
});
