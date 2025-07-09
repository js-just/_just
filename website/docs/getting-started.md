_just: title: Getting Started
# Getting Started
## Installation
#### Making your first project
1. Create new repository, and create `/.github/workflows/publish.yml` file, template:
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
        uses: js-just/_just@v0.0.29
        with:
          path: .
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .

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
You can change name of workflow file and workflow name:
```yml
name: Workflow name
```
You can also choose _just version:
```yml
        uses: js-just/_just@(put version name here)
```
**If you know what exactly you are doing, you may change anything.**
2. Create `just.config.js` file in the root directory:
Choose what mode you want to use.
`Postprocessor` mode:
```js
module.exports = {
  type: "postprocessor"
}
```
`Redirector` mode: 
```js
module.exports = {
    type: "redirect", 
    redirect_config: {
        url: "https://justdeveloper.is-a.dev/", // Required. Replace with destination URL.
    }
}
```
`Compressor` mode:
```js
module.exports = {
    type: "compress"
}
```
`Generator` mode:
```js
module.exports = {
    type: "docs",
    docs_config: {
        metatitle: "Documentation title", // Required. Replace with your documentation title.
        domain: "example.com" // Required. Replace with your domain name. Domain name should be valid.
    }
}
```
3. Read the documentation for the mode that you've chosen.
#### Pro installation
1. Create or modify your `.github/workflows/github_pages_workflow_name.yml`:
Make sure that permissions are allowing to write pages and id-token, and does not allowing to write contents.
```yml
permissions:
  contents: read
  pages: write
  id-token: write
```
Make a job for building your website using _just:
```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Generate with _just
        uses: js-just/_just@(version name (recommended) / main branch (latest commit) (unstable, not recommended) / commit SHA (not recommended))
        with:
          path: (path to your website directory) (for compressor or generator modes only)
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
```
2. Create `just.config.js` file:
Basic usage:
```js
module.exports = {
  type: "(postprocessor/redirect/compress/docs)"
}
```
Using multiple modes:
-# Currently available only combining generator and compressor.
```js
module.exports = {
  type: ["docs", "compress"]
}
```
3. Read the documentation for the mode/modes that you've chosen.