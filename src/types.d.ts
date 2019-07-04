import T from '@babel/types'

export type Visitor = {
  [index: string]: function({node: T.Node}): any
  JSXElement: function({node: T.JSXElement}): any
}

export type PluginType = {
  visitor: Visitor
}

export type AttributeValue = T.JSXElement | T.JSXFragment | T.StringLiteral | T.JSXExpressionContainer | null

export type Options = {
  opt1: string
}

export = T