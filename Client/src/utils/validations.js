export const checkNamePattern = (errors, key, value) => {
  const pattern = /(^[A-Za-z]*)$/
  if (!pattern.test(value))
    errors[key] = 'Must contain letters only'
}

export const checkLength = (errors, key, value, length) => {
  if (value.length > length)
    errors[key] = 'Must be 20 characters or less'
}

export const checkEmailPattern = (errors, key, value) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    errors[key] = 'Invalid email address'
}

export const checkPasswordLength = (errors, key, value, minLength, maxLength) => {
  if (value.length < minLength || value.length > maxLength)
    errors[key] = `Must be ${minLength} to ${maxLength} characters`
}

export const checkRequired = (errors, values) => {
  for (const [key, value] of Object.entries(values)) {
    if (!value)
      errors[key] = 'Required'
  }
}

export const checkBirthDate = (errors, key, value) => {
  for (const field in value) {
    switch (value[field]) {
      case '':
        errors[key] = 'Required'
        break
      default:
        break
    }
  }

  const date = birthDateCreator(value.yearOfBirth,
    monthNames.indexOf(value.monthOfBirth),
    value.dayOfBirth)

  if (date >= new Date()) {
    errors[key] = 'Invalid date'
  }
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
export const daysInMonth = [...Array(31).keys()]
export const years = [...Array(new Date().getFullYear() - 1900).keys()].reverse()

export const dayOptions = () => {
  return daysInMonth.map(day => <option key={day + 1}>{day + 1}</option>)
}

export const monthNamesOptions = () => {
  return monthNames.map(month => <option key={month}>{month}</option>)
}

export const yearOptions = () => {
  return years.map(year => <option key={year + 1901}>{year + 1901}</option>)
}

export const birthDateCreator = (year, month, day) => {
  return new Date(`${year}-${month + 1}-${day}`)
}