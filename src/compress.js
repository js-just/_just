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

const deployDir = process.argv[2] || __dirname;

function compressFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
        content = content.replace(/(?<!["'`][\s\S]*)\/\/.*\n/g, '\n')
                         .replace(/\/\*[\s\S]*?\*\//g, '');
    }

    if (filePath.endsWith('.html') || filePath.endsWith('.svg')) {
        content = content.replace(/<!--[\s\S]*?-->/g, '');
    }
    if (filePath.endsWith('.html')) {
        content = content.replace(/(?<!["<>][\s\S]*)(&nbsp){1,}(?!["<>][\s\S]*)/g, (match, b,c, a) => ' '.repeat(a.split('&').filter(Boolean).length));
    }

    if (filePath.endsWith('.js')) {
        content = content
        .replace(/(?<!['"`][\s\S]*)\btrue\b(?!['"`][\s\S]*)/g, '!![]')
        .replace(/(?<!['"`][\s\S]*)\bfalse\b(?!['"`][\s\S]*)/g, '![]')
        .replace(/(?<!['"`][\s\S]*)\bundefined\b(?!['"`][\s\S]*)/g, '[][[]]')
        .replace(/(?<!['"`][\s\S]*)\/\/(.*?)\n/g, '');
    }    

    content = content.replace(/(\s*["'`])([^"'\n`]*)(["'`]\s*)/g, (match, p1, p2, p3) => {
        return p1 + p2.replace(/\s+/g, ' ') + p3;
    });

    content = content.replace(/\n\s*/g, ' ').replace(/\s+/g, ' ');

    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
        content = content.replace(/;\s*}/g, '}').replace(/;\s*$/, '')
                         .replace(/(?<!['"`][\s\S]*)\/\*(.*?)\*\/(?!['"`][\s\S]*)/g, '');
    }

    if (filePath.endsWith('.js') || filePath.endsWith('.json') || filePath.endsWith('.webmanifest')) {
        content = content.replace(/,\s*}/g, '}').replace(/,\s*]}/g, ']');
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function findAndCompressFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            findAndCompressFiles(filePath);
        } else if (
            file.endsWith('.html') || 
            file.endsWith('.svg') || 
            file.endsWith('.css') || 
            file.endsWith('.js') || 
            file.endsWith('.json') || 
            file.endsWith('.webmanifest')
        ) {
            compressFile(filePath);
        }
    });
}

findAndCompressFiles(deployDir);

/*

EXAMPLE just.config.js FILE to minify js, css, html files in your static website:

module.exports = {
    type: "compress"
}

*/
