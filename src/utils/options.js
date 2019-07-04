const { options } = require('../config')

/**
 * 
 * @param {import('../types').Options} opt 
 * @returns {import('../types').Options}
 */
function mergeOpt(opt) {
  return {
    ...options,
    ...opt
  }
}

module.exports = {
  mergeOpt
}