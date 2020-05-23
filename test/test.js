'use strict'

const plugin = require('..')
const posthtml = require('posthtml')

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
    input: `<h1 id="hello"></h1><style> #hello{color: red} .hello{color: red}</style>`,
    output: `<h1 id="hello"></h1><style> #hello{color: red}</style>`
  },
  {
    input: `<h1 class="hello"></h1><style> #hello{color: red} .hello{color: red}</style>`,
    output: `<h1 class="hello"></h1><style> .hello{color: red}</style>`
  },
  {
    input: `<h1 ></h1><style> #hello{color: red} .hello{color: red}</style>`,
    output: `<h1></h1><style></style>`
  },
  {
    input: `<h1 id="hello"></h1><style> #hello, .hello{color: red}</style>`,
    output: `<h1 id="hello"></h1><style> #hello, .hello{color: red}</style>`
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
