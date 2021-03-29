// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

const questions = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address (Required)',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your email address!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
      }
    ]);
  };
  
  const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
  
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }
    return inquirer
      .prompt([
        // -- Project Name --
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project? (Required)',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('You need to enter a project name!');
              return false;
            }
          }
        },
        // -- Description --
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('You need to enter a project description!');
              return false;
            }
          }
        },
        // -- Installation Instructions --
        {
          type: 'confirm',
          name: 'confirmInstall',
          message: 'Would you like to add steps required to install your project?',
          default: true
        },
        {
          type: 'input',
          name: 'install',
          message: 'Provide a step-by-step description of how to get the development environment running:',
          when: ({ confirmInstall }) => confirmInstall
        },
        // -- Usage Instructions --
        {
          type: 'confirm',
          name: 'confirmUsage',
          message: 'Would you like to add usage information for your project?',
          default: true
        },
        {
          type: 'input',
          name: 'usage',
          message: 'Provide instructions and examples for using your project:',
          when: ({ confirmUsage }) => confirmUsage
        },
        // -- License --
        {
          type: 'list',
          name: 'license',
          message: 'What did you this project with? (Check all that apply)',
          choices: ['None', 'Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0','Creative Commons Zero v1.0 Universal','Eclipse Public License 2.0','GNU Affero General Public License v3.0','GNU General Public License v2.0','GNU Lesser General Public License v2.1','Mozilla Public License 2.0','The Unlicense']
        },
        // -- Contributing --
        {
          type: 'confirm',
          name: 'confirmContribute',
          message: 'Would you like to add a section for how to contribute?',
          default: true
        },
        {
          type: 'input',
          name: 'contribute',
          message: 'Provide guidelines for how to contribute to your projects:',
          when: ({ confirmContribute }) => confirmContribute
        },
        // -- Tests --
        {
          type: 'confirm',
          name: 'confirmTest',
          message: 'Would you like to add tests written for you project?',
          default: true
        },
        {
          type: 'input',
          name: 'test',
          message: 'Provide examples on how to run the tests:',
          when: ({ confirmTest }) => confirmTest
        },
        // -- Deployed Link --
        {
          type: 'confirm',
          name: 'confirmLink',
          message: 'Would you like to add a link to your deployed project?',
          default: true
        },
        {
          type: 'input',
          name: 'link',
          message: 'Provide the deployed link:',
          when: ({ confirmLink }) => confirmLink
        },
        // -- Additional Project --
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }
      ])
      .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };
  
  questions()
    .then(promptProject)
    .then(portfolioData => {
      const pageHTML = generatePage(portfolioData);
  
      fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);
  
        console.log('Page created! Check out index.html in this directory to see it!');
      });
    });




/*

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
*/