# posthtml-postcss-treeshaker

A `posthtml` plugin to treeshake class and id styling in `style` tag on html page using `postcss`


[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Build][build]][build-badge]
[![Coverage][cover]][cover-badge]
[![Standard Code Style][style]][style-url]
[![Chat][chat]][chat-badge]

This plugin is used for reducing your file size

Before:

```html
<html>
  <body>
    <p class="used">HELLO</p>
    <style>
      .used {
        color: red;
      }
      .unused {
        color: green;
      }
    </style>
  </body>
</html>
```

After:

```html
<html>
  <body>
    <p class="used">HELLO</p>
    <style>
      .used {
        color: red;
      }
    </style>
  </body>
</html>
```

## Install

> npm i posthtml posthtml-postcss-treeshaker

## Usage

Describe how people can use this plugin. Include info about build systems if it's
necessary.

```js
const fs = require("fs");
const posthtml = require("posthtml");
const posthtmlPlugin = require("posthtml-postcss-treeshaker");

posthtml()
  .use(
    posthtmlPlugin({
      /* options */
    })
  )
  .process(html /*, options */)
  .then(result => fs.writeFileSync("./after.html", result.html));
```

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

### License [MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/posthtml-postcss-treeshaker.svg
[npm-url]: https://npmjs.com/package/posthtml-postcss-treeshaker
[deps]: https://david-dm.org/posthtml/posthtml-postcss-treeshaker.svg
[deps-url]: https://david-dm.org/anikethsaha/posthtml-postcss-treeshaker
[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/
[build]: https://travis-ci.org/posthtml/posthtml-postcss-treeshaker.svg?branch=master
[build-badge]: https://travis-ci.org/posthtml/posthtml?branch=master
[chat]: https://badges.gitter.im/posthtml/posthtml-postcss-treeshaker.svg
[chat-badge]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
