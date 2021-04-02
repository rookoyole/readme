// TODO: Include packages needed for this application
//const fs = require('fs');
const { writeFile } = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const questions = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'username',
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
    // -- Project Name --
    {
      type: 'input',
      name: 'projname',
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
                          // -- License --
    {
      type: 'list',
      name: 'license',
      message: 'What license would you like to use? (Check all that apply)',
      choices: ['None', 'Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0','Creative Commons Zero v1.0 Universal','Eclipse Public License 2.0','GNU General Public License v2.0', 'Mozilla Public License 2.0','The Unlicense']
    },
                          // -- About --
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: false
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    },
                      // -- Installation Instructions --
    {
      type: 'confirm',
      name: 'confirmInstall',
      message: 'Would you like to add steps required to install your project?',
      default: false
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
      default: false
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples for using your project:',
      when: ({ confirmUsage }) => confirmUsage
    },
                      // -- Contributing --
    {
      type: 'confirm',
      name: 'confirmContribute',
      message: 'Would you like to add a section for how to contribute?',
      default: false
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
      default: false
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
      default: false
    },
    {
      type: 'input',
      name: 'link',
      message: 'Provide the deployed link:',
      when: ({ confirmLink }) => confirmLink
    },
  ]);
};
  
const promptProject = readmeData => {
  console.log(`
  =================
  Add a New Project
  =================
  `);
  
  // If there's no 'projects' array property, create one
  if (!readmeData.projects) {
    readmeData.projects = [];
  }
  return inquirer
  .prompt([

    // -- Additional Project --
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    readmeData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(readmeData);
    } else {
      return readmeData;
    }
  });
};
  
questions()
.then(promptProject)
.then(readmeData => {
  return generatePage(readmeData);
})
.then(pageHTML => {
  return writeFile(pageHTML);
})
.then(writeFileResponse => {
  console.log(writeFileResponse);
})
.catch(err => {
  console.log(err);
});