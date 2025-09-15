_just: title: Configurating
# `just.config.js`
`just.config.js` is a configuration file for the $${name}$$. This is JavaScript file that should export the configuration as Object that will be parsed to a JSON file by $${name}$$. When running, $${name}$$ always tries to resolve the config file named `just.config.js` in the repository root.
The most basic configuration file would look like this:
```js
module.exports = {
  // ...
}
```
-# Note that $${name}$$ does not support `export default`.
> [!NOTE] You don't need a `package.json` file or its `type` option.

## Preprocessing
$${name}$$ supports preprocessing by compilers:
- TypeScript compiler
- Dart Sass

> [!WARNING] Third-party compilers may not be as fast, so they can slow down the process significantly.

To use any of these compilers, add `compile`:
-# `just.config.js`
```js
module.exports = {
  // ...
  compile: {
    // ... ( extension : true )
  }
}
```

<details>
    <summary>Example</summary>
-# `just.config.js`
```js
module.exports = {
  // ...
  compile: {
    ts: true, // TypeScript compiler
    sass: true, // Dart Sass
    scss: true // Dart Sass
  }
}
```
</details><br>

> [!IMPORTANT] But then, before running $${name}$$, make sure you have installed the compilers that you are going to use. You can also install those compilers through $${name}$$ when running it:

### Installing third-party dependencies
To install any of the supported compilers listed above, add `install`:
-# `just.config.js`
```js
module.exports = {
  // ...
  install: {
    // ... ( lowercased name with spaces replaced with underscores : true )
  }
}
```

<details>
    <summary>Example</summary>
-# `just.config.js`
```js
module.exports = {
  // ...
  install: {
    typescript_compiler: true,
    dart_sass: true
  }
}
```
</details><br>

-# The positions of `compile` and `install` in the config file do not matter.

## Postprocessing
$${name}$$ provides some postprocessing options:
- Sitemap generator
- Inserter

These are included in $${name}$$ and are not third-parties nor need to be installed separately from $${name}$$.

### Sitemap generator
It generates a `sitemap.xml` file.
-# `just.config.js`
```js
module.exports = {
  // ...
  sitemap: {
    generateSitemap: true,
    protocol: 'https:', // or 'http:'. Required.
    // ...
  }
}
```
You can specify input and output directories, as well as modify output URLs:
-# `just.config.js`
```js
module.exports = {
  // ...
  sitemap: {
    // ...
    base: 'path/to/website', // Input dir. GitHub Action path input from your workflow file or '.' by default.
    output: 'path/to/website/output', // Output dir. Input dir by default.
    path: 'example/path/', // Modifies output URLs. This example will add "example/path" to the output URLs right after the host name ("https://example.com/example/path/file.html"). GitHub Action fix-path input from your workflow file by default.
    unpath: 'example_prefix' // Modifies output URLs. This example will remove "example_prefix" from the file path ("https://example.com/example_prefix_file.html" -> "https://example.com/_file.html").
  }
}
```
You can also specify pages that should not be included in the sitemap:
-# `just.config.js`
```js
module.exports = {
  // ...
  sitemap: {
    // ...
    hidePages: [
      '/path/to/page' // The path to a page should start with a slash and should not end with an extension name.
    ]
  }
}
```

### Inserter
Currently, it allows you to insert anything you want into the `<head>` of every HTML page:
-# `just.config.js`
```js
module.exports = {
  // ...
  insert: {
    htmlHead: '<!-- This will be inserted into the head tag of every HTML page /-->'
  }
}
```

_just: prev: /docs/getting-started
