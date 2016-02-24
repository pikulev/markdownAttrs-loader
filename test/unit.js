var cheerio = require('cheerio');
var subscript = require('markdown-it-sub');
var superscript = require('markdown-it-sup');
var loader = require('../index.js');

var source = '# Header';
var sourceWithLink = 'My GitHub: https://github.com/pikulev';
var sourceWithPlugins = 'Sub H~2~O / Sup ^13^C';

var mock = function (options, query, configKey) {
  var result = {
    cacheable: function () {},
    options: {},
    query: ''
  };

  if (options) {
    result.options[configKey || 'markdownattrsLoader'] = options;
  }

  if(query) {
    result.query = query;
  }

  return result;
};

module.exports.test = {

  'parses source as markdown': function (test) {
    var context = mock();
    var $ = cheerio.load(loader.call(context, source));
    test.equal($('h1').text(), 'Header');
    test.done();
  },

  'parses source with options': function (test) {
    var context = mock({linkify: true});
    var $ = cheerio.load(loader.call(context, sourceWithLink));
    test.equal($('a').text(), 'https://github.com/pikulev');
    test.done();
  },

  'parses source with query': function (test) {
    var context = mock({}, '?linkify=true');
    var $ = cheerio.load(loader.call(context, sourceWithLink));
    test.equal($('a').text(), 'https://github.com/pikulev');
    test.done();
  },

  'parses source with custom config key': function (test) {
    var context = mock({linkify: true}, '?config=markdown', 'markdown');
    var $ = cheerio.load(loader.call(context, sourceWithLink));
    test.equal($('a').text(), 'https://github.com/pikulev');
    test.done();
  },

  'parses source with plugins via options': function (test) {
    var context = mock({use: [subscript, superscript]});
    var $ = cheerio.load(loader.call(context, sourceWithPlugins));
    test.equal($('sub').length, 1);
    test.equal($('sup').length, 1);
    test.done();
  },

  'parses source with plugins via query parameters': function (test) {
    var context = mock({}, '?use[]=markdown-it-sub,use[]=markdown-it-sup');
    var $ = cheerio.load(loader.call(context, sourceWithPlugins));
    test.equal($('sub').length, 1);
    test.equal($('sup').length, 1);
    test.done();
  },

  'parses source with plugins via query parameters and options': function (test) {
    var context = mock({use: [superscript]}, '?use[]=markdown-it-sub');
    var $ = cheerio.load(loader.call(context, sourceWithPlugins));
    test.equal($('sub').length, 1);
    test.equal($('sup').length, 1);
    test.done();
  }

};
