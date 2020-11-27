const toPascal = (str = '') => {
  const upper = str[0].toLocaleUpperCase()
  return upper + str.slice(1, str.length)
}

module.exports = {
  toPascal,
}
