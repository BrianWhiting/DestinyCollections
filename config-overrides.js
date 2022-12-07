/* eslint-disable @typescript-eslint/no-var-requires */

const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin(['@babel/plugin-transform-typescript', { isTSX: true, optimizeConstEnums: true }]),
);