_just: title: Postprocessor Mode
# Postprocessor mode
**- Add your own files to generated Next.js website.**

> With this mode you can add your own files to generated Next.js website. <br>This mode creates the `deploy` directory and outputs files into it.<br> If your Next.js website outputs an `en.html` file, it will be copied into the `index.html` file.

This mode requires the `just.config.js` file, the workflow file, some directories and `_just/404.html`.
Next.js website should be generated **before** running this mode.
Generated Next.js website should be in `.next/server/pages/` and `.next/static/` directories.
Required directories are:
- `_just`
- `_just/dangerously-insert-files`
- `_just/js`
- `_just/style`

-# `just.config.js`
```js
module.exports = {
  type: "postprocessor"
}
```
-# `.github/workflows/WORKFLOW_NAME.yml`
```yaml
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
      - name: npm
        id: install-npm
        run: npm i
      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager"
            exit 1
          fi
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next
      - name: Restore cache
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-
      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
      - name: Override with _just
        uses: js-just/latest@main
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: deploy

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

## Required directories
-# Required only directories, not files within them (except for the `_just/404.html` file).

In **`_just/js`** you can put your JavaScript files to be inserted into the `deploy/_just` directory and into every HTML page.
In **`_just/style`** you can place your CSS files to be inserted into the `deploy/_just` directory and into every HTML page as well.
Within **`_just/dangerously-insert-files`**, you may include any files that you wish to insert into the `deploy` directory.

> [!CAUTION] Inserting files via the **`_just/dangerously-insert-files`** directory may cause website errors or files may not be inserted if there is already a file with the same name in the `deploy` directory.

The **`_just/404.html` file** is required and it’ll become the `deploy/404.html` file (if the `deploy/404.html` file already exists, it will be overwritten).

## How it works?
1. It creates a `deploy` directory and copies every file from the `.next/server/pages` and `.next/static` directories to it.
2. If there is a `deploy/en.html` file, it will copies to the `deploy/index.html`.
3. It copies `_just/404.html` to `deploy/404.html` (if it exists, it’ll be overwritten).
4. Every `_just/js/*.js` copies into `deploy/_just`; Every `_just/style/*.css` copies into `deploy/_just`; Every `_just/dangerously-insert-files/*` copies into `deploy`.
5. Every JavaScript and CSS file in `deploy/_just` are inserted into every HTML page as HTML tags.

## Troubleshooting
This mode may cause website issues.
You can try fixing them by switching the postprocessor version in your workflow file.
```yaml
      - name: Override with _just
        uses: js-just/latest@main
        with:
          postprocessor-version: "26"
```
Available postprocessor versions are: `"24"`, `"26"` (default), `"32"`.

---

-# You can support Just an Ultimate Site Tool by setting the `watermark` to `true` in the `module.exports` of the `just.config.js` file. This will add two comments about the Just an Ultimate Site Tool to every HTML file. Thank you.

_just: prev: /docs/getting-started