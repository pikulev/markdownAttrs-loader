"use strict";

var md = require('markdown-it');
var markdownItAttrs = require('markdown-it-attrs');
var loaderUtils = require("loader-utils");
var assign = require("object-assign");

var presetUse = markdownItAttrs;
var defaultOptions = {};


function mergePlugins(array1, array2) {
  var array = array1.concat(array2);
  array.push(presetUse);

  for (var i = 0; i < array.length; ++i) {
    for (var j = i + 1; j < array.length; ++j) {
      if (array[i] === array[j])
        array.splice(j--, 1);
    }
  }

  return array;
}


function getPluginsFromQuery(query) {
  var pluginsFromQuery = [];

  if (query) {
    query.forEach(function(str) {
      try {
        pluginsFromQuery.push(require(str));
      } catch (e) {
        console.error(e);
      }
    });
  }

  return pluginsFromQuery;
}


module.exports = function(src) {
  this.cacheable();

  var query = loaderUtils.parseQuery(this.query);
  var configKey = query.config || "markdownattrsLoader";
  delete query.config;

  var options = Object.create(this.options[configKey] || null);

  var plugins = mergePlugins(options.use || [], getPluginsFromQuery(query.use));
  delete query.use;
  delete options.use;

  options = assign({}, defaultOptions, query, options);

  var configuredMd = md('default', options);
  if (plugins) {
    plugins.forEach(function(plugin) {
      configuredMd.use(plugin);
    });
  }

  return configuredMd.render(src);
};
