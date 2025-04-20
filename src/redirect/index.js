/*

MIT License

Copyright (c) 2025 JustDeveloper <https://justdeveloper.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const template = {
    "title": (url) => `Redirecting to ${url}...`,
    "description": "Made with Just an Ultimate Site Tool"
}
const fs = require('fs');
const path = require('path');
const compress = (string) => string.replaceAll(`\n`,'').replaceAll('    ','');

const config = JSON.parse(fs.readFileSync('just.config.json', 'utf-8'));
const redirectConfig = config.redirect_config;

const cssContent = compress(fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8'));
fs.writeFileSync(`deploy/_just/style.css`, cssContent);

const generatePage = (url, params, path_) => {
    const tempTitle = template.title(url);
    const tempDescription = template.description;
    const tempTwitterCard = "summary_large_image";

    const title = params ? params.title || tempTitle : tempTitle;
    const description = params ? params.description || tempDescription : tempDescription;
    const metaKeywords = params ? params.keywords || undefined : undefined;
    const lang = params ? params.htmlLang || undefined : undefined;
    
    const ogTitle = params && params.og ? params.og.title || title : title;
    const ogDescription = params && params.og ? params.og.description || description : description;
    
    const twitterCard = params && params.twitter ? params.twitter.card || tempTwitterCard : tempTwitterCard;

    const page = path_ || "index";
    const keywords = metaKeywords ? `<meta name="keywords" content="${metaKeywords}"/>` : '';
    const htmlLang = lang ? ` lang="${`${lang}`.toLowerCase()}"` : '';

    const linkElement = `<a href="${url}" target="_self">`;
    const htmlContent = compress(`<just/>
    <html${htmlLang}>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="/_just/style.css">
        <meta name="description" content="${description}"/>${keywords}
        <meta property="og:title" content="${title}"/>
        <meta property="og:description" content="${description}"/>
        <meta property="og:type" content="website"/>
        <meta property="twitter:card" content="${twitterCard}"/>
        <meta property="og:title" content="${ogTitle}"/>
        <meta property="og:description" content="${ogDescription}"/>
        <meta property="og:url" content="${url}"/>
    </head>
    <body>
        <h1>${title}</h1>
        <div>
            <span class="r">Redirecting...<br><small>to ${linkElement}${url}</a></small></span>
            <span class="d">Didn't get redirected? ${linkElement}Click here!</a></span>
        </div>
        <script src="/_just/${page}.js"></script>
    </body>
    </html>
    `).replace('<just/>','<!DOCTYPE html>\n');
    
    fs.writeFileSync(`deploy/${page}.html`, htmlContent);
    
    const jsContent = `window.location.href='${url}';`;
    fs.writeFileSync(`deploy/_just/${page}.js`, jsContent);
};

generatePage(redirectConfig.url, redirectConfig.params);

if (redirectConfig.paths) {
    redirectConfig.paths.forEach(({ path_, url, params }) => {
        generatePage(url, params, path_);
    });
}

/*

EXAMPLE just.config.js FILE for redirect(s):

module.exports = {
    type: "redirect", 
    redirect_config: {
        url: "https://justdeveloper.is-a.dev/", 
        params: {
            title: "JustDeveloper",
            description: "the one who created this shi-",
            keywords: "Just, an, Ultimate, Site, Tool",
            htmlLang: "en",
            og: {
                title: "Redirect",
                description: "Hello, World!"
            },
            twitter: {
                card: "summary_large_image"
            }
        },
        paths: [
            {
                path_: "github",
                url: "https://github.com/JustDeveloper1", 
                params: {
                    title: "JustDeveloper",
                    description: "GitHub Profile",
                    keywords: "Just, Developer",
                    htmlLang: "en",
                    og: {
                        title: "Redirect2",
                        description: "Hello, GitHub!"
                    },
                    twitter: {
                        card: "summary_large_image"
                    }
                }
            }
        ]
    }
}

*/
