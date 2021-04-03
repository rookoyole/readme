const generateProjects = projectsArr => {
  if (!projectsArr) {
    return '';
  }
  return `
  ## Installation2
  ${projectsArr}
  `;
};


// create the installaton section
const generateInstall = installText => {
  if (!installText) {
    return '';
  }
  return `

  ## Installation

  ${installText}
  `;
};

// create the usage section
const generateUsage = usageText => {
  if (!usageText) {
    return '';
  }
  return `

  ## Usage

  ${usageText}
  `;
};

// create the contributing section
const generateCont = contText => {
  if (!contText) {
    return '';
  }
  return `

  ## Contributing

  ${contText}
  `;
};

// create the testing section
const generateTest = testText => {
  if (!testText) {
    return '';
  }
  return `

  ## Tests

  ${testText}
  `;
};

// create the link section
const generateLink = linkText => {
  if (!linkText) {
    return '';
  }
  return `

  ## Links

  ${linkText}
  `;
};

// create the about section
const generateAbout = aboutText => {
  if (!aboutText) {
    return '';
  }
  return `

  ## About

  ${aboutText}
  `;
};

// create the about section
const generateLicense = licenseText => {
  if (licenseText === 'None') {
    return '';
  } else if (licenseText === 'Apache License 2.0') {
    return `
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
    `;
  } else if (licenseText === 'GNU General Public License v3.0') {
    return `
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
    `;
  } else if (licenseText === 'MIT License') {
    return `
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
    `;
  } else if (licenseText === 'BSD 2-Clause "Simplified" License') {
    return `
  [![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)
    `;
  } else if (licenseText === 'BSD 3-Clause "New" or "Revised" License') {
    return `
  [![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
    `;
  } else if (licenseText === 'Boost Software License 1.0') {
    return `
  [![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)
    `;
  } else if (licenseText === 'Creative Commons Zero v1.0 Universal') {
    return `
  [![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
    `;
  } else if (licenseText === 'Eclipse Public License 2.0') {
    return `
  [![License](https://img.shields.io/badge/License-EPL%202.0-red.svg)](https://opensource.org/licenses/EPL-2.0)
    `;
  } else if (licenseText === 'GNU General Public License v2.0') {
    return `
  [![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
    `;
  } else if (licenseText === 'Mozilla Public License 2.0') {
    return `
  [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
    `;
  } else if (licenseText === 'The Unlicense') {
    return `
  [![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
    `;
  }
};


module.exports = templateData => {
  // destructure page data by section
  const { projects, username, projname, description, install, usage, contribute, test, link, license, about, ...header } = templateData;
  return `
  
  ${generateLicense(license)}

  # ${projname}

  ## Description

  ${description}

  ## Table of Contents 

  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Test](#test)
  * [Links](#links)
  * [License](#license)
  * [Questions](#questions)
  * [About](#about)
  ${generateInstall(install)}
  ${generateUsage(usage)}
  ${generateCont(contribute)}
  ${generateTest(test)}
  ${generateLink(link)}
  ## License

  ${license}

  ## Questions
  
  ${username}

  https://github.com/${header.github}

  ${header.email}

  ${generateAbout(about)}
  `;
};
