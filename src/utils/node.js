const t = require('@babel/types')

/** 
 * @typedef {import('../types').Node} Node 
 * @typedef {import('../types').JSXElement} JSXElement
 * @typedef {import('../types').JSXFragment} JSXFragment
 * @typedef {import('../types').StringLiteral} StringLiteral 
 * @typedef {import('../types').JSXExpressionContainer} JSXExpressionContainer
 */

/**
 * @param {import('../types').JSXAttribute} attr
 * @param {string} name
 * @returns {boolean}
 */
function isJSXAttribute(attr, name) {
  return t.isJSXIdentifier(attr.name, { name })
}

/**
 * Find jsxAttribute by anme
 *
 * @param {JSXElement} node
 * @param {string} name
 * @returns {import('../types').AttributeValue}
 */
function findAttr(node, name) {
  const attr = node.openingElement.attributes.find(a => isJSXAttribute(a, name))
  return attr && attr.value
}

/**
 * @param {JSXElement} node
 * @param {Array<string>} attrKeys
 */
function removeAttr(node, ...attrKeys) {
  node.openingElement.attributes = node.openingElement.attributes.filter(
    attr => attrKeys.every(key => !isJSXAttribute(attr, key))
  )
}

/**
 * @param {import('../types').AttributeValue} func
 */
function arg(func) {
  return func && func.expression && func.expression.params || []
}

/**
 * @param {import('../types').AttributeValue} func
 * @returns {[import('../types').Statement]}
 */
function originStatement(func){
  if(!func){
    return []
  }
  const exp = func.expression
  if (t.isArrowFunctionExpression(exp)) {
    if(t.isBlockStatement(exp.body)){
      return exp.body.body
    }
    return [t.expressionStatement(exp.body)]
  }
  return [
    t.expressionStatement(
      t.callExpression(
        exp,
        []
      )
    )
  ]
}

module.exports = {
  findAttr,
  removeAttr,
  originStatement,
  arg
}