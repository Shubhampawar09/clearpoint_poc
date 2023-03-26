# ClearPoint

ClearPoint is a management application. Furthermore, it can be used in a variety of domains such as healthcare, banking, education, and so on. Also used for reporting management and data-driven decision making.

The website that is being used is: https://STAGE.clearpointstrategy.com/#/login

## Versions
1. Nodejs: 18.12.1
2. Cypress: 12.3.0

## Pre-requisites 

[Install Visual Studio](https://code.visualstudio.com/download#)

[Install github](https://git-scm.com/downloads)

[Install Node js](https://nodejs.org/en/download/)

## Folder Structure
1. cypress/e2e - To store all spec files in which UI tests are written.
2. cypress/fixtures - To store test data files such as json.
3. cypress/reports - To store mocha awesome reports.
4. cypress/screenshots - To store screenshots of failed tests.
5. cypress/support/pageObjects - To store all page objects classes in which locators are stored.
6. cypress/support/Utilities - To store utility classes to resuse methods and functions.
7. cypress/support/command - To store resusable method such as Login.
8. cypress/support/e2e - To store global configurations which is used in framework.
9. cypress/videos - To store test execution videos.

## Running Tests

You can find commands to run in package.json folder
Note: Reports of Spec file which are executed using cypress runner will not available in reports folder.
1. To open cypress test runner, use below command
```bash
  npm run test
```

2. To run all spec files in headed mode and to generate report, use below command
```bash
  npm run regression-headed

```
3.To run all spec files in headless mode with the baseUrl and to generate report, use below command
```bash
   npx cypress run --config baseUrl=https://STAGE.clearpointstrategy.com/#/login    
```

4. You can always find html report in cypress/reports folder. Open index.html in any browser to see the report.


## Cypress folder directory

```bash
|--CYPRESS-POC
|    |--.github
|       |--buildspec.yaml
|    
|    |--cypress
|        |--downloads
|        
|        |--e2e
|             |--homepage-tests.cy.js
|             |--login-tests.cy.js
              |--addmilestone-tests.cy.js
              |--addmeasures-tests.cy.js
              |--addobjective-tests.cy.js
              |--addscorecard-tests.cy.js
              |--addseries-tests.cy.js
|        
|        |-fixtures
|             |--example.json
|        
|        |-reports
|          |--html
|             |--index.html
|        
|        |--screenshots
|             |--image.png
|        
|        |--support
|          |--pageObjects
|             |--HomePage.js
|             |--LoginPage.js
              |--AddMeasures.js
              |--AddObjective.js
              |--AddScorecard.js
              |--AddMilestone.js
              |--AddSeries.js
|          |--Utilities
|             |--Utils.js
|
|        |--videos
|             |--homepage.mp4
|             |--loginpage.mp4
|
|--.dockerIgnore
|--cypress.config.js
|--dockerfile
|--package-lock.json
|--package.json
|--ReadMe.md


## Run Locally

Open visual studio & clone the project

```bash
  git clone https://github.com/TestrigTechnologies/ClearPoint-POC.git
```

Open terminal in visual studio


Install dependencies

```bash
  npm install
```

Run command

```bash
  npm run test
```

