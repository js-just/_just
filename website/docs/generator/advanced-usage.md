_just: title: Advanced usage
# Advanced usage
## Markdown files
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

## The `just.config.js` file
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

You can enable debug logs:
-# `just.config.js`:
```js
module.exports = {
  // ...
  debug: true
}
```

## Custom HTML, CSS, JavaScript files
### Theme
Just an Ultimate Site Tool saves some data in `localStorage`. Please do not modify any variable with key that starts with `sp`, as these variables store scroll information in BASE-64.
You can use the `t` (theme) variable to synchronize the theme between your custom pages and the generated documentation pages.
```js
localStorage.getItem('t');
```
You can set the `t` variable to update the theme, but the value must be one of: `l` (light), `d` (dark), `a` (auto / sync with device).
```js
localStorage.setItem('t', 'a');
```

### Search
You can make custom documentation search in your custom pages:
1. Fetch `/_just/` or `/_just/index.json`, it’ll return a JSON that has a `"json"` key.
2. Fetch `/_just/( put the "json" value here ).json`, this will return a JSON, where the key is the page URL and the value is the content of the page.
-# Example:
```js
const _just_data = await fetch('/_just/').then(r=>r.json());
const docssearch = await fetch(`/_just/${_just_data.json}.json`).then(r=>r.json());
```

_just: prev: /docs/generator/syntax
_just: next: /docs/generator/troubleshooting