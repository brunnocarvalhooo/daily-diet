function dateChecker(value: string) {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

  const isValid = dateRegex.test(value)

  return isValid
}

function timeChecker(value: string) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

  const isValid = timeRegex.test(value)

  return isValid
}

export { dateChecker, timeChecker }