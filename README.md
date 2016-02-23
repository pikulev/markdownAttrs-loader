markdownAttrs-loader
===============

markdownAttrs-loader for webpack using [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) based on [markdown-it](https://github.com/markdown-it/markdown-it).


## Setup

```bash
npm install markdownAttrs-loader
```

## Usage 

```javascript
var html = require("html!markdownAttrs!./file.md");
```

### Recommended Configuration

Since marked's output is HTML, it's best served in conjunction with the [html-loader](https://github.com/webpack/html-loader). 

```javascript
{
    module: {
        loaders: [
            { test: /\.md$/, loader: "html!markdownAttrs" },
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
            { test: /\.md$/, loader: "html!markdownAttrs?html=true" },
        ]
    }
}
```

### Custom config

Simply set the `markdownAttrsLoader`-option on your webpack options. You can also change the options' key
with a query parameter: `"markdownAttrs?config=markdownAttrsLoaderCustomConfig"`.


```javascript
// webpack.config.js

module.exports = {
    ...
    markdownAttrsLoaderCustomConfig: {
        html: true,
        ...
    }
};
```

### Options List

[markdown-it](https://github.com/markdown-it/markdown-it) defaults:

```javascript
{
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
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
