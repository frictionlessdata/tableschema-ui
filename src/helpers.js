const lodashDebounce = require('lodash/debounce')


// Module API
const debounce = (wait, func) => {
  return lodashDebounce(func, wait)
}



// System

module.exports = {
  debounce,
}
