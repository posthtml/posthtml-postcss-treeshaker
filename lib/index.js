"use strict";

const postcss = require("postcss");
const parser = require("postcss-selector-parser");

function getParsed(selectors, callback) {
  return parser(callback).processSync(selectors);
}

let usedClasses = new Set();
let usedIds = new Set();

function createDataStore(tree) {
  tree.walk(node => {
    if (node.tag && node.attrs) {
      if (node.attrs.id && !usedIds.has(node.attrs.id)) {
        usedIds.add(node.attrs.id);
      }

      if (node.attrs.class && !usedClasses.has(node.attrs.class)) {
        usedClasses.add(node.attrs.class);
      }
    }
    return node;
  });
  return tree;
}

const postcssPlugin = postcss.plugin("treeshaker", (opts = {}) => {
  return (root, result) => {
    // Transform CSS AST here
    root.walkRules(rule => {
      const { selector, selectors } = rule;
      getParsed(selector, nodes => {
        nodes.walkClasses(node => {
          const { _value } = node;
          if (!usedClasses.has(_value)) {
            if (selectors.length === 1) {
              // safe to delete the whole rule declaration
              rule.remove();
            }
            if (selectors.length > 1) {
              // just remove this selector
            }
          }
        });
      });
      //
    });
  };
});

module.exports = function() {
  usedClasses.clear();
  usedIds.clear();
  return function treeshaker(tree) {
    tree = createDataStore(tree);
    tree.walk(async node => {
      if (node.tag === "styles" && node.content) {
        const res = await postcss([postcssPlugin]).process(node.content, {
          from: null
        });

        node.content = res.toString();
      }

      return node;
    });

    return tree;
  };
};
