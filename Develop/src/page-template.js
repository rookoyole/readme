// create the about section
const generateAbout = aboutText => {
  if (!aboutText) {
    return '';
  }

  return `
  ##About

  ${aboutText}
  `;
};


module.exports = templateData => {
  // destructure page data by section
  const { about, ...header } = templateData;

  return `
  # ${header.name}

  ## Description

  ${header.description}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)


  ## Questions

  https://github.com/${header.github}
  
  ${header.email}

  ${generateAbout(about)}

  `;
};
