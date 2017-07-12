# Automated Test Cases

### Prerequisites

1. Instal Node.js from https://nodejs.org/en/ , you can check version using command 'node -v'
2. Instal NPM from https://www.npmjs.com/ , you can check existence or version using command 'npm -v'

### Protractor Setup Instruction

Use npm to install Protractor globally with: 'npm install -g protractor'

This will install two command line tools, protractor and webdriver-manager. Try running `protractor --version` to make sure it's working.
The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with: `webdriver-manager update`


### Running the tests

1. Open up a new command prompt. Now start up a server with: 'webdriver-manager start'
2. Download Javascripts from GIT repository and save it. All scripts must be kept in same folder.
3. Open up another command prompt and CD to where the conf.js file is on the machine.
4. Run the tests with: 'protractor conf.js'

