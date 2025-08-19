_just: title: Advanced usage
# Advanced usage
### Markdown files
You can specify the page title by adding `_just: title: ...` in the first line of the Markdown file.
-# Example:
```md
_just: title: This is text will be page title
```

You can also specify the previous and next pages:
```
_just: prev: /path/to/previous/page
_just: next: /path/to/next/page
```
> The path to the page should start with a slash (/). <br>This path is a relative path from the root directory of your website, which you’ve specified in the workflow file. <br>The path to the page should not end with a file extension name (e.g., `.md` ).
This will add buttons to the end of the page.
Just an Ultimate Site Tool will automatically get the title of the previous and/or next pages and insert it into the generated button output.
The output should look like this:
![Output](/img/generator-adv-prevnext.png)

### The `just.config.js` file
You can change search key: (slash (/) by default)
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    searchKey: '/'
  }
}
```

You can allow web archive: (disallowed ( `true` ) by default)
-# `just.config.js`:
```js
module.exports = {
  // ...
  noWebarchive: false
}
```

You can insert custom HTML code in `<head>`:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    insertInHTMLHead: '<!--   Your HTML code here   /-->'
  }
}
```

_just: prev: /docs/generator/syntax
_just: next: /docs/generator/troubleshooting