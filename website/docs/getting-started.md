_just: title: Getting Started
# Getting Started
### Necessary knowledge
This documentation assumes some familiarity with
- GitHub
- GitHub Actions
- GitHub Pages
And some familiarity with these languages
- JavaScript and JSON
- YAML
- HTML
- CSS
- Markdown
## Installation
### Making your first project
- Create new repository, and create `/.github/workflows/publish.yml` file, template:
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
        with: # Remove "with" and "path" here if you are not using compressor or generator modes!
          path: . # Root directory, or you can replace the dot with the path to your website/docs directory to be generated/compressed. (Only for compressor and generator modes)
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
You can change name of workflow file and workflow name:
```yml
name: Workflow name
```
You can also choose _just version:
```yml
        uses: js-just/_just@(put version name here)
```
**If you know what exactly you are doing, you may change anything.**
- Create `just.config.js` file in the root directory:
Choose what mode you want to use.
 
Using `Postprocessor` mode:
```js
module.exports = {
  mode: "postprocessor"
}
```
Using `Redirector` mode: 
```js
module.exports = {
  mode: "redirector", 
  redirect_config: {
    url: "https://example.com/", // Required. Replace with destination URL.
  }
}
```
Using `Compressor` mode:
```js
module.exports = {
  mode: "compressor"
}
```
Using `Generator` mode:
```js
module.exports = {
  mode: "generator",
  domain: "example.com", // Required. Replace with your domain name. Domain name should be valid.
  docs_config: {
    title: "Documentation title" // Required. Replace with your documentation title.
  }
}
```
Using `Void` mode:
```js
module.exports = {
  mode: "void",
  domain: "example.com" // Required. Replace with your domain name. Domain name should be valid.
}
```
- Read the documentation for the mode that you’ve chosen.
---
### Pro installation
- Create or modify your `.github/workflows/github_pages_workflow_name.yml`:
Make sure that permissions allow writing `pages` and `id-token`, but do not allow writing `contents`, only read.
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
      - name: Generate with _just
        uses: js-just/_just@ # version name (recommended) (example: v0.0.29) / main branch (latest commit) (unstable, not recommended) / commit SHA (not recommended)
        with:
          path: # Path to your website directory to be generated/compressed. (Only for compressor and generator modes)
```
- Create `just.config.js` file:
Basic usage:
```js
module.exports = {
  mode: "(postprocessor/redirector/compressor/generator/void)"
}
```

- Read the documentation for the mode that you’ve chosen.

## Modes documentation
- [Postprocessor](/docs/modes/postprocessor)
- [Redirector](/docs/modes/redirector)
- [Compressor](/docs/modes/compressor)
- [Generator](/docs/modes/generator)

<details>
    <summary>What is **Void mode**?</summary>
    Void mode does nothing. You can use it when you want to use pre- and/or post-processor features and you don't want to use any other mode.
-# `just.config.js`
```js
module.exports = {
  mode: "void",
  domain: "example.com" // Required. Replace with your domain name. Domain name should be valid.
}
```
</details>

**Also we recommend reading the [config](/docs/config) documentation.**

## Reserved directories
Your repository should not have these directories:
- _just_data
- _just_temp
- deploy
If your repository has any of these, _just will throw an error.

_just: prev: /docs