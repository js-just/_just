_just: title: Redirector Mode
# Redirector mode
**- Client-side redirect.**

> This mode redirects your static website, such as your `.github.io` website, to a specified URL. <br>This mode creates the `deploy` directory and outputs files into it.

This mode requires only the `just.config.js` file, (except for the workflow file).
`just.config.js`
```js
module.exports = {
  mode: "redirector", 
  redirect_config: {
    url: "https://example.com/" // Required. Replace with destination URL.
  }
}
```
> [!TIP] Do not use this mode if you can make server-side `HTTP 3XX` redirects.

You can add `params{}`:
```js
module.exports = {
  mode: "redirector", 
  redirect_config: {
    url: "https://example.com/", // Required. Replace with destination URL.
    params: { // Optional.
      title: "redirect website title here", // Optional. Replace with any title you want. Recommended.
      description: "redirect website description here", // Optional. Replace with any description you want.
      keywords: "some, keywords, here", // Optional. Replace with any keywords you want. Separate keywords by commas.
      htmlLang: "en", // Optional. <html lang="${htmlLang}">
      robots: "index", // Optional. <meta name="robots" content="${robots}">
      charset: "utf-8", // Optional. "utf-8" by default. <meta charset="${charset}"> and file charset.
      viewport: "width=device-width, initial-scale=1.0", // Optional. "width=device-width, initial-scale=1.0" by default. <meta name="viewport" content="${viewport}">
      yandex: "", // Optional. Put your Yandex verification string here. <meta name="yandex-verification" content="${yandex}">
      google: "", // Optional. Put your Google verification string here. <meta name="google-site-verification" content="${google}">
      googleAnalytics: "", // Optional. Put your Google Analytics ID here.
      twitter: {
        card: ""
      }
    }
  }
}
```
You can also add `content{}` in `params{}` if you want to modify HTML content.
```js
module.exports = {
  mode: "redirector", 
  redirect_config: {
    url: "https://example.com/", // Required. Replace with destination URL.
    params: { // Optional.
      content: { // Optional.
        text1: "Redirecting...", // Optional. "Redirecting...<br>" + generated content ("<small>to <a ...>...</a></small>") by default.
        text2: "Didn’t get redirected?", // Optional. "Didn’t get redirected?" by default.
        text3: "Click here!" // Optional. "Click here!" by default. <a ...>${text3}</a>
      }
    }
  }
}
```
> [!NOTE] `\\n` and tabs/4 spaces will be removed. Use `<br>` instead of `\\n`.

Remember that your repository should have a `.github/workflows/WORKFLOW_NAME.yml` file.
-# Template:
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

### Redirect paths
You may add `paths[]` in `redirect_config{}` to create custom redirect paths.
```js
module.exports = {
  mode: "redirector", 
  redirect_config: {
    url: "https://example.com/", // Required. Replace with destination URL.
    paths: [ // Optional
      {
        path_: "example", // Required. Replace with path.
        url: "https://example.com/", // Required. Replace with path destination URL.
        params: { // Optional.
          title: "redirect website title here", // Optional. Replace with any title you want. Recommended.
          description: "redirect website description here", // Optional. Replace with any description you want.
          keywords: "some, keywords, here", // Optional. Replace with any keywords you want. Separate keywords by commas.
          htmlLang: "en", // Optional. <html lang="${htmlLang}">
          robots: "index", // Optional. <meta name="robots" content="${robots}">
          charset: "utf-8", // Optional. "utf-8" by default. <meta charset="${charset}"> and file charset.
          viewport: "width=device-width, initial-scale=1.0", // Optional. "width=device-width, initial-scale=1.0" by default. <meta name="viewport" content="${viewport}">
          yandex: "", // Optional. Put your Yandex verification string here. <meta name="yandex-verification" content="${yandex}">
          google: "", // Optional. Put your Google verification string here. <meta name="google-site-verification" content="${google}">
          googleAnalytics: "" // Optional. Put your Google Analytics ID here.
        }
      }
    ]
  }
}
```

## How it works?
It generates HTML pages based on your `module.exports` input.
Every generated HTML page has:
- `<meta http-equiv="refresh" content="0;url=...">` in `<head>`. This means that the user will be redirected to the destination URL in 0 seconds after the page has loaded.
- Fallback #1 - `<script>...</script>` in `<body>` redirects the user to the destination URL.
- Fallback #2 - Other elements in `<body>` ("Redirecting... <...>", "Didn’t get redirected? `<a ...>` Click here! `</a>` ").
That means that users should be redirected, even if they have disabled JavaScript in their browser settings.

## Why is `HTTP 3XX` better?
A response with an `HTTP 3XX` status code and with the `location` header makes a real redirect.
This mode generates client-side redirects that only support browsers!
