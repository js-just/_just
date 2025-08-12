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

const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('just.config.json', 'utf8'));
const errmsg = require('../modules/errmsg.js');
const [v] = process.argv.slice(2);
console.log(v);

const watermarkify = config.watermark ? config.watermark === true ? true : false : false;
const throwerror = (a,b) => {
    console.log('::error::'+a+': '+b);
    errmsg.errormessage(a, b).then((e)=>{throw new Error('::error::'+e)});
}

if (config.watermark && typeof(config.watermark) !== 'boolean') {
    throwerror('', `Invalid property type: watermark should be boolean.`);
}
if (v != '24' && v != '26' && v != '32' && v != '') {
    throwerror('', `Invalid input value: postprocessor-version should be one of: "24", "26", "32".`);
}

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath));
        } else if (path.extname(file) === '.html') {
            results.push(filePath);
        }
    });
    return results;
}
const files = getFiles('.');

function fixHtmlString(str) {
    const commentStart1 = "<!-- This website uses _just postprocessor /-->";
    const commentStart2 = "<!-- Learn more here:(WEBSITE COMING SOON) /-->";

    str = String(str);

    function notag(tag) {
        const index = [str.lastIndexOf(tag)];
        if (index[0] === -1) return;
        index.push(index[0] + tag.length);
        str = `${str.slice(0,index[0])}${str.slice(index[1])}`;
    }
    function notags() {
        notag('</body>');
        notag('</html>');
    }
    notags();
    if (v != '24') {
        notags();
    }

    function replaceLastOccurrence(text, searchStr, replaceStr) {
        const lastIndex = text.lastIndexOf(searchStr);
        if (lastIndex === -1) return text;
        return (
            text.slice(0, lastIndex) +
            replaceStr +
            text.slice(lastIndex + searchStr.length)
        );
    }

    str = replaceLastOccurrence(str, commentStart1, watermarkify ? "<!--   This website uses Just an Ultimate Site Tool   /-->" : '');
    str = replaceLastOccurrence(str, commentStart2, watermarkify ? "<!--   Learn more here:      https://just.is-a.dev/   /-->" : '');

    function extractPaths(htmlString) {
        const scriptRegex = /<script\s+[^>]*src=["'](?:\/_just|_just)\/([^"']+)["'][^>]*><\/script>/gi;
        const linkRegex = /<link\s+[^>]*href=["'](?:\/_just|_just)\/([^"']+)["'][^>]*\s+rel=["']stylesheet["'][^>]*>/gi;

        const matches = [];

        let match;

        while ((match = scriptRegex.exec(htmlString)) !== null) {
            matches.push([0,match[1]]);
        }

        while ((match = linkRegex.exec(htmlString)) !== null) {
            matches.push([1,match[1]]);
        }

        return matches;
    }
    let preload = '';
    extractPaths(str).forEach(urlpath => {
        preload += `<link rel="preload" href="/_just/${urlpath[1]}" as="${urlpath[0] === 0 ? 'script' : 'style'}">`;
    });

    return `${str.replace('<head>', `<head>${preload}`)}</html></body>`;
    }

files.forEach(file => {
    let content = fs.readFileSync(file);
    fs.writeFileSync(file, fixHtmlString(content), 'utf8');
});

console.log('\x1B[2;45m\x1B[1;30m_just\x1B[0m:\x1B[0;36m INFO:\x1B[0m\x1B[0;32m Postprocessing completed\x1B[0m')
