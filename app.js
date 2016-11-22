const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')
const Contentful = require('spike-contentful')
const locals = {}
module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  plugins: [
    new Contentful({
      addDataTo: locals,
      accessToken: 'ac6738d5e3094d43039fb8c0852337c1e3056a64da77b7289ff5726f79b978e5',
      spaceId: 'sdvyt1mxlnpv',
      contentTypes: [
        {
          name: 'post',
          id: 'post'
        },
        {
          name: 'anggota',
          id: 'anggota'
        },
        {
          name: 'prestasi',
          id: 'prestasi'
        }
      ]
    })
  ],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx), data : locals }
    })
  },
  postcss: (ctx) => {
    const css = cssStandards({ webpack: ctx})
    css.plugins.push(require('lost'))
    return css
  },
  babel: { presets: [jsStandards] },
}
