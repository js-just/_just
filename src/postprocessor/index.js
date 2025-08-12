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

const watermarkify = config.watermark ? config.watermark === true ? true : false : false;

if (config.watermark && typeof(config.watermark) !== 'boolean') {
    errmsg.errormessage('', `Invalid property type: watermark should be boolean.`).then((e)=>{throw new Error(e)});
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
  const closingTag = "</body></html>";
  const commentStart1 = "<!-- This website uses _just postprocessor /-->";
  const commentStart2 = "<!-- Learn more here:(WEBSITE COMING SOON) /-->";

  str = String(str);
  const occurrences = str.match(new RegExp(closingTag, 'g')) || [];

  if (occurrences.length > 1) {
    let countToRemove = 2;
    let index = str.length;

    while (countToRemove > 0) {
      index = str.lastIndexOf(closingTag, index - 1);
      if (index === -1) break;
      str = str.slice(0, index) + str.slice(index + closingTag.length);
      countToRemove--;
    }
    str += closingTag;
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

  return str;
}

files.forEach(file => {
    let content = fs.readFileSync(file);
    fs.writeFileSync(file, fixHtmlString(content), 'utf8');
});
