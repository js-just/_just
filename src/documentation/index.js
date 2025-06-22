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

const _just = {};
const [HTMLtemplate, CSStemplate, JStemplate, PATH, repo, owner, customCSS] = process.argv.slice(2);
let HTML = HTMLtemplate;
let CSS = CSStemplate;
let JS = JStemplate;
_just.string = require('../modules/string.js');
_just.element = (type, insert) => `<_just${type ? ` element="${type}"` : ''}>${insert || ''}</_just>`;
_just.error = require('../modules/errmsg.js');
_just.ssapi = require('../modules/ssapi.js');
_just.customCSS = require('./customcss.js');
_just.MDtoHTML = require('./mdtohtml.js');
_just.line = require('../modules/line.js');

const link = (text, link_, ext = false, extid = "ext", target = "_blank", title_) => `<a href="${link_}" target="${target}"${ext ? ` id="${extid}"` : ''}${title_ ? ` title="${title_}"` : ''}>${text}</a>`;
const span = (text) => `<span>${text}</span>`;
const template = {
    "charset": "utf-8",
    "title": "Documentation",
    "footer": `Made with ${link('_just', 'https://just.is-a.dev/')}.`,
    "viewport": "width=device-width, initial-scale=1.0",
    "twitter": "summary_large_image",
    "lang": "en"
}
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('just.config.json', template.charset));
const docsConfig = config.docs_config;

const configmbl = docsConfig ? docsConfig.mbl || undefined : undefined;
if (configmbl && (configmbl > 4 || configmbl < 1)) {
    _just.error.errormessage('0209', `Unstable config: mbl: [0m${configmbl}`, 'Warning').then((errormsg)=>{console.warn(errormsg)});
}
const mbl = configmbl ? configmbl : 4;

let charss = [];
const chars2 = ['_', '-'];
const addchars = () => { for (let i = 65; i <= 90; i++) {
    charss.push(String.fromCharCode(i))};
    charss = Array.from(new Set(charss));
}
addchars();
for (let i = 97; i <= 122; i++) {
    charss.push(String.fromCharCode(i));
}
for (let i = 48; i <= 57; i++) {
    chars2.push(String.fromCharCode(i));
}
function randomChar(i) {
    const exp = i % 2 === 0 && chars2.length > 0;
    const tbsplcd = exp ? chars2 : charss;
    const index = Math.floor(Math.random() * tbsplcd.length);
    const charr = tbsplcd[index];
    tbsplcd.splice(index, 1);
    return charr;
}
function randomChars(count) {
    let output = '';
    for (let i = 1; i <= count; i++) {
        output += randomChar(i) || '';
    }
    return output;
}

const filename = {
    'css': randomChars(8),
    'js': randomChars(8)
}
const dataname = [];
for (let i = 0; i <= 11; i++) {
    dataname.push(randomChars(4));
}
HTML = HTML.replace('--hc:', `--${dataname[0].slice(0,-1)}:`);
CSS = CSS.replaceAll('var(--hc)', `var(--${dataname[0].slice(0,-1)})`);
JS = JS.replace('\'--hc\'', `'--${dataname[0].slice(0,-1)}'`);

addchars();
for (let i = 48; i <= 57; i++) {
    charss.push(String.fromCharCode(i));
}
const cssclass = {
    "l": dataname[2],
    "a": dataname[2]+randomChar(1),
    "left": dataname[0],
    "main": dataname[2]+randomChar(1),
    "code": dataname[2]+randomChar(1),
    "note": dataname[3]+randomChar(1),
    "ntip": dataname[3]+randomChar(1),
    "impr": dataname[3]+randomChar(1),
    "warn": dataname[3]+randomChar(1),
    "caut": dataname[3]+randomChar(1),
    "line-through": dataname[4],
    "line": dataname[3]+randomChar(1),
    "right": dataname[1],
    "navbar": dataname[1]+randomChar(1),
    "heading": dataname[1]+randomChar(1),
    "links": dataname[1]+randomChar(1),
    "buttons": dataname[1]+randomChar(1),
    "slider": dataname[1]+randomChar(1),
    "navleft": dataname[4]+randomChar(1),
    "ios": dataname[4]+randomChar(1),
    "scroll": dataname[4]+randomChar(1),
    "stb": dataname[4]+randomChar(1),
    "underline": dataname[3],
}
const cssid = {
    "l": dataname[5]+randomChar(1),
    "d": dataname[5]+randomChar(1),
    "a": dataname[5]+randomChar(1),
    "main": dataname[5]+randomChar(1),
    "ext": dataname[5]+randomChar(1)
}
const cssvar = {
    "bg": dataname[6]+randomChar(1),
    "cl": dataname[6]+randomChar(1),
    "kb": dataname[6]+randomChar(1),
    "tf": dataname[6]+randomChar(1),
    "bh": dataname[6]+randomChar(1),
    "bp": dataname[6]+randomChar(1),
    "br": dataname[6]+randomChar(1),
    "mp": dataname[6]+randomChar(1),
    "mn": dataname[6]+randomChar(1),
    "nh": dataname[6]+randomChar(1),
    "fr": dataname[6]+randomChar(1)
}
addchars();
cssvar["md"] = dataname[7]+randomChar(1);
cssvar["nt"] = dataname[7]+randomChar(1);
cssvar["nb"] = dataname[7]+randomChar(1);
cssvar["tt"] = dataname[7]+randomChar(1);
cssvar["tb"] = dataname[7]+randomChar(1);
cssvar["it"] = dataname[7]+randomChar(1);
cssvar["ib"] = dataname[7]+randomChar(1);
cssvar["wt"] = dataname[7]+randomChar(1);
cssvar["wb"] = dataname[7]+randomChar(1);
addchars();
cssvar["ct"] = dataname[8]+randomChar(1);
cssvar["cb"] = dataname[8]+randomChar(1);
cssvar["sb"] = dataname[8]+randomChar(1);
Object.entries(cssclass).forEach(([key, class_]) => {
    CSS = key === "l" ? CSS.replaceAll(`.${key} `, `.${class_} `).replaceAll(`.${key}:`, `.${class_}:`).replaceAll(`.${key})`, `.${class_})`) : CSS.replaceAll(`.${key}`, `.${class_}`);
})
Object.entries(cssid).forEach(([key, id_]) => {
    CSS = CSS.replaceAll(`#${key}`, `#${id_}`);
});
Object.entries(cssvar).forEach(([key, var_]) => {
    CSS = CSS.replaceAll(`--${key}`, `--${var_}`);
});
HTML = HTML
    .replace('<nav class="left">', `<nav class="${cssclass.left}">`)
    .replace('<nav class="right">', `<nav class="${cssclass.right}">`)
    .replace('<article class="main">', `<article class="${cssclass.main}">`)
    .replace('<nav class="navbar">', `<nav class="${cssclass.navbar}">`)
    .replace('<div class="heading">', `<div class="${cssclass.heading}">`)
    .replace('<div class="links">', `<div class="${cssclass.links}">`)
    .replace('<div class="buttons">', `<div class="${cssclass.buttons}">`)
    .replace('<div class="slider"></div>', `<div class="${cssclass.slider}"></div>`)
    .replace('<div id="main">', `<div id="${cssid.main}">`)
    .replace('<button id="l"', `<button id="${cssid.l}"`)
    .replace('<button id="d"', `<button id="${cssid.d}"`)
    .replace('<button id="a"', `<button id="${cssid.a}"`);
JS = JS
    .replace('html > body > main > div#main > article.main', `html > body > main > div#${cssid.main} > article.${cssclass.main}`)
    .replace('\'.main\'', `'.${cssclass.main}'`)
    .replaceAll('".navbar"', `".${cssclass.navbar}"`)
    .replaceAll('\'navleft\'', `'${cssclass.navleft}'`)
    .replaceAll('\'ios\'', `'${cssclass.ios}'`)
    .replaceAll('"scroll"', `"${cssclass.scroll}"`)
    .replaceAll('\'stb\'', `'${cssclass.stb}'`)
    .replaceAll(".add('l')", `.add('${cssclass.l}')`)
    .replaceAll(".remove('l')", `.remove('${cssclass.l}')`)
    .replaceAll(".add('a')", `.add('${cssclass.a}')`)
    .replaceAll(".remove('a')", `.remove('${cssclass.a}')`)
    .replaceAll("Id('l')", `Id('${cssid.l}')`)
    .replaceAll("Id('d')", `Id('${cssid.d}')`)
    .replaceAll("Id('a')", `Id('${cssid.a}')`);

const charset = docsConfig ? docsConfig.charset || template.charset : template.charset;

const l = ['\n\n','\n    ','\n        '];
const date = new Date();
let logs = `${date} (${date.getTime()})${l[0]}_JUST FILES:${l[1]}CSS: ${filename.css}${l[1]}JS: ${filename.js}`;
let errorlogs = `${l[0]}CAUGHT ERRORS:`;

const rootDirA = PATH || '.';
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

const pathtourl = {};
function reporepo() {
    return _just.string.removeLast(`${repo.replace(owner+'/','')}/`.repeat(2), '/')
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
        const ext = extname.slice(1);
        logs += `${l[2]}EXTNAME: ${extname}`;
        let title;
        let pagePath = _just.string.removeLast(file.replace(rootDirA, '').replace(extname, ''), ext);
        logs += `${l[2]}PAGEPATH (before): ${pagePath}`;

        if (pagePath.endsWith('/index') || pagePath === 'index') {
            pagePath = _just.string.removeLast(pagePath, 'index')
            title = 'Home';
        } else {
            title = _just.string.removeLast(path.basename(pagePath), ext);
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
        pathtourl[`/home/runner/work/${reporepo()}/${file}`] = pagePath;
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


const psl = async () => {
    const responce = await fetch('https://publicsuffix.org/list/public_suffix_list.dat');
    let dat_ = await responce.text();
    dat_ = dat_.replace(/(?<=^|\n)\/\/(.*?)\n/g, '\n').replace(/\n(\n{0,})\n/g, '\n').trim().split('\n').filter(d => (!d.startsWith('!') && !d.startsWith('*.')))
    return [dat_.filter(d => /\./.test(d)), dat_.filter(d => !/\./.test(d))] // domains, TLDs
}
function getTLD(hostname) {
  const parts = hostname.split('.');
  if (parts.length < 2) {
    return null;
  }
  return parts[parts.length - 1];
}
const checkTLD = async (domain) => {
    const inputTLD = getTLD(domain);
    const PSL = await psl();
    if (PSL[1].includes(inputTLD)) {
        return domain
    } else {
        _just.error.errormessage('0126', `"[0m"${inputTLD}"[0;31m" is not a TLD. (${domain})`).then((errmsg)=>{throw new Error(errmsg)});
    }
}
const domainregex = /^(?=.{1,253}$)(?:(?:[_a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.)+[a-zA-Z]{2,63}$/; // regex made by @wdhdev - https://github.com/wdhdev ( commit: https://github.com/is-a-dev/register/commit/6339f26bef0d9dbf56737ffddaca7794cf35bd24#diff-80b3110840a7eedb8cc2c29ead4fe4c98f157738ff3dcf22f05f3094ad6ca9bbR6 )
function checkdomain(input) {
    if (input && domainregex.test(input)) {
        return input;
    } else if (!input) {
        return undefined;
    } else {
        _just.error.errormessage('0122', `"[0m"${input}"[0;31m" is not a domain name.`).then((errmsg)=>{throw new Error(errmsg)});
    }
}
const domain = docsConfig ? checkdomain(docsConfig.domain) || undefined : undefined;
checkTLD(domain).then(() => {
    if (domain && domain.endsWith('.is-a.dev')) {
        _just.ssapi["is-a.dev"](domain);
    }
    function extlink(url_) {
        let ext = true;
        try {
            const url = new URL(url_);
            const domain_ = url.hostname;
            if (domain && domain_ && domain_ === domain) {
                ext = false;
            }
        } catch (eerr) {
            errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(eerr)}`;
        }
        if (url_ && url_.startsWith('/')) {
            ext = false;
        }
        return ext;
    }
    function checklink(url_) {
        let output = false;
        try {
            const url = new URL(url_);
            const domain_ = url.hostname;
            if (domain_ && checkdomain(domain_)) {
                output = true;
            }
        } catch (eerr) {
            errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(eerr)}`;
        }
        return output;
    }

    const charCodes = (input) => {
        let output = '';
        for (i = 0; i <= input.length; i++) {
            output += input.charCodeAt(i) ? `&#${input.charCodeAt(i)};` : ''
        }
        return output
    }
    const MDescape = (input) => {
        return input
            .replaceAll('\\\\', `&#${'\\'.charCodeAt(0)};`)
            .replace(/\\\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/g, (match, blockquote) => `${charCodes(`[!${blockquote}]`)}`)
            .replace(/\\(.)/g, (match, textdata) => {return `&#${textdata.charCodeAt(0)};${textdata.slice(1)}`})
            .replaceAll('\\', '');
    }
    const MDcode = (input) => {
        return input
            .replaceAll('*', `&#${'*'.charCodeAt(0)};`)
            .replaceAll('_', `&#${'_'.charCodeAt(0)};`)
            .replace(/(http:\/\/|https:\/\/)/g, (match, protocol_) => `${charCodes(protocol_)}`)
    }
    const linkregex = /(?<=\s|^|[.,!?;:*_^~=])\[(.*?)\]\((.*?)\)(?=\s|[.,!?;:*_^~=]|$)/g;
    const MDtoHTML = (input) => {
        let text = MDescape(input);
        text = text.replace(/```([\w]*)[\r\n]+([\S\s]*?)```/g, `<code class="${cssclass.code}">$2</code>`)
                .replace(/(?<=\s|^|[.,!?;:*_^~=])`(.*?)`(?=\s|[.,!?;:*_^~=]|$)/g, (match, code) => {return `<code>${MDcode(code)}</code>`})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])!\[(.*?)\]\((.*?) ("|')(.*?)\3\)(?=\s|[.,!?;:*_^~=]|$)/g, (match, text, link_, q, imgtitle) => {return `<img src="${link_}" alt="${text}" title="${imgtitle}" loading="lazy">`})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])!\[(.*?)\]\((.*?)\)(?=\s|[.,!?;:*_^~=]|$)/g, (match, text, link_) => {return `<img src="${link_}" alt="${text}" loading="lazy">`})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])\[(.*?)\]\((.*?) ("|')(.*?)\3\)(?=\s|[.,!?;:*_^~=]|$)/g, (match, text, link_, q, linktitle) => {return link(text, link_, extlink(link_), cssid.ext, "_blank", linktitle)})
                .replace(linkregex, (match, text, link_) => {return link(text, link_, extlink(link_), cssid.ext)})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])(http:\/\/|https:\/\/)(.*?)(?=\s|[,!;:*^~`<>]|[.?=#%&+] |$)/g, (match, protocol_, link_) => {
                        const link__ = `${protocol_.trim()}${link_.trim()}`;
                        if (checklink(link__)) {
                            try {
                                const linkurl = new URL(link__);
                                if (linkurl.hostname.includes('xn--')) {
                                    return link(link__, linkurl.href, extlink(linkurl.href), cssid.ext);
                                }
                            } catch (e__) {
                                errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(e__)}`;
                            }
                            return `<${link__}>`;
                        } else return `${protocol_}${link_}`;
                    })
                .replace(/(?<=\s|^|[.,!?;:*_^~=])<(http:\/\/|https:\/\/)(.*?)>(?=\s|[.,!?;:*_^~=]|$)/g, (match, protocol_, link_) => {const link__=`${protocol_.trim()}${link_.trim()}`;return link(link__, link__, extlink(link__), cssid.ext)})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])<(.*?)@(.*?)>(?=\s|[.,!?;:*_^~=]|$)/g, (match, address, domain__) => {
                        try {
                            checkdomain(domain__);
                            const mail = `${address.trim()}@${domain__.trim()}`;
                            return `<a href="mailto:${mail}">${mail}</a>`;
                        } catch (_e_) {
                            errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(_e_)}`;
                            return `<${address}@${domain__}>`;
                        }
                    });
        return _just.MDtoHTML.MDtoHTML(text, cssclass).replace(/~(.*?)~/g, '<sub>$1</sub>').replace(/\^(.*?)\^/g, '<sup>$1</sup>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    const dividerRegex = /(\n\s*[*_-]{3,}\s*\n)+/g;
    function hbuoclpMDtoHTML(text, maxBlockquoteLevel = mbl) {
        for (let i = 6; i >= 1; i--) {
            const regex = new RegExp(`^#{${i}}\\s+(.*?)\\s*$`, 'gm');
            text = text.replace(regex, MDtoHTML(`<h${i}>$1</h${i}>`));
        }

        function processBlockquotes(inputText, level) {
            const regex = new RegExp(`^(>\\s+){${level}}(.*?)\\s*$`, 'gm');
            return MDtoHTML(inputText.replace(regex, (match, p1, p2) => {
                const innerBlockquote = processBlockquotes(p2.trim(), level + 1);
                const classAttr = (num) =>
                    p2.startsWith('[!NOTE]') ? num ? 7 : ` class="${cssclass.note}"` :
                    p2.startsWith('[!TIP]') ? num ? 6 : ` class="${cssclass.ntip}"` :
                    p2.startsWith('[!IMPORTANT]') ? num ? 12 : ` class="${cssclass.impr}"` :
                    p2.startsWith('[!WARNING]') ? num ? 10 : ` class="${cssclass.warn}"` :
                    p2.startsWith('[!CAUTION]') ? num ? 10 : ` class="${cssclass.caut}"` :
                    num ? undefined : '';
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
            return `<ul>${items.map(item => `<li>${MDtoHTML(item.trim())}</li>`).join('')}</ul>`;
        });

        text = text.replace(olRegex, (match) => {
            const items = match.split('\n').map(item => item.replace(/^\d+\.\s*/, ''));
            return `<ol>${items.map(item => `<li>${MDtoHTML(item.trim())}</li>`).join('')}</ol>`;
        });

        text = text.replace(dividerRegex, `<div class="${cssclass.line}"></div><br>`);

        const paragraphsRegex = /([^\n]+(?:\n(?![\*_-]{3}).*)*)/g;
        
        let resultTextArray = [];
        
        let match;
        
        while ((match = paragraphsRegex.exec(text)) !== null) {
            let paragraphContent = match[0].trim();
            
            if (paragraphContent) {
                resultTextArray.push(`<p>${MDtoHTML(paragraphContent)}</p>`);
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
                resultTextArray.push(`<p>${MDtoHTML(text.trim())}</p>`);
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
    const publicOutput = config.OutputLinkInConsole || false;

    const links = docsConfig ? docsConfig.links || [] : [];
    const buttons = docsConfig ? docsConfig.buttons || [] : [];

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

    const configlogs = `${l[0]}DOMAIN: ${domain}${l[0]}CONFIG TO HTML:${l[1]}DOCSCONFIG:${l[2]}\
    TITLE: ${title}${l[2]}TITLE (HTML): ${name}${l[2]}METATITLE: ${metatitle}${l[2]}OGTITLE: ${ogtitle}${l[2]}\
    OGTITLE (HTML): ${ogtitl}${l[2]}DESCRIPTION: ${description}${l[2]}DESCRIPTION (HTML): ${desc}${l[2]}OGDESCRIPTION: ${ogdescription}${l[2]}\
    OGDESCRIPTION (HTML): ${ogdesc}${l[2]}VIEWPORT: ${viewport}${l[2]}TWITTER CARD: ${twitter}${l[2]}KEYWORDS: ${metaKeywords}${l[2]}\
    KEYWORDS (HTML): ${keywords}${l[2]}LANG: ${lang}${l[2]}LANG (HTML): ${htmlLang}${l[2]}GOOGLE ANALYTICS: ${googleAnalytics}${l[2]}\
    GOOGLE SITE VERIFICATION: ${googleVerification}${l[2]}YANDEX SITE VERIFICATION: ${yandexVerification}${l[2]}LOGO: ${logoPath}${l[2]}\
    LOGO (HTML): ${logo}${l[2]}FOOTER: ${footer}${l[2]}HTML: ${htmlhead().replaceAll('\n', '').trim()}`

    const filterText = (text) => text
        .replaceAll('_', `&#${'_'.charCodeAt(0)};`)
        .replaceAll('<script', `&#${'<'.charCodeAt(0)};script`)
        .replaceAll('</script>', `&#${'<'.charCodeAt(0)};&#${'/'.charCodeAt(0)};script&#${'>'.charCodeAt(0)};`)
        .replaceAll('<style', `&#${'<'.charCodeAt(0)};style`)
        .replaceAll('</style>', `&#${'<'.charCodeAt(0)};&#${'/'.charCodeAt(0)};style&#${'>'.charCodeAt(0)};`)
        .replaceAll('<link', `&#${'<'.charCodeAt(0)};link`)
        .replaceAll('</link>', `&#${'<'.charCodeAt(0)};&#${'/'.charCodeAt(0)};link&#${'>'.charCodeAt(0)};`);
    const addEnd = (text, end) => {
        if (!text.endsWith(end)) {
            text += end
        }
        return text
    }

    let linklogs = `${l[0]}LINKS:`;
    let buttonlogs = `${l[0]}BUTTONS:`;
    let uniqueNames = {};
    let uniqueNames_= [dataname[0].slice(0,-1)];
    uniqueNames[dataname[0].slice(0,-1)] = 1;
    for (i = 0; i <= dataname.length; i++) {
        uniqueNames[dataname[i]] = 1;
        uniqueNames_.push(dataname[i]);
    }
    const csstouniquenames = (cssclassorcssid) => Object.entries(cssclassorcssid).forEach(([key, dataname_]) => {
        if (!uniqueNames_.includes(dataname_)) {
            uniqueNames[dataname_] = 1;
            uniqueNames_.push(dataname_);
        }
    });
    csstouniquenames(cssclass);
    csstouniquenames(cssid);
    let htmlnavrunid = 0;
    const htmlnav = (type = 0) => {
        let output = '';
        let addcss = '';
        let bid = 0;
        let pageid = 0;
        pageid++;
        for (const [idk, linkdata] of Object.entries(type == 0 ? links : type == 1 ? buttons : undefined)) {
            let ext = extlink(linkdata[1]);
            linklogs += type == 0 && htmlnavrunid <= 1 ? `${l[1]}#${bid+1}:${l[2]}NAME: ${linkdata[0]}${l[2]}FILTERED NAME: ${filterText(linkdata[0])}${l[2]}HREF: ${linkdata[1]}${l[2]}TARGET: ${linkdata[2]}${l[2]}EXTERNAL: ${ext ? 'YES' : 'NO'}` : '';
            buttonlogs += type == 1&& htmlnavrunid <= 1? `${l[1]}#${bid+1}:${l[2]}NAME: ${linkdata[0]}${l[2]}FILTERED NAME: ${filterText(linkdata[0])}${l[2]}LINK: ${linkdata[1]}${l[2]}TARGET: ${linkdata[2]}${l[2]}EXTERNAL: ${ext ? 'YES' : 'NO'}${l[2]}ID: ${dataname[0]}${bid}` : '';
            output += type == 0 ? `<a${linkdata[1] ? ` href="${linkdata[1]}"` : ''}${linkdata[1] ? ` target="${linkdata[2] ? linkdata[2] : ext ? '_blank' : '_self'}"` : ''}${ext ? ` id="${cssid.ext}"` : ''}>${filterText(linkdata[0])}</a>` : type == 1 ? `<button id="${dataname[0]}${bid}">${filterText(linkdata[0])}</button>` : '';
            JS = pageid == 1 && type == 1 && linkdata[1] ? _just.string.removeLast(JS, '});') + `\ndocument.getElementById('${dataname[0]}${bid}').addEventListener("click",()=>{const link=document.createElement('a');link.href='${linkdata[1]}';link.target='${linkdata[2] ? linkdata[2] : ext ? '_blank' : '_self'}';link.classList.add('${dataname[0]}${bid}');document.body.appendChild(link);link.click();document.body.removeChild(link);});` + '\n});' : JS;
            addcss += pageid == 1 && type == 1 && linkdata[1] ? `.${dataname[0]}${bid},` : '';
            if (type == 1 && linkdata[1] && htmlnavrunid <= 1) {
                uniqueNames[`${dataname[0]}${bid}`] = 1;
                uniqueNames_.push(`${dataname[0]}${bid}`);
            }
            bid++;
        }
        CSS += addcss != '' ? `\n${_just.string.removeLast(addcss, ',')}{display:none}` : '';
        htmlnavrunid++;
        return output;
    }
    htmlnav();htmlnav(1);
    /*
        "links": [
            ["name", "link", "target"],
            ["link2", "https://just.is-a.dev/"]
        ]

        "buttons": [
            ["name", "link", "target"],
            ["button2", "https://just.is-a.dev/"]
        ]
    */

    function uniqueName(input) {
        if (!uniqueNames[input]) {
            uniqueNames[input] = 1;
            uniqueNames_.push(input);
            return input;
        } else {
            uniqueNames[input]++;
            uniqueNames_.push(input + uniqueNames[input]);
            return input + uniqueNames[input];
        }
    }

    const blockquoteToCSSclass = {
        "NOTE": cssclass.note,
        "TIP": cssclass.ntip,
        "IMPORTANT": cssclass.impr,
        "WARNING": cssclass.warn,
        "CAUTION": cssclass.caut
    }

    logs += `${l[0]}MARKDOWN FILES:`;
    let fileID = 0;
    const mdjson = {}
    function toText(input) {
        input = input.trim().replaceAll('\\', '')
            .replace(dividerRegex, '')
            .replaceAll('`', '')
            .replaceAll('*', '')
            .replaceAll('_', '')
            .replaceAll('> ','')
        for (let i = 6; i >= 1; i--) {
            input = input.replace(new RegExp(`^#{${i}}\\s+(.*?)\\s*$`, 'gm'), '$1')
        }
        return input
            .replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/g, '$1:')
            .replace(linkregex, '$1');
    }
    markdownFiles.forEach(file => {
        let content = fs.readFileSync(file, charset);
        if (getTitleFromMd(file)) {
            content = content.split('\n').slice(1).join('\n');
        }
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        const outFilePath = (ext) => path.join(path.dirname(file), `${fileNameWithoutExt}.${ext}`);
        fileID++;
        logs += `${l[1]}FILE #${fileID} "${_just.string.runnerPath(file)}":${l[2]}INPUT: ${_just.string.fileSize(fs.statSync(file).size)}`;

        if (pathtourl[file]) {
            mdjson[pathtourl[file]] = toText(content);
        }

        const headers = [];
        const toHTML = hbuoclpMDtoHTML(
            addEnd(content, '\n')
                .replace(/> (.*?)\n\n> (.*?)\n/g, `> $1\n\n> ${_just.element('blockquote separator')}$2\n`)
                .replaceAll('\n>\n> ', '\n> ')
                .replace(new RegExp(`(?<=^|\n)([>|> ]{2,${mbl}}) `, 'g'), (match, bqs) => `\n${bqs.replaceAll(' ', '').split('').join(' ').trim()} `)
        ).replace(/<h1>(.*?)<\/h1>/g, (match, p1) => {
            return `<h1 id="${uniqueName(encodeURIComponent(p1))}">${p1}</h1>`;
        }).replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
            return `<h2 id="${uniqueName(encodeURIComponent(p1))}">${p1}</h2>`;
        }).replace(/<h3>(.*?)<\/h3>/g, (match, p1) => {
            return `<h3 id="${uniqueName(encodeURIComponent(p1))}">${p1}</h3>`;
        }).replace(/<(h1|h2|h3) id="([^"]+)">(.*?)<\/\1>/g, (match, p1, p2, p3) => {headers.push(p2);return`<${p1} id="${p2}">${p3}</${p1}>`});

        const H1 = [...toHTML.matchAll(/<h1 id="([^"]+)">(.*?)<\/h1>/g)];
        const HT = [...toHTML.matchAll(/<(h2|h3) id="([^"]+)">(.*?)<\/\1>/g)];

        const h1 = H1.map(match => [match[2], match[1]]);
        const hT = HT.map(match => [match[3], match[2]]);

        const headermap = new Map(headers.map((id, index) => [id, index]));
        const contents = [
            ...h1.map(item => ([ ...item, false ])),
            ...hT.map(item => ([ ...item, true ]))
        ];
        contents.sort((a, b) => {
            const indexA = headermap.get(a[1]) ?? Infinity;
            const indexB = headermap.get(b[1]) ?? Infinity;
            return indexA - indexB;
        });
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
            .replace('<html>', `<html${htmlLang}>`)
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
            .replace('REPLACE_FOOTER', filterText(footer))
            .replace('REPLACE_LINKS', htmlnav())
            .replace('REPLACE_BUTTONS', htmlnav(1));
        
        fs.writeFileSync(outFilePath('txt'), toHTML, charset);
        fs.writeFileSync(
            outFilePath('html'),
            outHTML.replace(
                'REPLACE_CONTENT',
                _just.string.removeLast(
                    addEnd(
                        toHTML
                            .replaceAll('\n', '<br>')
                            .replaceAll('</h1><br>', '</h1>')
                            .replaceAll('</h2><br>', '</h2>')
                            .replaceAll('</h3><br>', '</h3>')
                            .replaceAll('</h4><br>', '</h4>')
                            .replaceAll('</h5><br>', '</h5>')
                            .replaceAll('</h6><br>', '</h6>')
                            .replaceAll('</ol><br>', '</ol>')
                            .replaceAll('</ul><br>', '</ul>')
                            .replace(/<blockquote><br>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<\/blockquote>/g, '<blockquote><blockquote>$1</blockquote></blockquote>')
                            .replace(/<blockquote><br>> ((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<\/blockquote>/g, '<blockquote><blockquote><blockquote>$1</blockquote></blockquote></blockquote>')
                            .replaceAll('</blockquote><br>', '</blockquote>')
                            .replaceAll('<br><blockquote', '<blockquote')
                            .replaceAll('</blockquote><blockquote>', '<br>')
                            .replaceAll('<br><blockquote><br>', '<blockquote>')
                            .replace(/<blockquote>> ((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<\/blockquote>/g, '<blockquote><blockquote>$1</blockquote></blockquote>')
                            .replaceAll('</blockquote></blockquote><blockquote><blockquote>', '<br>')
                            .replaceAll('</blockquote><blockquote>', '<br>')
                            .replace(/<blockquote>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<br>> ((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<br>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<\/blockquote>/g, '<blockquote>$1<blockquote>$2</blockquote><br>$3</blockquote>')
                            .replaceAll('</blockquote><br>', '</blockquote>')
                            .replace(/<\/blockquote>> ((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<blockquote>/g, '</blockquote><blockquote>$1</blockquote><blockquote>')
                            .replaceAll('</blockquote><blockquote>', '<br>')
                            .replaceAll(_just.element('blockquote separator'), '</blockquote><blockquote>')
                            .replaceAll('</blockquote><br><blockquote>', '<br>')
                            .replaceAll('<blockquote></blockquote>', '')
                            .replace(/<blockquote>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/g, (match, blockquote) => `<blockquote class="${blockquoteToCSSclass[blockquote]}">`),
                        '<br>'
                    ),
                    '<br>'
                ).replace(/<blockquote>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<br><br><blockquote>/, '<blockquote>$1<blockquote>')
                .replaceAll('</blockquote><br><blockquote>', '<br>')
                .replace(/<br><blockquote><blockquote>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<\/blockquote><\/blockquote>/g, '<blockquote>$1</blockquote>'),
            ),
            charset
        );
        logs += `${l[2]}OUTPUT: ${_just.string.runnerPath(outFilePath('html'))} (${_just.string.fileSize(fs.statSync(outFilePath('html')).size)})`;
    });

    CSS = _just.customCSS.customcss(CSS, customCSS == 'false' ? undefined : customCSS);

    logs += linklogs; logs += buttonlogs;
    logs += `${l[0]}USED NAMES:${l[1]}"${uniqueNames_.join('", "')}"${l[0]}DATA NAMES:${l[1]}"${dataname.join('", "')}"`;
    console.log(logs);
    const websitepath = rootDirA !== '.' ? rootDirA : rootDirB;
    fs.writeFileSync(path.join(websitepath, '_just', `${filename.css}.css`), CSS, template.charset);
    fs.writeFileSync(
        path.join(websitepath, '_just', `${filename.js}.js`),
        JS.replace('\'PUBLICOUTPUT\'', publicOutput).replace('let searchurl = "/_just/search";', `let searchurl = "/_just/${dataname[9]}.json";`),
        template.charset
    );
    const fetchjson = async (protocol) => {
        const response1 = await fetch(`${protocol}://${domain}/_just/`);
        const data1 = await response1.json();
        const response2 = await fetch(`${protocol}://${domain}/_just/${data1.json}.json`);
        const data2 = await response2.json();
        fs.writeFileSync(path.join(websitepath, '_just', `${data1.json}.json`), JSON.stringify(data2));
    }
    if (domain) {
        try {
            fetchjson('http')
        } catch (ee) {
            errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(ee)}`;
            try {
                fetchjson('https')
            } catch (e_e) {
                errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(e_e)}`;
            }
        }
    }
    console.log(errorlogs + configlogs);
    fs.writeFileSync(path.join(websitepath, '_just_data', 'output.txt'), logs + errorlogs + configlogs, template.charset);
    fs.writeFileSync(path.join(websitepath, '_just', `${dataname[9]}.json`), JSON.stringify(mdjson), template.charset);
    fs.writeFileSync(path.join(websitepath, '_just', 'index.json'), JSON.stringify({
        "js": filename.js,
        "css": filename.css,
        "json": dataname[9]
    }), template.charset);
    fs.writeFileSync(path.join(websitepath, '.', '.nojekyll'), '', template.charset);
});
