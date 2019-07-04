const { findAttr, removeAttr, originStatement, arg } = require('./utils/node')
const { mergeOpt } = require('./utils/options')

/**
 * @param {{types: import('./types')}} babel
 * @param {import('./types').Options} options
 * @returns {import('./types').PluginType}
 */
module.exports = ({ types: t }, options) => ({
  visitor: {
    JSXElement({ node }) {
      const opt = mergeOpt(options)
      console.log('babel-plugin-xxx, options: ', opt)
    }
  }
})