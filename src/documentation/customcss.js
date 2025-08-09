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

const baseregex = /(@_just base)/g;
const baseregex2= /(@_just base;)/g;
const coderegex = /(@_just highlight)/g;
const coderegex2= /(@_just highlight;)/g;
const btnsregex = /(@_just buttons)/g;
const btnsregex2= /(@_just buttons;)/g;
const srchregex = /(@_just search)/g;
const srchregex2= /(@_just search;)/g;
const classRegex= /\.([a-zA-Z0-9_-]+)/g;
/**
 * @param {string} CSS 
 * @param {string?} CUSTOM
 * @param {string} CODE 
 * @param {boolean?} USECODE
 * @param {string} CSSBUTTONS
 * @param {string} CSSSEARCH
 * @returns {[string, boolean]}
 */
exports.customcss = function (CSS, CUSTOM, CODE, USECODE = true, CSSBUTTONS, CSSSEARCH) {
    const addcss = CSSBUTTONS + CSSSEARCH;
    if (!CUSTOM) {
        return [
            USECODE ? CSS + CODE + addcss : CSS + addcss,
            true,
        ];
    }
    let usedcsssearch = false;
    if (CUSTOM.replace(srchregex, CSSSEARCH).replace(srchregex2, CSSSEARCH) != CUSTOM) {
        usedcsssearch = true;
    }
    const custom = CUSTOM
        .replace(baseregex2,CSS)
        .replace(baseregex, CSS)
        .replace(coderegex2, USECODE ? CODE : '')
        .replace(coderegex, USECODE ? CODE : '')
        .replace(btnsregex, CSSBUTTONS)
        .replace(btnsregex2, CSSBUTTONS)
        .replace(srchregex, CSSSEARCH)
        .replace(srchregex2, CSSSEARCH);
    return [custom, usedcsssearch];
}

const savedclasses = {};
let language_class;
let prompt_class;
let function_class;
let classid = 0;
/**
 * @param {string} TEMPLATE 
 * @param {string} CSS 
 * @param {string} HTML 
 * @param {string} DATANAME8 
 * @returns {string[]}
 */
exports.highlightclasses = function (TEMPLATE, CSS, HTML, DATANAME8) {
    const classes = [];
    let match;
    while ((match = classRegex.exec(TEMPLATE)) !== null) {
        classes.push(match[1]);
    }
    const uniqueClasses = Array.from(new Set(classes.sort((a,b) => a.length - b.length))).filter(c => !savedclasses[c]).sort((a,b) => a.length - b.length);
    uniqueClasses.forEach(class_ => {
        savedclasses[class_] = `${DATANAME8}${classid++}`;
        if (class_ == "language_") {language_class = savedclasses[class_]}
        else if (class_ == "prompt_") {prompt_class= savedclasses[class_]}
        else if (class_=="function_"){function_class=savedclasses[class_]}
    });
    for (const [class_, hlclass] of Object.entries(savedclasses)) {
        CSS = CSS.replace(new RegExp(`.${class_}(?= |.|,)`, 'g'), `.${hlclass}`);
        const regex = new RegExp(
            `<([a-zA-Z0-9]+)([^>]*)\\sclass="([^"]*\\b${class_}\\b[^"]*)"([^>]*)>([\\s\\S]*?)</\\1>`,
            'gm'
        );
        HTML = HTML.replace(regex, (match, tagName, beforeClassAttrs, classAttrValue, afterClassAttrs, innerContent) => {
            const classes_ = classAttrValue.split(' ');
            if (!classes_.includes(hlclass)) {
                classes_.push(hlclass);
            }
            const newClassAttr = classes_.join(' ');
            return `<${tagName}${beforeClassAttrs} class="${newClassAttr.replace(/(?<=\s|^| )hljs(.*?) (?=|$)/, '').replace("language_", language_class).replace("prompt_", prompt_class).replace("function_", function_class).replace(/(.*?) \1/, '$1')}"${afterClassAttrs}>${innerContent}</${tagName}>`;
        });
        //HTML = HTML.replace(new RegExp(`<(.*?) class="(.*?)${class_}(.*?)">(.*?)</\\1>`, 'gm'), `<$1 class="$2${hlclass}$3">$4</$1>`);
    }
    return [CSS, HTML];
}
