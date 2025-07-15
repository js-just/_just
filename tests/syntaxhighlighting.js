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

function findFiles(dir) {
    let output = '# test\n';
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            output += findFiles(file);
            console.log('Dir:  '+file);
        } else if (/*!file.endsWith('.md') &&*/ !file.endsWith('.mdx') && !file.endsWith('.idx') && !file.endsWith('.pack') && !file.endsWith('highlight.js') && !file.endsWith('highlight.min.js') && !file.endsWith('mdtohtml.js') && !file.endsWith('documentation/index.js') && path.extname(file) && ( file.startsWith('/home/runner/work/_just/_just/src') || file.startsWith('/home/runner/work/_just/_just/website') )) {
            output += `\`\`\`${path.extname(file).replace('.','')}\n${fs.readFileSync(file)}\n\`\`\`\n`;
            console.log('File: '+file);
        }
    });
    return output;
}

const outpath = path.join('.', 'website/syntax-highlighting.md');
fs.writeFileSync(outpath, findFiles(process.cwd()));
console.log('Out:  '+fs.statSync(outpath).size);
console.log('Out:  '+fs.readFileSync(outpath));
