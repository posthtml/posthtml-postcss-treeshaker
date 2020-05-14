'use strict'

const plugin = require('../../lib')
const posthtml = require('posthtml')

module.exports = html =>
  posthtml([plugin()])
    .process(html)
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
