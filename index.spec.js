/**
 * Test suite for `handleDuplicates`.
 */

const handleDuplicates = require('./index')

describe('different people, different names, same company', () => {
  let users

  beforeEach(() => {
    users = [
      ['John Doe', 'Doe Industries', 'john.doe.88'],
      ['Alex Doe', 'Doe Industries', 'alex'],
      ['Jane Doe', 'Doe Industries', 'jane'],
      ['Bob Doe', 'Doe Industries', 'bob']
    ]
  })

  it('should return empty labels and users sorted by name', () => {
    expect(handleDuplicates(users)).toEqual([
      ['Alex Doe', ''],
      ['Bob Doe', ''],
      ['Jane Doe', ''],
      ['John Doe', '']
    ])
  })

  it('should do nothing if the users array is empty', () => {
    expect(handleDuplicates([])).toEqual([])
  })

  // This is always the "same company, different name" case.
  it('should only leave the name when there is one user', () => {
    expect(handleDuplicates([users[0]])).toEqual([
      ['John Doe', '']
    ])
  })
})

describe('different people, same names, same company', () => {
  let users

  beforeEach(() => {
    users = [
      ['John Doe', 'Doe Industries', 'john.doe.88'],
      ['John Doe', 'Doe Industries', 'john.doe.1'],
      ['Jane Doe', 'Doe Industries', 'jane'],
      ['Bob Doe', 'Doe Industries', 'bob']
    ]
  })

  it('should use labels for repeated names', () => {
    expect(handleDuplicates(users)).toEqual([
      ['Bob Doe', ''],
      ['Jane Doe', ''],
      ['John Doe', 'john.doe.1'],
      ['John Doe', 'john.doe.88']
    ])
  })
})

describe('same name in different companies', () => {
  let users

  beforeEach(() => {
    users = [
      ['John Doe', 'Doe Industries', 'john.doe.88'],
      ['John Doe', 'Smith Industries', 'john.doe.12'],
      ['Jane Doe', 'Doe Industries', 'jane'],
      ['Bob Doe', 'Doe Industries', 'bob22'],
      ['Bob Doe', 'Doe Industries', 'bob66']
    ]
  })

  it('should add the name of the company to users with the same name', () => {
    expect(handleDuplicates(users)).toEqual([
      ['Bob Doe', 'bob22'],
      ['Bob Doe', 'bob66'],
      ['Jane Doe', ''],
      ['John Doe', 'Doe Industries'],
      ['John Doe', 'Smith Industries']
    ])
  })
})

describe('same name in the same company and in another company', () => {
  let users

  beforeEach(() => {
    users = [
      ['John Doe', 'Doe Industries', 'john.doe.88'],
      ['John Doe', 'Doe Industries', 'john.doe.1'],
      ['John Doe', 'Smith Industries', 'john.doe.12'],
      ['Jane Doe', 'Doe Industries', 'jane'],
      ['Bob Doe', 'Doe Industries', 'bob22'],
      ['Bob Doe', 'Doe Industries', 'bob66']
    ]
  })

  it('should add the name of the company to users with the same name that belong to different companies', () => {
    expect(handleDuplicates(users)).toEqual([
      ['Bob Doe', 'bob22'],
      ['Bob Doe', 'bob66'],
      ['Jane Doe', ''],
      ['John Doe', 'john.doe.1 - Doe Industries'],
      ['John Doe', 'john.doe.12 - Smith Industries'],
      ['John Doe', 'john.doe.88 - Doe Industries']
    ])
  })
})