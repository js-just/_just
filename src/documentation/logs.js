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
const [PATH] = process.argv.slice(2);
_just.string = require('../modules/string.js');

const charset = "utf-8";
const fs = require('fs');
const path = require('path');
const rootDirA = PATH || '.';
const rootDirB = process.cwd();
const logs = fs.readFileSync(path.join(rootDirA !== '.' ? rootDirA : rootDirB, '_just_data', 'output.txt'), charset);
let logsstr = logs;
const l = ['\n\n','\n    ','\n        '];
logsstr += l[0];
let newlogs = `COMPRESSED:`;

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
let fileID = 0;
findMarkdownFiles(rootDirB).forEach(file => {
    fileID++;
    newlogs += `${l[1]}FILE #${fileID} "${_just.string.removeLast(_just.string.runnerPath(file), 'md')}html":`;
    try {
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        const outFilePath = (ext) => path.join(path.dirname(file), `${fileNameWithoutExt}.${ext}`);
        const htmlsize = _just.string.fileSize(fs.statSync(outFilePath('html')).size);
        newlogs += `${l[2]}SIZE: ${htmlsize} (html output)`;
    } catch (err) {
        newlogs += `${l[2]}ERROR: ${err}`;
    }
    let sl = false;
    let fd = false;
    try {
        fs.unlink(file, function(err) {
            newlogs += err ? `${l[2]}MARKDOWN FILE DELETED: NO. (${err}) (fs)` : newlogs += `${l[2]}MARKDOWN FILE DELETED: YES.`;
            sl = true;
            fd = true;
        })
    } catch (err) {
        newlogs += sl ? '' : `${l[2]}MARKDOWN FILE DELETED: NO. (${err}) (tc)`; // tc here means try{}catch(){}
        fd = true;
    }
});

console.log(newlogs);
logsstr += newlogs;
fs.writeFileSync(path.join(rootDirA !== '.' ? rootDirA : rootDirB, '_just_data', 'output.txt'), logsstr, charset);