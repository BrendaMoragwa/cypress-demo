# cypress-demo
Project to do automation testing

### Project Requires
1. Node Js
2. Cypress 10
3. Mochawesome
4. Cypress image snapshot

### Project Execution Steps
1. Clone this repository
2. cd cypress-demo
3. Run ``` npm install ``` to download the project's dependencies listed in the package.json.
4. Run ``` npx cypress ``` open command to open the test runner or npx cypress run command run to run tests.
5. Run ``` npx cypress run  --reporter mochawesome --spec cypress\e2e\spec.cy.js ``` to generate report for the tests.
