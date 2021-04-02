const generateProjects = projectsArr => {
  return `

  ${projectsArr
  .map(({ install }) => {

  return `
  ## Installation2
  ${install}
  `;
  })
  .join('')}
  `;
};





// create the usage section
const generateUsage = usageText => {
  if (!usageText) {
    return '';
  }
  return `
  ## Installation
  ${usageText}
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


module.exports = templateData => {
  // destructure page data by section
  const { projects, about, ...header } = templateData;

  return `
  # ${header.name}

  ## Description

  ${header.description}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)

  ${generateProjects(projects)}


  ## Questions

  https://github.com/${header.github}
  
  ${header.email}

  ${generateAbout(about)}

  `;
};
