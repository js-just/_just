_just: title: Generator Mode
# Generator mode
**- Generates documentation website using Markdown.**

> This website is generated using this mode.

This mode requires the `just.config.js` file and the workflow file.
-# `just.config.js`
```js
module.exports = {
    type: "docs",
    docs_config: {
        metatitle: "Documentation title", // Required. Replace with your documentation title.
        domain: "example.com" // Required. Replace with your domain name. Domain name should be valid.
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
Use Markdown (`.md`) files for documentation. You can also use HTML/CSS/JavaScript for custom pages, but remember that they will be compressed using the [Compressor mode](/docs/modes/compressor)!

## How it works?
It processes every Markdown file and generates HTML page for each of them.

_just: prev: /docs/getting-started
_just: next: /docs/generator/syntax