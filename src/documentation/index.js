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
const [HTMLtemplate, CSStemplate, JStemplate, PATH, repo, owner, customCSS, hljslangs, langs__, CSSHIGHLIGHTtemplate, langstext_, vrsn, CSSBUTTONStemplate, CSSSEARCHtemplate] = process.argv.slice(2);
let HTML = HTMLtemplate;
let CSS = CSStemplate;
let JS = JStemplate;
let CSSHIGHLIGHT = CSSHIGHLIGHTtemplate;
let CSSBUTTONS = CSSBUTTONStemplate;
let CSSSEARCH = CSSSEARCHtemplate;
_just.string = require('../modules/string.js');
/**
 * @param {string} type 
 * @param {string} insert 
 * @returns {string}
 */
_just.element = (type, insert) => `<_just${type ? ` element="${type}"` : ''}>${insert || ''}</_just>`;
_just.error = require('../modules/errmsg.js');
_just.ssapi = require('../modules/ssapi.js');
_just.customCSS = require('./customcss.js');
_just.MDtoHTML = require('./mdtohtml.js');
_just.line = require('../modules/line.js');
const hljs = require('../third-party/highlight.min.js');
const supportedlangs = JSON.parse(hljslangs);
const langaliases = JSON.parse(langs__);
const langstext = JSON.parse(langstext_);
_just.highlight = require('./highlight.js');
_just.number = require('../modules/number.js');
_just.js = require('../modules/js.js');
_just.version = vrsn;
_just.array = require('../modules/array.js');
_just.prevnext = require('./prevnext.js');
const esc = '\x1B';

const link = (text, link_, ext = false, extid = "ext", target = "_blank", title_) => `<a href="${link_}" target="${target}"${ext ? ` id="${extid}"` : ''}${title_ ? ` title="${title_}"` : ''}>${text}</a>`;
const span = (text) => `<span>${text}</span>`;
const template = {
    "charset": "utf-8",
    "title": "Documentation",
    "footer": `Made with ${link('_just', 'https://just.is-a.dev/')}.`,
    "viewport": "width=device-width, initial-scale=1.0",
    "twitter": "summary_large_image",
    "lang": "en",
    "searchkey": "/"
}
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('just.config.json', template.charset));
const docsConfig = config.docs_config;
const debug_ = config.debug || false;
const debuglog = (text) => {if (debug_) console.log(`${_just.error.prefix}${esc}[0;36mDebug: ${text}`)};

const configmbl = docsConfig ? docsConfig.mbl || undefined : undefined;
if (configmbl && (configmbl > 4 || configmbl < 1)) {
    const warningg = `${_just.error.prefix}${esc}[0;33mWarning 0209${esc}[0m: ${esc}[0;33mUnstable config: mbl: ${esc}[0m${configmbl}`;
    console.warn(warningg);
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
JS = _just.js.fuck(JS).replace('\'--hc\'', `'--${dataname[0].slice(0,-1)}'`);

const predataname2 = [];
const dataname2limit = 3843;
for (let i = 1; i <= dataname2limit; i++) {
    predataname2.push(dataname[9] + _just.number.convertbase(i.toString(10), 10, 62, _just.string.shuffleString(_just.number.convertbasedigits.slice(0,-2)) + '+/'));
}
const dataname2 = _just.array.shuffleArray(predataname2);

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
    "firefox": dataname2[0],
    "searchactive": dataname2[9],
    "search": dataname2[1],
    "debug": dataname2[2],
    "error": dataname2[4],
    "small": dataname2[8],
    "next1": dataname2[12],
    "next2": dataname2[13],
    "next": dataname2[14],
    "linkspace": dataname2[15],
    "linkmark": dataname2[16],
    "linkdot": dataname2[17],
}
const cssid = {
    "l": dataname[5]+randomChar(1),
    "d": dataname[5]+randomChar(1),
    "a": dataname[5]+randomChar(1),
    "main": dataname[5]+randomChar(1),
    "ext": dataname[5]+randomChar(1),
    "searchbar": dataname2[3],
    "glass": dataname2[6],
    "search": dataname2[7],
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
    "fr": dataname[6]+randomChar(1),
    "edata": dataname2[5],
    "sdfix": dataname2[10],
    "liheight": dataname2[18],
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
    CSSBUTTONS = CSSBUTTONS.replaceAll(`.${key}`, `.${class_}`);
    CSSSEARCH = CSSSEARCH.replaceAll(`.${key}`, `.${class_}`);
})
Object.entries(cssid).forEach(([key, id_]) => {
    CSS = CSS.replaceAll(`#${key}`, `#${id_}`);
    CSSBUTTONS = CSSBUTTONS.replaceAll(`#${key}`, `#${id_}`);
    CSSSEARCH = CSSSEARCH.replaceAll(`#${key}`, `#${id_}`);
});
Object.entries(cssvar).forEach(([key, var_]) => {
    CSS = CSS.replaceAll(`--${key}`, `--${var_}`);
    CSSBUTTONS = CSSBUTTONS.replaceAll(`--${key}`, `--${var_}`);
    CSSSEARCH = CSSSEARCH.replaceAll(`--${key}`, `--${var_}`);
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
    .replace('<button id="a"', `<button id="${cssid.a}"`)
    .replace('<div class="search"></div>', `<div class="${cssclass.search}"></div>`)
    .replace(' id="searchbar" disabled>', ` id="${cssid.searchbar}" disabled>`)
    .replace('<filter id="glass"', `<filter id="${cssid.glass}"`)
    .replace('<span id="search">', `<span id="${cssid.search}">`)
    .replace('var(--cb)', `var(--${cssvar.cb})`)
    .replace('var(--ct)', `var(--${cssvar.ct})`);
const jstrimmedstrvarbasestr = _just.number.convertbasedigits.replace(/[0-9\/+]/g, '');
const jstrimmedstrvar = _just.number.convertbase(Math.floor(Math.random()*1000).toString(10), 10, jstrimmedstrvarbasestr.length, jstrimmedstrvarbasestr+'0123456789+/')
JS = JS.replaceAll('trimmedStr', jstrimmedstrvar)
    .replace('html > body > main > div#main > article.main', `html > body > main > div#${cssid.main} > article.${cssclass.main}`)
    .replaceAll('\'.main\'', `'.${cssclass.main}'`)
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
    .replaceAll("Id('a')", `Id('${cssid.a}')`)
    .replace("add('firefox')", `add('${cssclass.firefox}')`)
    .replace("querySelector('.search')", `querySelector('.${cssclass.search}')`)
    .replace('.getElementById("searchbar")', `.getElementById("${cssid.searchbar}")`)
    .replace('url("#glass")', `url("#${cssid.glass}")`)
    .replace("add('error')", `add('${cssclass.error}')`)
    .replace("setProperty('--edata'", `setProperty('--${cssvar.edata}'`)
    .replace('getElementById("search")', `getElementById("${cssid.search}")`)
    .replace("setProperty('--sdfix'", `setProperty('--${cssvar.sdfix}'`)
    .replaceAll("('searchactive')", `('${cssclass.searchactive}')`);

const charset = docsConfig ? docsConfig.charset || template.charset : template.charset;

const l = ['\n\n','\n    ','\n        '];
const date = new Date();
let logs = `_just ${_just.version} - ${date} (${date.getTime()})${l[0]}_JUST FILES:${l[1]}CSS: ${filename.css}${l[1]}JS: ${filename.js}`;
let errorlogs = `${l[0]}CAUGHT ERRORS:`;
const nl = l[2].slice(0,-2)+' '.repeat(7);
debuglog(`INFO:${nl}  DNA = DirNameArray${nl}DNA>2 = DirNameArray.length > 2${nl}   DN = DirName${nl}   PL = PageList${nl}   FT = FolderTree${nl}   FL = FolderList${nl}   CL = Code Language${nl}   DF = Dir Found${nl}   FF = File Found${nl}P2URL = PathToURL${nl}  MDF = Markdown Files${nl} PIDs = Pages (Page IDs)${nl}  PID = Page ID`);

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
            title = _just.string.toText(_just.string.Aa(_just.string.removeLast(path.basename(pagePath), ext)), true);
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
        debuglog('  DNA: '+folderNameArray);
        let folderName = folderNameArray.length > 1 ? folderNameArray[folderNameArray.length - 2] : null;
        if (folderNameArray.length > 2) {
            folderName = folderNameArray.slice(0,-1).join('/');
            debuglog('DNA>2: Yes');
        } else {
            debuglog('DNA>2: No');
        };
        debuglog('   DN: '+folderName);
        return { ...page, folder: folderName };
    });
}
const pageList = getPageList();

function generateListItems(PageList) {
    const folderTree = {};
    const folderMap = {};
    const folders_ = [];
    const foldernameify = (fldrname) => _just.string.toText(_just.string.Aa(fldrname), true);
    const pagetitleify = (pagetitle) => pagetitle === 'index' ? 'Home' : pagetitle;

    debuglog('   PL: '+JSON.stringify(PageList));

    PageList.forEach(page => {
        const folder = page.folder || '';
        if (!folderMap[folder]) {
            folderMap[folder] = [];
        }
        folderMap[folder].push(page);
    });

    PageList.forEach(page => {
        const folderPath = page.folder || '';
        const parts = folderPath.split('/').filter(Boolean);
        let currentLevel = folderTree;

        parts.forEach((part, index) => {
            if (!currentLevel[part]) {
                currentLevel[part] = {
                    __pages: [],
                    __subfolders: {}
                };
            }
            if (index === parts.length - 1) {
                currentLevel[part].__pages.push(page);
            }
            currentLevel = currentLevel[part].__subfolders;
            if (!folders_.includes(foldernameify(part))) {
                folders_.push(foldernameify(part));
            }
        });
    });
    debuglog('   FT: '+JSON.stringify(folderTree));
    debuglog('   FL: '+JSON.stringify(folders_));

    function buildFolderHTML(folderObj, rootFolder = false) {
        let html = '';

        const plfiltered = PageList.filter(page => page.folder === null && !folders_.includes(page.title));
        let plitemid = 0;
        const index__ = plfiltered.findIndex(page => page.path === "/");
        if (index__ !== -1) {
            const page__ = plfiltered[index__];
            plfiltered.splice(index__, 1);
            plfiltered.unshift(page__);
        }
        if (rootFolder) plfiltered.forEach(page => {
            plitemid++;
            html += `<li style="--${cssvar.liheight}:19px${plitemid < plfiltered.length ? ';margin-bottom:-20px' : ''}"><a href="${page.path}" target="_self">${span(pagetitleify(page.title))}</a></li>`;
        });
        const plfiltered2= PageList.filter(page => folders_.includes(page.title));
        const plfiltered3= [];
        const plfiltered4= {};
        plfiltered2.forEach(page => {
            plfiltered3.push(page.title);
            plfiltered4[page.title] = page.path;
        });
        for (const folderName in folderObj) {
            const { __pages, __subfolders } = folderObj[folderName];

            const hasPages = __pages.length > 0;
            const hasSubfolders = Object.keys(__subfolders).length > 0;

            const liheight = hasPages ? __pages.length * 15 : 0;
            html += `<li style="--${cssvar.liheight}:${__pages.length * 19 + liheight + 19}px">`;
            if (hasPages || hasSubfolders) {
                const insertLink = plfiltered3.includes(foldernameify(folderName)) && plfiltered4[foldernameify(folderName)];
                html += '<span>';
                html += insertLink ? `<a href="${plfiltered4[foldernameify(folderName)]}" target="_self">` : '';
                html += `<strong>${foldernameify(folderName)}</strong>`;
                html += insertLink ? '</a>' : '';
                html += '</span>';
                html += '<ul>';
                
                __pages.forEach(page => {
                    html += `<li style="--${cssvar.liheight}:19px"><a href="${page.path}" target="_self">${span(pagetitleify(page.title))}</a></li>`;
                });

                html += buildFolderHTML(__subfolders);
                
                html += '</ul>';
            } else {
                __pages.forEach(page => {
                    html += `<li style="--${cssvar.liheight}:19px"><a href="${page.path}" target="_self">${span(pagetitleify(page.title))}</a></li>`;
                });
            }
            html += '</li>';
        }

        return html;
    }

    const pageListJSON = [];
    const folders = Object.keys(folderMap);
    const sortedFolders = folders.sort((a, b) => {
        if (a === '' || a === null) return -1;
        if (b === '' || b === null) return 1;
        return a.localeCompare(b);
    });
    for (const folderName of sortedFolders) {
        const pages = folderMap[folderName];
        pages.forEach(page => {;
            pageListJSON.push([page.path, page.title]);
        });
    }

    return [buildFolderHTML(folderTree, true), pageListJSON];
}


const psl = async () => {
    const responce = await fetch('https://publicsuffix.org/list/public_suffix_list.dat');
    let dat_ = await responce.text();
    dat_ = dat_.replace(/(?<=^|\n)\/\/(.*?)\n/g, '\n').replace(/\n(\n{0,})\n/g, '\n').trim().split('\n').filter(d => !d.startsWith('!'))
    return [dat_.filter(d => (!d.startsWith('*.') && /\./.test(d))), dat_.filter(d => (!d.startsWith('*.') && !/\./.test(d))), dat_.filter(d => d.startsWith('*.'))] // domains, TLDs, *.domains
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
        _just.error.errormessage('0126', `"${inputTLD}" is not a TLD. (${domain})`).then((errmsg)=>{throw new Error(errmsg)});
    }
}
const domainregex = /^(?=.{1,253}$)(?:(?:[_a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.)+[a-zA-Z]{2,63}$/; // regex made by @wdhdev - https://github.com/wdhdev ( commit: https://github.com/is-a-dev/register/commit/6339f26bef0d9dbf56737ffddaca7794cf35bd24#diff-80b3110840a7eedb8cc2c29ead4fe4c98f157738ff3dcf22f05f3094ad6ca9bbR6 )
function checkdomain(input, throwerror) {
    if (input && domainregex.test(input)) {
        return input;
    } else if (!input) {
        return undefined;
    } else if (throwerror) {
        _just.error.errormessage('0122', `"${input}" is not a domain name.`).then((errmsg)=>{throw new Error(errmsg)});
    } else {
        return false;
    }
}
const domain = docsConfig ? checkdomain(docsConfig.domain, true) || undefined : undefined;
const caughterrors = [];
checkTLD(domain).then(tldvalid => {
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
            caughterrors.push(eerr);
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
            if (domain_ && checkdomain(domain_, false)) {
                output = true;
            }
        } catch (eerr) {
            caughterrors.push(eerr);
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
    const MDcode = (input, mode, cde) => {
        const specialChars = cde ? ['*', '~', '.', ':', '^', '|', '[', ']', '(', ')', '\''] : ['*', '_', '#', '-', '=', '~', '.', ':', '^', '|', '<', '>', '[', ']', '(', ')', '\'', '"'];
        specialChars.forEach(char => {
            const code = mode ? '' : `&#${char.charCodeAt(0)};`;
            input = input.replaceAll(char, code);
        });
        return input
            .replace(/(http:\/\/|https:\/\/|data:)/g, (match, protocol_) => `${charCodes(protocol_)}`)
    }
    const linkregex = /(?<=\s|^|[.,!?;:*_^~=])\[(.*?)\]\((.*?)\)(?=\s|[.,!?;:*_^~=]|$)/g;
    let taskid = 0;
    let insertedcode = false;
    const MDtoHTML = (input) => {
        let text = MDescape(input);
        text = text.replace(/```([\w]*)\s*[\r\n]+([\s\S]*?)```/g, (match, lang_, code_) => {
                        const inputlang = lang_;
                        const filter_ = (inpt) => inpt.replace(/\n( {1,})/g, (match, spaces) => {
                            return `\n${'&nbsp;'.repeat(spaces.length)}`;
                        }).replaceAll('\n\n', '\n');
                        const highlightcode = lang_ && lang_ != '';
                        if (highlightcode && !supportedlangs.includes(lang_) && !langaliases[lang_]) {
                            const warningg = `${_just.error.prefix}${esc}[0;33mWarning 0209${esc}[0m: ${esc}[0;33mUnsuppotred language: hljs: ${esc}[0m${lang_}`;
                            errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(warningg)}`;
                            console.warn(warningg);
                        }
                        if (highlightcode && !supportedlangs.includes(lang_) && langaliases[lang_]) {
                            lang_ = langaliases[lang_]
                        }
                        debuglog(`   CL: ${inputlang} => ${lang_}`);
                        const hljshighlight = highlightcode && supportedlangs.includes(lang_)
                        const output_ = hljshighlight ? hljs.highlight(code_, {language: lang_}).value : undefined;
                        insertedcode = true;
                        return `<code class="${cssclass.code}">${
                            hljshighlight ? 
                            `<code>${langstext[lang_]}</code>${
                                filter_(MDcode(
                                    `${lang_ == 'css' ? _just.highlight.css(output_) : output_}`, 
                                    false, 
                                    true
                                ))
                            }` : 
                            filter_(MDcode(code_, false, true))
                        }</code>`;
                    })
                .replace(/(?<=\s|^|[.,!?;:*_^~=])`(.*?)`(?=\s|[.,!?;:*_^~=]|$)/g, (match, code) => {return `<code>${MDcode(code)}</code>`})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])!\[(.*?)\]\((.*?) ("|')(.*?)\3\)(?=\s|[.,!?;:*_^~=]|$)/g, (match, text, link_, q, imgtitle) => {return `<img src="${link_}" alt="${text}" title="${imgtitle}" loading="lazy">`})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])!\[(.*?)\]\((.*?)\)(?=\s|[.,!?;:*_^~=]|$)/g, (match, text, link_) => {return `<img src="${link_}" alt="${text}" loading="lazy">`})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])\[(.*?)\]\((.*?) ("|')(.*?)\3\)(?=\s|[.,!?;:*_^~=]|$)/g, (match, text, link_, q, linktitle) => {return link(text, link_, extlink(link_), cssid.ext, "_blank", linktitle)})
                .replace(linkregex, (match, text, link_) => {return link(text, link_, extlink(link_), cssid.ext)})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])(http:\/\/|https:\/\/|data:)(.*?)(?=\s|[,!;:*^~`<>]|[.?=#%&+] |$)/g, (match, protocol_, link_) => {
                        const link__ = `${protocol_.trim()}${link_.trim()}`;
                        if (protocol_.trim() === 'data:') {
                            return link(link__, link__, true, cssid.ext);
                        } else if (checklink(link__)) {
                            try {
                                const linkurl = new URL(link__);
                                if (linkurl.hostname.includes('xn--')) {
                                    return link(link__, linkurl.href, extlink(linkurl.href), cssid.ext);
                                }
                            } catch (e__) {
                                caughterrors.push(e__);
                                errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(e__)}`;
                            }
                            return `<${link__}>`;
                        } else return `${protocol_}${link_}`;
                    })
                .replace(/(?<=\s|^|[.,!?;:*_^~=])<(http:\/\/|https:\/\/)(.*?)>(?=\s|[.,!?;:*_^~=]|$)/g, (match, protocol_, link_) => {const link__=`${protocol_.trim()}${link_.trim()}`;return link(link__, link__, extlink(link__), cssid.ext)})
                .replace(/(?<=\s|^|[.,!?;:*_^~=])<(.*?)@(.*?)>(?=\s|[.,!?;:*_^~=]|$)/g, (match, address, domain__) => {
                        if (checkdomain(domain__, false)) {
                            const mail = `${address.trim()}@${domain__.trim()}`;
                            return `<a href="mailto:${mail}">${mail}</a>`;
                        } else return `<${address}@${domain__}>`;
                    })
                .replace(/(?<=\s|^)([-+*])\s\[( {0,}x {0,}| {0,}X {0,}| {1,})\]\s(.*?)(?=\s|\n|$)/g, (match, prefix, type_, text_) => {
                    const isChecked = type_.trim().toLowerCase() === 'x';
                    const checkedAttr = isChecked ? ' checked' : '';
                    return `<input type="checkbox" id="${dataname[10]}${taskid++}" ${checkedAttr} title="${MDcode(text_.trim(), true)}"> ${text_.trim()}`;
                });
        return _just.MDtoHTML.MDtoHTML(text, cssclass).replace(/~(.*?)~/g, '<sub>$1</sub>').replace(/\^(.*?)\^/g, '<sup>$1</sup>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    const dividerRegex = /(\n\s*[*_-]{3,}\s*\n)+/g;
    function hbuoclpMDtoHTML(text, maxBlockquoteLevel = mbl) {
        for (let i = 6; i >= 1; i--) {
            const regex = new RegExp(`^#{${i}}\\s+(.*?)\\s*$`, 'gm');
            text = text.replace(regex, MDtoHTML(`<h${i}>$1</h${i}>`));
        }
        const smlregex = new RegExp(`^-#\\s+(.*?)\\s*$`, 'gm');
        text = text.replace(smlregex, MDtoHTML(`<span class="${cssclass.small}">$1</span>`)) 
        /*alternate headers currently disabled. they cause some bugs*///text = text.replace(/(?<=\s|^)(.*?)\n={3,}(?=\s|\n|$)/, MDtoHTML(`${_just.element(dataname[5])}<h1>$1</h1>`)).replace(/(?<=\s|^)(.*?)\n-{3,}(?=\s|\n|$)/, MDtoHTML(`${_just.element(dataname[6])}<h2>$1</h2>`));

        function processBlockquotes(inputText, level) {
            const regex = new RegExp(`^(>\\s+){${level}}(.*?)\\s*$`, 'gm');
            return MDtoHTML(inputText.replace(regex, (match, p1, p2) => {
                const classAttr = (num) =>
                    p2.startsWith('[!NOTE]') ? (num ? 7 : ` class="${cssclass.note}"`) :
                    p2.startsWith('[!TIP]') ? (num ? 6 : ` class="${cssclass.ntip}"`) :
                    p2.startsWith('[!IMPORTANT]') ? (num ? 12 : ` class="${cssclass.impr}"`) :
                    p2.startsWith('[!WARNING]') ? (num ? 10 : ` class="${cssclass.warn}"`) :
                    p2.startsWith('[!CAUTION]') ? (num ? 10 : ` class="${cssclass.caut}"`) :
                    num ? 0 : '';
                const innerBlockquote = processBlockquotes(
                    p2.trim().slice(classAttr(true)).trim(), 
                    level + 1
                );
                return `<blockquote${classAttr()}>${(level > 1 ? '<br>' : '')}${innerBlockquote}</blockquote>`;
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

    const usePathInput = config.usePathInput ? config.usePathInput : true;
    function findMarkdownFiles(dir) {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            file = path.join(dir, file);
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(findMarkdownFiles(file));
                debuglog('   DF: '+_just.string.runnerPath(file));
            } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
                results.push(file);
                debuglog('   FF: '+_just.string.runnerPath(file));
            }
        });
        return usePathInput ? results.filter(f => pathtourl[f] || pathtourl[f] == '') : results;
    }

    const rootDirB = process.cwd();
    const markdownFiles = findMarkdownFiles(rootDirB);
    debuglog('P2URL: '+JSON.stringify(pathtourl));
    debuglog('  MDF: '+JSON.stringify(markdownFiles));

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
    const publicOutput = config.publicOutput || false;
    const hideOutput = config.hideOutput || false;
    const noWebarchive = config.noWebarchive ? config.noWebarchive : true;
    const searchkey = docsConfig ? docsConfig.searchKey || template.searchkey : template.searchkey;
    JS = JS.replace("&&'REPLACE_NOWEBARCHIVE'", `&&${noWebarchive}`).replace("'REPLACE_DATAARRAY'", dataname2[11]).replace('REPLACE_SEARCHKEY', searchkey);
    HTML = HTML.replace('REPLACE_SEARCHKEY', searchkey);

    const links = docsConfig ? docsConfig.links || [] : [];
    const buttons = docsConfig ? docsConfig.buttons || [] : [];

    const insertHTMLinHead = docsConfig ? docsConfig.insertInHTMLHead || '' : '';

    const docsUsePathInput = docsConfig ? docsConfig.usePathInput || false : false;

    const keywords = metaKeywords ? `<meta name="keywords" content="${metaKeywords}">` : '';
    const desc = description ? `<meta name="description" content="${description}">` : '';
    const ogdesc = ogdescription ? `<meta property="og:description" content="${ogdescription}">` : '';
    const ogtitl = ogtitle ? `<meta property="og:title" content="${ogtitle}">` : '';
    const logo = logoPath ? `<img src="${logoPath}" width="35px" height="auto" alt="Logo">` : '';
    const name = docsConfig && docsConfig.title ? span(title) : logoPath ? '' : span(title);
    const htmlLang = lang ? ` lang="${`${lang}`.toLowerCase()}"` : '';
    const htmlhead = (filelink = undefined) => {
        const start = filelink == "" ? '' : '/';
        let prefetch = '';
        debuglog(` PIDs: ${pageList.length + 1}`);
        for (let i = 0; i <= pageList.length; i++) {
            prefetch += pageList[i] && pageList[i].path && ((filelink && pageList[i].path != filelink) || !filelink) ? `<link rel="prefetch" href="${pageList[i].path.endsWith('/') ? pageList[i].path + 'index' : pageList[i].path}.html">` : '';
            debuglog(`  PID: ${i}`);
        }
        let output = `
        ${keywords}
        ${desc}
        ${ogtitl}
        ${ogdesc}
        ${prefetch}
        <link rel="preload" href="${start}_just/${dataname[9]}.json" as="fetch" type="application/json" crossorigin="anonymous">
        <meta property="og:type" content="website">`;
        if (twitter) {
            output += `<meta property="twitter:card" content="${twitter}">`
        }
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
        return output;
    }

    const configlogs = `${l[0]}DOMAIN: ${domain}${l[0]}CONFIG TO HTML:${l[1]}DOCSCONFIG:${l[2]}TITLE: ${title}${l[2]}TITLE (HTML): ${name}${l[2]}METATITLE: ${metatitle}${l[2]}OGTITLE: ${ogtitle}${l[2]}OGTITLE (HTML): ${ogtitl}${l[2]}DESCRIPTION: ${description}${l[2]}DESCRIPTION (HTML): ${desc}${l[2]}OGDESCRIPTION: ${ogdescription}${l[2]}OGDESCRIPTION (HTML): ${ogdesc}${l[2]}VIEWPORT: ${viewport}${l[2]}TWITTER CARD: ${twitter}${l[2]}KEYWORDS: ${metaKeywords}${l[2]}KEYWORDS (HTML): ${keywords}${l[2]}LANG: ${lang}${l[2]}LANG (HTML): ${htmlLang}${l[2]}GOOGLE ANALYTICS: ${googleAnalytics}${l[2]}GOOGLE SITE VERIFICATION: ${googleVerification}${l[2]}YANDEX SITE VERIFICATION: ${yandexVerification}${l[2]}LOGO: ${logoPath}${l[2]}LOGO (HTML): ${logo}${l[2]}FOOTER: ${footer}${l[2]}HTML: ${htmlhead().replaceAll('\n', '').trim().replace(/ {2,}/g, ' ')}`

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
    let uniqueNames_= [dataname[0].slice(0,-1), jstrimmedstrvar];
    uniqueNames[dataname[0].slice(0,-1)] = 1;
    uniqueNames[jstrimmedstrvar] = 1;
    for (i = 0; i <= dataname.length; i++) {
        uniqueNames[dataname[i]] = 1;
        uniqueNames_.push(dataname[i]);
    }
    for (let i = 1; i <= dataname2limit; i++) {
        uniqueNames[dataname2[i-1]] = 1;
        uniqueNames_.push(dataname2[i-1]);
    }
    for (i = 0; i <= taskid; i++) {
        uniqueNames[`${dataname[10]}${i}`] = 1;
        uniqueNames_.push(`${dataname[10]}${i}`);
    }
    uniqueNames[`${dataname[10]}`] = taskid + 1;
    for (i = 0; i <= CSSHIGHLIGHTtemplate.length; i++) {
        uniqueNames[`${dataname[8]}${i}`] = 1;
        uniqueNames[`${dataname[8]}`] = i;
        uniqueNames_.push(`${dataname[8]}${i}`);
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
            output += type == 0 ? `<a${linkdata[1] ? ` href="${linkdata[1]}"` : ''}${linkdata[1] ? ` target="${linkdata[2] ? linkdata[2] : ext ? '_blank' : '_self'}"` : ''}${ext ? ` id="${cssid.ext}"` : ''}>${filterText(linkdata[0])}</a>` : type == 1 ? `<button id="${dataname[0]}${bid}" type="button" title="${MDcode(filterText(linkdata[0]), false)}">${filterText(linkdata[0])}</button>` : '';
            JS = pageid == 1 && type == 1 && linkdata[1] && htmlnavrunid <= 1 ? _just.string.removeLast(JS, '});') + `\ndocument.getElementById('${dataname[0]}${bid}').addEventListener("click",()=>{const link=document.createElement('a');link.href='${linkdata[1]}';link.target='${linkdata[2] ? linkdata[2] : ext ? '_blank' : '_self'}';link.classList.add('${dataname[0]}${bid}');document.body.appendChild(link);link.click();document.body.removeChild(link);});` + '\n});' : JS;
            addcss += pageid == 1 && type == 1 && linkdata[1] ? `.${dataname[0]}${bid},` : '';
            if (type == 1 && linkdata[1] && htmlnavrunid <= 1) {
                uniqueNames[`${dataname[0]}${bid}`] = 1;
                uniqueNames_.push(`${dataname[0]}${bid}`);
            }
            bid++;
        }
        CSS += addcss != '' && htmlnavrunid <= 1 ? `\n${_just.string.removeLast(addcss, ',')}{display:none}` : '';
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
            .replaceAll('>', charCodes('>'))
            .replaceAll('<', charCodes('<'))
            .replaceAll('-# ','')
            .replaceAll('~', '')
            .replaceAll('=', charCodes('='))
            .replaceAll('^', charCodes('^'))
        for (let i = 6; i >= 1; i--) {
            input = input.replace(new RegExp(`^#{${i}}\\s+(.*?)\\s*$`, 'gm'), '$1')
        }
        return input
            .replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/g, '$1:')
            .replace(linkregex, '$1');
    }
    function getlangs() {
        let outputt = '';
        supportedlangs.forEach(lang => {
            outputt += `${lang}|`;
        });
        return _just.string.removeLast(outputt, '|');
    }
    const htmlfiles = {};
    const mdlogs = {};
    markdownFiles.forEach(file => {
        let content = fs.readFileSync(file, charset);
        if (getTitleFromMd(file)) {
            content = content.split('\n').slice(1).join('\n');
        }
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        const outFilePath = (ext) => path.join(path.dirname(file), `${fileNameWithoutExt}.${ext}`);
        fileID++;
        mdlogs[outFilePath('html')] = `${l[1]}FILE #${fileID} "${_just.string.runnerPath(file)}":${l[2]}INPUT: ${_just.string.fileSize(fs.statSync(file).size)}`;

        if (pathtourl[file] || pathtourl[file] == '') {
            mdjson[pathtourl[file]] = toText(content);
        }

        const headers = [];
        let toHTML = hbuoclpMDtoHTML(
            addEnd(content, '\n')
                .replace(/> (.*?)\n\n> (.*?)\n/g, `> $1\n\n> ${_just.element(dataname[7])}$2\n`)
                .replaceAll('\n>\n> ', '\n> ')
                .replace(new RegExp(`(?<=^|\n)([>|> ]{2,${mbl}}) `, 'g'), (match, bqs) => `\n${bqs.replaceAll(' ', '').split('').join(' ').trim()} `)
        ).replace(/<(h1|h2|h3|h4)>(.*?)<\/\1>/g, (match, p1, p2) => {
            return `<${p1} id="${uniqueName(encodeURIComponent(p2))}">${p2}</${p1}>`;
        }).replace(/<(h1|h2|h3|h4) id="([^"]+)">(.*?)<\/\1>/g, (match, p1, p2, p3) => {headers.push(p2);return`<${p1} id="${p2}">${p3}</${p1}>`});

        const H1 = [...toHTML.matchAll(/<(h1|h2) id="([^"]+)">(.*?)<\/\1>/g)];
        const HT = [...toHTML.matchAll(/<(h3|h4) id="([^"]+)">(.*?)<\/\1>/g)];

        const h1 = H1.map(match => [match[3], match[2]]);
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
                                    ${span(_just.string.toText(headerdata[0]))}
                                </a>
                            </li>`;
        }

        const idk_ = toHTML.endsWith('</p>');
        const prevnext = _just.prevnext.get(idk_ ? _just.string.removeLast(toHTML, '</p>') : toHTML);
        toHTML = idk_ ? prevnext[0].replace(_just.prevnext.regex, '') + '</p>' : prevnext[0].replace(_just.prevnext.regex, '');
        let pagejs = '';
        const btnjs = (id, href) => `document.getElementById('${id}').addEventListener("click",()=>{const ${id.replace('-','_')}=document.createElement('a');${id.replace('-','_')}.href='/${href}';${id.replace('-','_')}.target='_self';${id.replace('-','_')}.style.display='none';document.body.appendChild(${id.replace('-','_')});${id.replace('-','_')}.click();document.body.removeChild(${id.replace('-','_')})});`;
        if (prevnext[1].prev) {
            pagejs = btnjs(filename.js, prevnext[1].prev)
        }
        if (prevnext[1].next) {
            pagejs += btnjs(filename.css, prevnext[1].next)
        }

        const pages = generateListItems(addFolderToPageList(pageList).sort((a, b) => a.title.localeCompare(b.title)));
        const start = pathtourl[file] == "" ? '' : '/';
        let outHTML = HTML
            .replace('<html>', `<html${htmlLang}>`)
            .replaceAll('="/_just/', `="${start}_just/`)
            .replace("content: '_just';", `content: '_just ${_just.version}';`)
            .replace('REPLACE_SCRIPT', `const ${dataname2[11]}=${JSON.stringify(pages[1])};${pagejs ? `document.addEventListener('DOMContentLoaded',()=>{${pagejs}});` : ''}`)
            .replaceAll('REPLACE_CSS', filename.css)
            .replaceAll('REPLACE_JS', filename.js)
            .replace('REPLACE_CHARSET', charset)
            .replace('REPLACE_VIEWPORT', viewport)
            .replace('REPLACE_TITLE', metatitle)
            .replace('REPLACE_DATA', htmlhead(pathtourl[file]))
            .replace('REPLACE_CUSTOM', insertHTMLinHead)
            .replace('REPLACE_LOGO', logo)
            .replace('REPLACE_NAME', filterText(name))
            .replace('REPLACE_PAGES', filterText(pages[0]))
            .replace('REPLACE_CONTENTS', filterText(pageHeaders))
            .replace('REPLACE_FOOTER', docsConfig && docsConfig.footer ? span(filterText(footer)) : '')
            .replace('REPLACE_LINKS', htmlnav())
            .replace('REPLACE_BUTTONS', htmlnav(1));

        fs.writeFileSync(outFilePath('txt'), toHTML, charset);
        htmlfiles[outFilePath('html')] = outHTML.replace('REPLACE_PREVNEXT', _just.prevnext.html(prevnext[1], cssclass.next, cssclass.next1, cssclass.next2, filename.js, filename.css, pages[1])).replace(
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
                            .replaceAll(_just.element(dataname[7]), '</blockquote><blockquote>')
                            .replaceAll('</blockquote><br><blockquote>', '<br>')
                            .replaceAll('<blockquote></blockquote>', '')
                            .replace(/<blockquote>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/g, (match, blockquote) => `<blockquote class="${blockquoteToCSSclass[blockquote]}">`),
                        '<br>'
                    ),
                    '<br>'
                ).replace(/<blockquote>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<br><br><blockquote>/, '<blockquote>$1<blockquote>')
                .replaceAll('</blockquote><br><blockquote>', '<br>')
                .replace(/<br><blockquote><blockquote>((?:(?!<h[1-6][^>]*>.*?<\/h[1-6]>).)*?)<\/blockquote><\/blockquote>/g, '<blockquote>$1</blockquote>')
                //.replaceAll(`${_just.element(dataname[5])}<h1 id=`, `<h1 class="${dataname[5]}" id=`)
                //.replaceAll(`${_just.element(dataname[6])}<h2 id=`, `<h2 class="${dataname[6]}" id=`)
                .replace(new RegExp(`(?<=<code class="${cssclass.code}"><code>(${getlangs()})</code>)(.*?)(?=</code>)`, 'g'), (match, lng, cde) => cde.replace(/<br><br>/g, '<br>')),
            )
    });

    const CSSdata = _just.customCSS.customcss(CSS, customCSS == 'false' ? undefined : customCSS, CSSHIGHLIGHT, insertedcode, CSSBUTTONS, CSSSEARCH);
    CSS = CSSdata[0];
    for (const [pathh, htmlcontent] of Object.entries(htmlfiles)) {
        const updated = _just.customCSS.highlightclasses(CSSHIGHLIGHTtemplate, CSS, htmlcontent, dataname[8]);
        CSS = updated[0];
        const fixlinkregex = (char) => new RegExp(`<a href="(.*?)" target="_blank" id="${cssid.ext}"(.*?)>(.*?)</a>${char}`, 'g');
        let htmloutput = updated[1]
            .replace(fixlinkregex(' '), (match, href_, title_, text_) => `<a href="${href_}" target="_blank" id="${cssid.ext}"${title_} class="${cssclass.linkspace}">${text_}</a>`)
            .replace(fixlinkregex('(.|,|_)'), (match, href_, title_, text_, char_) => `<a href="${href_}" target="_blank" id="${cssid.ext}"${title_} class="${cssclass.linkdot}">${text_}</a>${char_}`)
            .replace(fixlinkregex('( {1,}.)'), (match, href_, title_, text_) => `<a href="${href_}" target="_blank" id="${cssid.ext}"${title_} class="${cssclass.linkdot}">${text_}</a>.`)
            .replace(fixlinkregex('( {1,},)'), (match, href_, title_, text_) => `<a href="${href_}" target="_blank" id="${cssid.ext}"${title_} class="${cssclass.linkdot}">${text_}</a>,`);
        const charss=["!", "?", ":", ";", "#", "$", "%", "^", "&", "*", "\\(", "\\)", "-", "=", "+", '"', "'", '`', "\\[", "\\]", "\\{", "\\}", "\\\\", "\\|", "/", "~", "@", "№"];
        charss.forEach(charrr => {
            htmloutput = htmloutput
                .replace(fixlinkregex(charrr), (match, href_, title_, text_) => `<a href="${href_}" target="_blank" id="${cssid.ext}"${title_} class="${cssclass.linkmark}">${text_}</a>${charrr == "\\\\" ? '\\' : charrr.replaceAll('\\', '')}`);
        });
        fs.writeFileSync(
            pathh, 
            htmloutput.replace(/<a href="(.*?)" target="_blank" id="(.*?)"(.*?)>(.*?)<\/a>\+\*\?/g, (match, hreff, idd, titleclass, textt) => {
                if (idd == cssid.ext) {
                    return `<a href="${hreff}" target="_blank" id="${idd}"${titleclass}>${textt}</a>`;
                } else {
                    return `<a href="${hreff}" target="_blank" id="${idd}"${titleclass}>${textt}</a>+*?`;
                }
            }).replace(/(?<=<code>)(.*?)(?=<\/code>)/g, (match, cde) => cde.replace(/&&#35;(.*?);/g, (match, num_) => {
                    if (/\d/.test(num_)) {
                        return `&#${num_};`;
                    } else {
                        return `&&#35;${num_};`;
                    }
                })), 
            charset
        );
        const outputlogs = `OUTPUT: ${_just.string.runnerPath(pathh)} (${_just.string.fileSize(fs.statSync(pathh).size)})`;
        logs += mdlogs[pathh] ? `${mdlogs[pathh]}${l[2]}${outputlogs}` : `${l[1]}ERROR:${l[2]}MESSAGE: NO LOGS FOUND FOR FILE ${_just.string.runnerPath(pathh)}${l[2]}FILE ${outputlogs}`;
    }
    CSS = CSS.replace(new RegExp(`.${dataname[8]}3ibute`, 'g'), `.${dataname[8]}14`).replace("content: '_just';", `content: '_just ${_just.version}';`);
    
    const websitepath = rootDirA !== '.' ? rootDirA : rootDirB;
    const _justdir = docsUsePathInput ? `${PATH}/_just`: '_just';
    const _just_datadir = docsUsePathInput ? `${PATH}/_just_data`: '_just_data';
    if(docsUsePathInput && !fs.existsSync(path.join(websitepath, PATH))) {
        new Promise ((resolve, reject) => {
            fs.mkdirSync(path.join(websitepath, PATH));
            resolve();
        }).catch();
    }
    new Promise ((resolve, reject) => {
        if (!fs.existsSync(path.join(websitepath, _justdir))) {fs.mkdirSync(path.join(websitepath, _justdir))};
        if (!fs.existsSync(path.join(websitepath, _just_datadir))) {fs.mkdirSync(path.join(websitepath, _just_datadir))};
        resolve();
    }).catch();

    logs += linklogs; logs += buttonlogs;
    logs += `${l[0]}USED NAMES:${l[1]}"${uniqueNames_.join('", "')}"${l[0]}DATA NAMES:${l[1]}"${dataname.join('", "')}"${l[0]}OTHER:${l[1]}JSTRIMMEDVAR:${l[2]}NAME: ${jstrimmedstrvar == null ? '(FAILED. WILL BE REPLACED WITH ID)' : `"${jstrimmedstrvar}"`}${l[2]}CUSTOM BASE: ${jstrimmedstrvarbasestr.length}${l[2]}CUSTOM BASE STRING: "${jstrimmedstrvarbasestr}"`;
    console.log(logs);
    fs.writeFileSync(path.join(websitepath, _justdir, `${filename.css}.css`), CSS, template.charset);

    const JSdata = _just.js.get(JS);
    const JSerr = `document.body.classList.add('${cssclass.error}');document.documentElement.style.setProperty('--${cssvar.edata}', \`'\${e_} (0300)'\`)`;
    fs.writeFileSync(
        path.join(websitepath, _justdir, `${filename.js}.js`),
        "try{"+_just.js.set(
            JS.replace('\'REPLACE_PUBLICOUTPUT\'', hideOutput?false:publicOutput?false:true).replace('\'REPLACE_SEARCHV2\'', CSSdata[1] || false).replace('let searchurl = "/_just/search";', `let searchurl="/_just/${dataname[9]}.json";`), 
            JSdata.names.filter(n => n !== jstrimmedstrvar), 
            dataname2.reverse().slice(0, JSdata.total-1),
            jstrimmedstrvarbasestr
        ).replace("/^[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$/.test(null)", `/^[!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~]+$/.test(${jstrimmedstrvar})`)+`}catch(e_){document.addEventListener('DOMContentLoaded',()=>{${JSerr}});${JSerr}}`,
        template.charset
    );


    const fetchjson = async (protocol) => {
        const response1 = await fetch(`${protocol}://${domain}/_just/`).catch() || undefined;
        const data1 = response1 ? await response1.json() || undefined : undefined;
        const response2 = await fetch(`${protocol}://${domain}/_just/${data1.json}.json`).catch() || undefined;
        const data2 = response2 ? await response2.json() || undefined : undefined;
        if (data1 && data2) fs.writeFileSync(path.join(websitepath, _justdir, `${data1.json}.json`), JSON.stringify(data2));
    }
    if (domain) {
        fetchjson('http').catch((ee)=>{
            caughterrors.push(ee);
            errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(ee)}`;
            fetchjson('https').catch((e_e)=>{
                caughterrors.push(e_e);
                errorlogs += `${l[1]}AT LINE ${_just.line.line() || '-1'} (__REPLACE_LINE__): ${_just.line.err(ee)}`;
            });
        })
    }
    if (debug_) console.log(errorlogs + configlogs);
    const outlogs = hideOutput?'':logs+errorlogs+configlogs;
    if (debug_) fs.writeFileSync(path.join(websitepath, _just_datadir, 'output.txt'), outlogs, template.charset);
    fs.writeFileSync(path.join(websitepath, _justdir, `${dataname[9]}.json`), JSON.stringify(mdjson), template.charset);
    fs.writeFileSync(path.join(websitepath, _justdir, 'index.json'), JSON.stringify({
        "js": filename.js,
        "css": filename.css,
        "json": dataname[9]
    }), template.charset);
    fs.writeFileSync(path.join(websitepath, '.', '.nojekyll'), '', template.charset);
}, tldinvalid => {});
