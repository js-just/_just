/*

MIT License

Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>

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
    "viewport": "width=device-width, initial-scale=1.0",
    "twitter": "summary_large_image"
}
const fs = require('fs');
const path = require('path');
const compress = (string) => string.replaceAll(`\n`,'').replaceAll('    ','');
const filter = (input) => input ? input.replace(/[^a-zA-Z0-9]/g, (char) => `&#${char.charCodeAt(0)};`) : undefined;

const config = JSON.parse(fs.readFileSync('just.config.json', 'utf-8'));
const redirectConfig = config.redirect_config;

const cssContent = compress(fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8'));
fs.writeFileSync(`deploy/_just/style.css`, cssContent);

const generatePage = (url, params, path_) => {
    const URL = compress(`${url}`);
    const PATH = (path_) => {
        let output = compress(`${path_}`).toLowerCase();
        if (output.startsWith('/')) {
            output = output.slice(1);
        }
        if (output.endsWith('/')) {
            output += 'index';
        }
        return output;
    }

    const tempTitle = template.title(URL);
    const tempViewport = template.viewport;

    const title = params ? params.title || tempTitle : tempTitle;
    const description = params ? params.description || undefined : undefined;
    const metaKeywords = params ? params.keywords || undefined : undefined;
    const lang = params ? params.htmlLang || undefined : undefined;
    const robots = params ? params.robots || undefined : undefined;
    const charset = params ? params.charset || "UTF-8" : "UTF-8";
    const viewport = params ? params.viewport || tempViewport : tempViewport;

    const text1 = params && params.content ? filter(params.content.text1) || undefined : undefined;
    const text2 = params && params.content ? filter(params.content.text2) || undefined : undefined;
    const text3 = params && params.content ? filter(params.content.text3) || undefined : undefined;
    
    const ogTitle = params && params.og ? params.og.title || title : title;
    const ogDescription = params && params.og ? params.og.description || description : description;
    
    const twitterCard = params && params.twitter ? params.twitter.card || template.twitter : template.twitter;

    const yandexVerification = params ? params.yandex || undefined : undefined;

    const googleAnalytics = params ? params.googleAnalytics || undefined : undefined;
    const googleVerification = params ? params.google || undefined : undefined;

    const page = path_ ? PATH() : "index";
    const keywords = metaKeywords ? `<meta name="keywords" content="${metaKeywords}">` : '';
    const htmlLang = lang ? ` lang="${`${lang}`.toLowerCase()}"` : '';
    const optionalstuff = () => {
        let output = '';
        if (yandexVerification) {
            output += `\n<meta name="yandex-verification" content="${yandexVerification}">`;
        }
        if (googleVerification) {
            output += `\n<meta name="google-site-verification" content="${googleVerification}">`;
        }
        if (googleAnalytics) {
            output += `\n<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}"></script>
                        <script>
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {
                                dataLayer.push(arguments);
                            }
                            gtag('js', new Date());
                            gtag('config', '${googleAnalytics}');
                        </script>`
        }
        if (robots) {
            output += `\n<meta name="robots" content="${robots}">`
        }
        return output;
    }

    const link = `<a href="${URL}" target="_self">`;
    const meta = '<meta property=';
    const htmlContent = '<!DOCTYPE html>' + `<html${htmlLang}>` +
    '<head>' +
        `<meta http-equiv="refresh" content="0;url=${URL}">` +
        `<meta charset="${charset}">` +
        `<meta name="viewport" content="${viewport}">` +
        `<title>${title}</title>` +
        `<link rel="stylesheet" href="/_just/style.css">` +
        `${description ? `<meta name="description" content="${description}">` : ''}${keywords}` +
        `${meta}"og:type" content="website">` +
        `${meta}"twitter:card" content="${twitterCard}">` +
        `${meta}"og:title" content="${ogTitle}">` +
        `${ogDescription ? `${meta}"og:description" content="${ogDescription}">` : ''}` +
        `${meta}"og:url" content="${URL}">${optionalstuff()}` +
    '</head>' +
    '<body>' +
        `<h1>${title}</h1>` +
        '<div>' +
            `<span class="r">${text1 || `Redirecting...<br><small>to ${link}${URL}</a></small>`}</span>` +
            `<span class="d">${text2 || "Didn't get redirected?"} ${link}${text3 || 'Click here!'}</a></span>` +
        '</div>' +
        `<script>window.location.replace('${URL}')</script><script>window.location.href='${URL}'</script><script>window.location.assign('${URL}')</script>` +
    '</body>' +
'</html>';
    
    fs.writeFileSync(`deploy/${page}.html`, htmlContent);
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


------------------------

everything combined:

module.exports = {
    type: "redirect", 
    redirect_config: {
        url: "https://justdeveloper.is-a.dev/", 
        params: {
            title: "JustDeveloper",
            description: "the one who created this shi-",
            keywords: "Just, an, Ultimate, Site, Tool",
            htmlLang: "en",
            robots: "index",
            charset: "UTF-8",
            viewport: "width=device-width",
            yandex: "abc123",
            google: "abc123",
            googleAnalytics: "abc123",
            content: {
                text1: "Hello, World!",
                text2: "do not click anywhere.",
                text3: "click here!"
            },
            og: {
                title: "Redirect",
                description: "Hello, World!"
            },
            twitter: {
                card: "summary_large_image"
            }
        }
    }
}

*/
