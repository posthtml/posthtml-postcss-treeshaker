'use strict'

const plugin = require('..')
// const { readFileSync } = require('fs')
// const path = require('path')
const posthtml = require('posthtml')
// const fixtures = path.join(__dirname, 'fixtures')

// function snapshotCompare(name) {
//   const html = readFileSync(path.join(fixtures, `${name}.html`), "utf8");

//   return posthtml([plugin()])
//     .process(html)
//     .then(res => expect(res).toMatchSnapshot(name));
// }

const testCases = [
  {
    input: '<img />',
    output: '<img>'
  },
  {
    input: `<h1>hellow</h1><styles></styles>`,
    output: `<h1>hellow</h1><styles></styles>`
  },
  {
    input: `<h1 id="hello"></h1>`,
    output: `<h1 id="hello"></h1>`
  },
  {
    input: `<h1 id="hello"></h1><styles> h1{color: red}</styles>`,
    output: `<h1 id="hello"></h1><styles> h1{color: red}</styles>`
  },
  {
    input: `<h1 id="hello"></h1><styles> #hello{color: red}</styles>`,
    output: `<h1 id="hello"></h1><styles> #hello{color: red}</styles>`
  },
  {
    input: `<h1 id="hello"></h1><styles> #hello{color: red}; .hello{color: red}</styles>`,
    output: `<h1 id="hello"></h1><styles> #hello{color: red}; .hello{color: red}</styles>`
  }
]

describe('small tests', () => {
  testCases.forEach(tc => {
    it(tc.input, async done => {
      const res = await posthtml([plugin()]).process(tc.input)

      expect(res.html).toBe(tc.output)
      done()
    })
  })
})
