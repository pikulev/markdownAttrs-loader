markdownattrs-loader
===============

markdownattrs-loader for webpack using [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) based on [markdown-it](https://github.com/markdown-it/markdown-it) that allows you to set classes, identifiers and attributes to your markdown.

Add classes, identifiers and attributes to your markdown with `{.class #identifier attr=value attr2="spaced value"}` curly brackets, similar to [pandoc's header attributes](http://pandoc.org/README.html#extension-header_attributes).

## Setup

[![NPM](https://nodei.co/npm/markdownattrs-loader.png)](https://nodei.co/npm/markdownattrs-loader/)

```bash
npm install markdownattrs-loader
```

## Usage 

```javascript
var html = require("html!markdownattrs!./file.md");
```

### Recommended Configuration

Since marked's output is HTML, it's best served in conjunction with the [html-loader](https://github.com/webpack/html-loader). 

```javascript
{
    module: {
        loaders: [
            { test: /\.md$/, loader: "html!markdownattrs" },
        ]
    }
}
```

## Options

[markdown-it](https://github.com/markdown-it/markdown-it)-options are passed via query params:


```javascript
{
    module: {
        loaders: {
            { test: /\.md$/, loader: "html!markdownattrs?html=true" },
        ]
    }
}
```

### Custom config

Simply set the `markdownattrsLoader`-option on your webpack options. You can also change the options' key
with a query parameter: `"markdownattrs?config=markdownattrsLoaderCustomConfig"`.


```javascript
// webpack.config.js

module.exports = {
    ...
    markdownattrsLoaderCustomConfig: {
        html: true,
        ...
    }
};
```

### Options List


```javascript
{
  //markdown-it defaults:
  //------------------------------------------------
  
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
  
  //markdownattrs-loader feature:
  //------------------------------------------------
  //You can set 'use' parameter to set markdown-it plugins
  
  use: []
}
```

### Using markdown-it plugins

#### via query parameter:

```javascript
{
    module: {
        loaders: {
            { test: /\.md$/, loader: "html!markdownattrs?use[]=markdown-it-sup,use[]=markdown-it-sub" },
        ]
    }
}
```

#### or `markdownattrsLoader`-option:

```javascript
// webpack.config.js

var markdownSup = require('markdown-it-sup');
var markdownSub = require('markdown-it-sub');

module.exports = {
    ...
    markdownattrsLoader: {
        use: [markdownSup, markdownSub], // It's always an array
        ...
    }
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
