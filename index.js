function handleDuplicates (rawUsers) {
  // Construct an object keyed by company name. Each entry
  // has object keyed by a name. This let us quickly check
  // if a person belongs to two different companies.
  // Each keyed name has an array. This array contain all
  // users with that name. This let us know if inside a company
  // there are more than 1 person with the same name.

  // We remove any entry that doesn't have a name, company
  // or nickname. This is not a requirement, but it shows we
  // could need to clean up the data before processing it.
  const users = rawUsers.filter(user => {
    const [name, company, nickname] = user
    return name && company && nickname
  })

  // Time complexity and space complexity: O(n) 
  const directory = users.reduce((directory, [name, company, nickname]) => {
    // If a company don't exist in the directory, we add it.
    if (!directory[company]) {
      directory[company] = {}
    }

    // Duplicated names can exist in a company, so we need to store a
    // company's users inside an array. An object wouldn't work because
    // keys aren't unique.
    if (!directory[company][name]) {
      directory[company][name] = []
    }
    
    directory[company][name].push({
      name,
      company,
      nickname,
    })
    return directory
  }, {})


  // Time complexity: O(n)
  const listOfCompanies = Object.keys(directory)

  // We create an object keyed by names. Inside each entry we set a flag
  // depending on wheter the name exists inside the same company or not.
  // We do the same comparison against other companies.
  const nameProps = users.reduce((names, [name, company, nickname]) => {
    if (!names[name]) {
      names[name] = {
        showNickname: false,
        showCompanyName : false
      }
    }

    // Check if there is a user with the same name in another company.
    listOfCompanies.forEach(companyName => {
      const nameFoundInAnotherCompany = company !== companyName && directory[companyName][name]
      // We do this OR operation because we don't want to override something
      // we found in a previous user.
      names[name].showCompanyName = names[name].showCompanyName || nameFoundInAnotherCompany
    })

    // Check if there is a user in the same company with the same name.
    const nameFoundInTheSameCompany = directory[company][name].length > 1
    // We do this OR operation because we don't want to override something
    // we found in a previous user.
    names[name].showNickname = names[name].showNickname || nameFoundInTheSameCompany

    return names
  }, {})

  // We map over all users and label them according to what we found
  // before. 
  // Time complexity: O(n)
  const labeledUsers = users.map(([name, company, nickname]) => {
    const labels = [
      nameProps[name].showNickname ? nickname : '',
      nameProps[name].showCompanyName ? company : ''
    ]
   
    // Remove empty entries and join them by ' - '.
    return [name, labels.filter(l => l).join(' - ')]
  })

  // Sort users. The time complexity depends on the sort algorithm
  // implemented by the JavaScript engine. This part mandates the
  // time complexity of the whole function, because sorting is always
  // bigger than O(n).
  labeledUsers.sort(sortByNameAndLabel)

  return labeledUsers
}

/**
 * Alphabetically sort users by their name and label (in that order).
 * We uppercase strings so that a letter 'a' has the same priority that
 * a letter 'A'.
 * @param {*} userA 
 * @param {*} userB 
 */
function sortByNameAndLabel (userA, userB) {
  const nameA = (userA[0] || '').toUpperCase()
  const labelA = (userA[1] || '').toUpperCase()
  const nameB = (userB[0] || '').toUpperCase()
  const labelB = (userB[1] || '').toUpperCase()
  if (nameA < nameB) {
    return -1
  } else if (nameA === nameB) {
    return labelA < labelB 
      ? -1
      : 1
  } else {
    return 1
  }
}

module.exports = handleDuplicates
