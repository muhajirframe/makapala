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
      accessToken: '31ed3f66a4affc3babfc5d4b03afc7fc46c6c0de5ac946ae6b826fafe37db9a1',
      spaceId: 'kc5ey34xvgd4',
      contentTypes: [
        {
          name: 'anggota',
          id: 'anggota'
        },
        {
          name: 'prestasi',
          id: 'prestasi'
        },
        {
          name: 'events',
          id: 'events'
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
