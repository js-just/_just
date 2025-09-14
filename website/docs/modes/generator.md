_just: title: Generator Mode
# Generator mode
**- Generates documentation website using Markdown.**

> This website is generated using this mode.

This mode requires the `just.config.js` file and the workflow file.
-# `just.config.js`
```js
module.exports = {
  mode: "generator",
  domain: "example.com", // Required. Replace with your domain name. Domain name should be valid.
  docs_config: {
    title: "Documentation title", // Required. Replace with your documentation title.
  }
}
```

-# `.github/workflows/WORKFLOW_NAME.yml`
```yml
name: Website

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Generate with _just
        uses: js-just/latest@main
        with:
          path: . # Root directory, or you can replace the dot with the path to your docs directory to be generated.
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: . # Root directory, or you can replace the dot with the path to your entire website to be deployed to GitHub Pages.

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

After generating the documentation, this mode uses the [Compressor mode](/docs/modes/compressor) to compress the generated website.
Use Markdown ( `.md` ) files for documentation. You can also use HTML/CSS/JavaScript for custom pages, but remember that they will be compressed using the [Compressor mode](/docs/modes/compressor)!

## How it works?
It processes every Markdown file and generates HTML page for each of them.

## Customizing your documentation website
You can customize your documentation website with the `just.config.js` file.

You can make the HTML title tag and `<meta property="og:title">` differ from `title` by adding the `metatitle`:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    metatitle: 'This text will be inserted in HTML <title> and <meta property="og:title"> tags'
  }
}
```
You can also make the `<meta property="og:title">` differ from `metatitle` by adding the `og` and `og.title`:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    og: {
      title: 'This text will be inserted in HTML <meta property="og:title"> tag'
    }
  }
}
```

You can add a description to your documentation website:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    description: 'This text will be inserted in HTML <meta name="description"> and <meta name="og:description"> tags'
  }
}
```
You can make the `<meta name="og:description">` differ from `description` by adding the `og` and `og.description`:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    og: {
      // ...
      description: 'This text will be inserted in HTML <meta name="og:description"> tag'
    }
  }
}
```

You can add `<meta name="keywords">` HTML tag by adding the `keywords`:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    keywords: 'Your,website,keywords,here'
  }
}
```

You can add footer text by adding the `footer`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    footer: 'This text will be footer text'
  }
}
```

You can change the `<meta property="twitter:card">` by adding the `twitter` and the `twitter.card` in `docs_config`. `summary_large_image` by default.

You can add buttons and links to header/navbar:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    links: [
      ["a link", "https://example.com/", "_blank"] // [ " link title " , " URL " , " HTML <a> target " ]
    ],
    buttons: [
      ["a button", "https://example.com/", "_blank"] // [ " button title " , " URL " , " HTML <a> target " ]
    ]
  }
}
```

### Icon
To add an icon to your documentation pages, you can insert your custom HTML in `<head>` by adding the `insertInHTMLHead`:
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
To add an icon to header/navbar in generated documentation pages, you can specify image URL by adding the `logo`:
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    logo: 'http://example.com/logo.png'
  }
}
```

### Third-party services
Currently, Just an Ultimate Site Tool supports only adding these third-party services:
- Google Analytics
- Google Site Verification
- Yandex Site Verification
-# `just.config.js`:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    google: 'google site verification',
    googleAnalytics: 'google analytics', // example: 'G-..........'
    yandex: 'yandex site verification'
  }
}
```

_just: prev: /docs/getting-started
_just: next: /docs/generator/syntax