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

const link = (text, link_, ext = false) => `<a href="${link_}"${ext ? ' id="ext"' : ''}>${text}</a>`;
const span = (text) => `<span>${text}</span>`;
const template = {
    "charset": "utf-8",
    "title": "Documentation",
    "footer": `Made with ${link('_just', 'https://just.is-a.dev/')}.`,
    "viewport": "width=device-width, initial-scale=1.0",
    "twitter": "summary_large_image",
    "lang": "en",
    "headerTagIDStart": "hdr"
}
const fs = require('fs');
const path = require('path');
const [HTML, CSS, JS, PATH] = process.argv.slice(2);
const config = JSON.parse(fs.readFileSync('just.config.json', template.charset));
const docsConfig = config.docs_config;

const charss = [
    '_', '-'
];
for (let i = 65; i <= 90; i++) {
    charss.push(String.fromCharCode(i));
}
for (let i = 97; i <= 122; i++) {
    charss.push(String.fromCharCode(i));
}
for (let i = 48; i <= 57; i++) {
    charss.push(String.fromCharCode(i));
}
function randomChar() {
    const index = Math.floor(Math.random() * charss.length);
    const charr = charss[index];
    charss.splice(index, 1);
    return charr;
}
function randomChars(count) {
    let output = '';
    for (let i = 0; i <= count; i++) {
        output += randomChar() || '';
    }
    return output;
}

const filename = {
    'css': randomChars(8),
    'js': randomChars(8)
}

const charset = docsConfig ? docsConfig.charset || template.charset : template.charset;

const l = ['\n\n','\n    ','\n        '];
const date = new Date();
let logs = `${date} (${date.getTime()})${l[0]}_JUST FILES:${l[1]}CSS: ${filename.css}${l[1]}JS: ${filename.js}`;

const rootDirA = PATH || './';
const extensions = ['.md', '.mdx', '.html'];

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath));
        } else if (extensions.includes(path.extname(file))) {
            results.push(filePath);
        }
    });
    return results;
}

function getTitleFromHtml(filePath) {
    const content = fs.readFileSync(filePath, charset);
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    return titleMatch ? titleMatch[1] : null;
}

function getTitleFromMd(filePath) {
    const content = fs.readFileSync(filePath, charset).split('\n');
    if (content[0].startsWith('_just: title: ')) {
        return content[0].replace('_just: title: ', '').trim();
    }
    return null;
}

function getPageList() {
    const files = getFiles(rootDirA);
    const pages = [];
    logs += `${l[0]}PAGE LIST:`;
    let fileID = 0;
    files.forEach(file => {
        fileID++;
        logs += `${l[1]}FILE #${fileID} "${file}":`;
        const extname = path.extname(file);
        logs += `${l[2]}EXTNAME: ${extname}`;
        let title;
        let pagePath = file.replace(rootDirA, '').replace(extname, '');
        logs += `${l[2]}PAGEPATH (before): ${pagePath}`;

        if (pagePath.endsWith('/index')) {
            pagePath = pagePath.split('').reverse().join('').replace('index'.split('').reverse().join(''), '').split('').reverse().join('');
            title = 'Home';
        } else {
            title = path.basename(pagePath);
        }
        logs += `${l[2]}PAGEPATH (after): ${pagePath}`;
        logs += `${l[2]}TITLE (before): ${title}`;

        if (extname === '.html') {
            const htmlTitle = getTitleFromHtml(file);
            if (htmlTitle) title = htmlTitle;
        } else if (extname === '.md' || extname === '.mdx') {
            const mdTitle = getTitleFromMd(file);
            if (mdTitle) title = mdTitle;
        }
        logs += `${l[2]}TITLE (after): ${title}`;

        pages.push({ path: pagePath, title });
    });

    return pages;
}
function addFolderToPageList(pageList) {
    return pageList.map(page => {
        const folderNameArray = page.path.split('/').filter(Boolean);
        const folderName = folderNameArray.length > 1 ? folderNameArray[folderNameArray.length - 2] : null;
        return { ...page, folder: folderName };
    });
}
const pageList = getPageList();

function generateListItems(PageList) {
    const folderMap = {};

    PageList.forEach(page => {
        const folder = page.folder || '';
        if (!folderMap[folder]) {
            folderMap[folder] = [];
        }
        folderMap[folder].push(page);
    });

    let listItemsHtml = '';
    const folders = Object.keys(folderMap);
    const sortedFolders = folders.sort((a, b) => {
        if (a === '' || a === null) return -1;
        if (b === '' || b === null) return 1;
        return a.localeCompare(b);
    });
    for (const folderName of sortedFolders) {
        const pages = folderMap[folderName];

        listItemsHtml += `${ folderName != '' ? `<li>
                            <span><strong>${folderName}</strong></span>
                            <ul>` : '<li><ul>'}`;
        pages.forEach(page => {
            page.title = page.title == 'index' ? 'Home' : String(page.title).charAt(0).toUpperCase() + String(page.title).slice(1);
            listItemsHtml += `<li><a href="${page.path}"><span>${page.title}</span></a></li>`;
        });
        listItemsHtml += `   </ul>
                        </li>`;
    }

    return listItemsHtml;
}

const MDescape = (input) => {
    return input
        .replaceAll('\\\\', '&#92;')
        .replace(/\\(.)/g, (match, textdata) => {return `&#${textdata.charCodeAt(0)};${textdata.slice(1)}`})
        .replaceAll('\\', '');
}
const MDcode = (input) => {
    return input
        .replaceAll('*', '&#42;')
        .replaceAll('_', '&#95;')
}
const biMDtoHTML = (input) => {
    let text = MDescape(input);

    text = text.replace(/```([\w]*)[\r\n]+([\S\s]*?)```/g, '<code class="code">$2</code>');
    text = text.replace(/(?<=\s|^|[.,!?;:*_])`(.*?)`(?=\s|[.,!?;:*_]|$)/g, (match, code) => {return `<code>${MDcode(code)}</code>`});

    text = text.replace(/(?<=\s|^|[.,!?;:])___(.*?)___(?=\s|[.,!?;:]|$)/g, '<em><strong>$1</strong></em>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*(.*?)\*\*\*(?=\s|[.,!?;:]|$)/g, '<em><strong>$1</strong></em>');

    text = text.replace(/(?<=\s|^|[.,!?;:])__(.*?)__(?=\s|[.,!?;:]|$)/g, '<strong>$1</strong>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*(.*?)\*\*(?=\s|[.,!?;:]|$)/g, '<strong>$1</strong>');

    text = text.replace(/(?<=\s|^|[.,!?;:])_(.*?)_(?=\s|[.,!?;:]|$)/g, '<em>$1</em>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*(.*?)\*(?=\s|[.,!?;:]|$)/g, '<em>$1</em>');

    return text;
}
function hbuoclpMDtoHTML(text, maxBlockquoteLevel = 4) {
    for (let i = 6; i >= 1; i--) {
        const regex = new RegExp(`^#{${i}}\\s+(.*?)\\s*$`, 'gm');
        text = text.replace(regex, biMDtoHTML(`<h${i}>$1</h${i}>`));
    }

    function processBlockquotes(inputText, level) {
        const regex = new RegExp(`^(>\\s+){${level}}(.*?)\\s*$`, 'gm');
        return biMDtoHTML(inputText.replace(regex, (match, p1, p2) => {
            const innerBlockquote = processBlockquotes(p2.trim(), level + 1);
            const classAttr = (num) => p2.startsWith('[!NOTE]') ? num ? 7 : ' class="note"' : num ? undefined : '';
            return `<blockquote${classAttr()}>${(level > 1 ? '<br>' : '')}${classAttr(true) ? innerBlockquote.trim().slice(classAttr(true)).trim() : innerBlockquote}</blockquote>`;
        }));
    }

    for (let i = 1; i <= maxBlockquoteLevel; i++) {
        text = processBlockquotes(text, i);
    }

    const ulRegex = /^(?:-\s+|\*\s+|\+\s+)(.*?)(?:\n(?:-\s+|\*\s+|\+\s+)(.*?))*$/gm;
    const olRegex = /^(?:\d+\.\s+)(.*?)(?:\n(?:\d+\.\s+)(.*?))*$/gm;

    text = text.replace(ulRegex, (match) => {
        const items = match.split('\n').map(item => item.replace(/^- \s*/, '').replace(/^\* \s*/, '').replace(/^\+ \s*/, ''));
        return `<ul>${items.map(item => `<li>${biMDtoHTML(item.trim())}</li>`).join('')}</ul>`;
    });

    text = text.replace(olRegex, (match) => {
        const items = match.split('\n').map(item => item.replace(/^\d+\.\s*/, ''));
        return `<ol>${items.map(item => `<li>${biMDtoHTML(item.trim())}</li>`).join('')}</ol>`;
    });

    const dividerRegex = /(\n\s*[*_-]{3,}\s*\n)+/g;
    text = text.replace(dividerRegex, '<div class="line"></div>');

    const paragraphsRegex = /([^\n]+(?:\n(?![\*_-]{3}).*)*)/g;
    
    let resultTextArray = [];
    
    let match;
    
    while ((match = paragraphsRegex.exec(text)) !== null) {
        let paragraphContent = match[0].trim();
        
        if (paragraphContent) {
            resultTextArray.push(`<p>${biMDtoHTML(paragraphContent)}</p>`);
        }
        
        text = text.slice(match.index + match[0].length);
        
        if (/^\n\s*$/.test(text)) {
            resultTextArray.push('<p></p>');
            break;
        }
        
        if (/^[*_]{3}/.test(text)) {
            break;
        }
        
        if (text.length > 0) {
            resultTextArray.push(`<p>${biMDtoHTML(text.trim())}</p>`);
            break;
        }
        
        paragraphsRegex.lastIndex -= match[0].length;
        
    }

    return resultTextArray.join('');
}

function findMarkdownFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(findMarkdownFiles(file));
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            results.push(file);
        }
    });
    return results;
}

const rootDirB = process.cwd();
const markdownFiles = findMarkdownFiles(rootDirB);

const title = docsConfig ? docsConfig.title || template.title : template.title;
const metatitle = docsConfig ? docsConfig.metatitle || title : title;
const ogtitle = docsConfig && docsConfig.og ? docsConfig.og.title || metatitle : metatitle;
const description = docsConfig ? docsConfig.description || undefined : undefined;
const ogdescription = docsConfig && docsConfig.og ? docsConfig.og.description || description : description;
const viewport = docsConfig ? docsConfig.viewport || template.viewport : template.viewport;
const twitter = docsConfig && docsConfig.twitter ? docsConfig.twitter.card || template.twitter : template.twitter;
const metaKeywords = docsConfig ? docsConfig.keywords || undefined : undefined;
const lang = docsConfig ? docsConfig.htmlLang || template.lang : template.lang;
const yandexVerification = docsConfig ? docsConfig.yandex || undefined : undefined;
const googleAnalytics = docsConfig ? docsConfig.googleAnalytics || undefined : undefined;
const googleVerification = docsConfig ? docsConfig.google || undefined : undefined;
const logoPath = docsConfig ? docsConfig.logo || undefined : undefined;
const footer = docsConfig ? docsConfig.footer || template.footer : template.footer;

const insertHTMLinHead = docsConfig ? docsConfig.insertInHTMLHead || '' : '';

const keywords = metaKeywords ? `<meta name="keywords" content="${metaKeywords}"/>` : '';
const desc = description ? `<meta name="description" content="${description}"/>` : '';
const ogdesc = ogdescription ? `<meta property="og:description" content="${ogdescription}"/>` : '';
const ogtitl = ogtitle ? `<meta property="og:title" content="${ogtitle}"/>` : '';
const logo = logoPath ? `<img src="${logoPath}" width="35px" height="auto" alt="Logo">` : '';
const name = docsConfig && docsConfig.title ? span(title) : logoPath ? '' : span(title);
const htmlLang = lang ? ` lang="${`${lang}`.toLowerCase()}"` : '';
const htmlhead = () => {
    let output = `
    ${keywords}
    ${desc}
    ${ogtitl}
    ${ogdesc}
    <meta property="og:type" content="website"/>`;
    if (twitter) {
        output += `<meta property="twitter:card" content="${twitter}"/>`
    }
    if (yandexVerification) {
        output += `\n<meta name="yandex-verification" content="${yandexVerification}"/>`;
    }
    if (googleVerification) {
        output += `\n<meta name="google-site-verification" content="${googleVerification}" />`;
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
    return output;
}

filterText = (text) => text
    .replaceAll('_', `&#${'_'.charCodeAt(0)}`)
    .replaceAll('<script>', `&#${'<'.charCodeAt(0)}script&#${'>'.charCodeAt(0)}`)
    .replaceAll('</script>', `&#${'<'.charCodeAt(0)}&#${'/'.charCodeAt(0)}script&#${'>'.charCodeAt(0)}`);

function fileSize(bytes) {
    if (bytes <= 1024) {
        return `${bytes}B`;
    } else if (bytes <= 1024**2) {
        return `${Math.ceil(( bytes / 1024 ) * 100) / 100}KB`;
    } else if (bytes <= 1024**3) {
        return `${Math.ceil(( bytes / ( 1024**2 ) ) * 100) / 100}MB`;
    } else if (bytes <= 1024**4) {
        return `${Math.ceil(( bytes / ( 1024**3 ) ) * 100) / 100}GB`;
    } else if (bytes <= 1024**5) {
        return `${Math.ceil(( bytes / ( 1024**4 ) ) * 100) / 100}TB`;
    }
}

logs += `${l[0]}MARKDOWN FILES:`;
let fileID = 0;
markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, charset);
    const fileNameWithoutExt = path.basename(file, path.extname(file));
    const outFilePath = (ext) => path.join(path.dirname(file), `${fileNameWithoutExt}.${ext}`);
    fileID++;
    logs += `${l[1]}FILE #${fileID} "${file}":${l[2]}INPUT: ${fileSize(fs.statSync(file).size)}`;

    let headerID = 0;
    const toHTML = hbuoclpMDtoHTML(content).replace(/<h1>(.*?)<\/h1>/g, (match, p1) => {
        return `<h1 id="${template.headerTagIDStart}${headerID++}">${p1}</h1>`;
    }).replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
        return `<h2 id="${template.headerTagIDStart}${headerID++}">${p1}</h2>`;
    }).replace(/<h3>(.*?)<\/h3>/g, (match, p1) => {
        return `<h3 id="${template.headerTagIDStart}${headerID++}">${p1}</h3>`;
    });

    const H1 = [...toHTML.matchAll(/<h1 id="([^"]+)">(.*?)<\/h1>/g)];
    const HT = [...toHTML.matchAll(/<(h2|h3) id="([^"]+)">(.*?)<\/\1>/g)];

    const h1 = H1.map(match => [match[2], match[1]]);
    const hT = HT.map(match => [match[3], match[2]]);

    const contents = [
        ...h1.map(item => ([ ...item, false ])),
        ...hT.map(item => ([ ...item, true ]))
    ];
    let pageHeaders = '';
    for (const [idk, headerdata] of Object.entries(contents)) {
        pageHeaders += `<li${ headerdata[2] ? ' class="secondary"' : '' }>
                            <a href="#${headerdata[1]}">
                                ${span(headerdata[0])}
                            </a>
                        </li>`;
    }

    const pages = generateListItems(addFolderToPageList(pageList));
    let outHTML = HTML
        .replace('<html>', `<html lang="${htmlLang}">`)
        .replace('REPLACE_CSS', filename.css)
        .replace('REPLACE_JS', filename.js)
        .replace('REPLACE_CHARSET', charset)
        .replace('REPLACE_VIEWPORT', viewport)
        .replace('REPLACE_TITLE', metatitle)
        .replace('REPLACE_DATA', htmlhead())
        .replace('REPLACE_CUSTOM', insertHTMLinHead)
        .replace('REPLACE_LOGO', logo)
        .replace('REPLACE_NAME', filterText(name))
        .replace('REPLACE_PAGES', filterText(pages))
        .replace('REPLACE_CONTENTS', filterText(pageHeaders))
        .replace('REPLACE_FOOTER', filterText(footer));
    
    fs.writeFileSync(outFilePath('html'), outHTML.replace('REPLACE_CONTENT', toHTML), charset);
    logs += `${l[2]}OUTPUT: ${outFilePath('html')} (${fileSize(fs.statSync(outFilePath('html')).size)})`;
});

console.log('\n\n\n\n\n'+logs);
fs.writeFileSync(path.join(rootDirB, '_just_data', 'output.txt'), logs, template.charset);
fs.writeFileSync(path.join(rootDirB, '_just', `${filename.css}.css`), CSS, template.charset);
fs.writeFileSync(path.join(rootDirB, '_just', `${filename.js}.js`), JS, template.charset);