_just: title: Compressor Mode
# Compressor mode
**- Compresses your website.**

> This mode compresses your static website's `.html`, `.js`, `.css`, `.xml`, `.svg`, `.json` and `.webmanifest` files.<br> It removes every comments, tabs and newlines. <br><br>For JavaScript it also compresses booleans and undefined: <br><ul><li>`true` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> `!0`</li><li>`false` &nbsp;&nbsp;&nbsp;&nbsp;-> `![]`</li><li>`undefined` -> `[][[]]`</li></ul>

> [!WARNING] This mode is under development, and it may cause JavaScript and HTML errors! <br>To fix JavaScript, do not forget semicolons. <br>To fix HTML new lines, use \<br> instead. <br>Please [report any bugs](https://github.com/js-just/_just/issues/new?labels=bug&template=bug.md) you find.

This mode requires only the `just.config.js` file and the workflow file.
-# `just.config.js`
```js
module.exports = {
    type: "compress"
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
          path: . # Root directory, or you can replace the dot with the path to your website directory to be compressed.
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

_just: prev: /docs/getting-started