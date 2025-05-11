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

const fs = require('fs');
const path = require('path');

const [HTML, CSS, JS] = process.argv.slice(2);

const biMDtoHTML = (input) => {
    let text = input;

    text = text.replace(/___(.*?)___/g, '<em><strong>$1</strong></em>');

    text = text.replace(/(?<=\s|^|[.,!?;:])__\*(.*?)\*\__(?=\s|[.,!?;:]|$)/g, '<strong>$1</strong>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*(.*?)\*\*(?=\s|[.,!?;:]|$)/g, '<strong>$1</strong>');

    text = text.replace(/(?<=\s|^|[.,!?;:])_(.*?)_(?=\s|[.,!?;:]|$)/g, '<em>$1</em>');
    text = text.replace(/(?<=\s|^|[.,!?;:])__\s*(.*?)\s*__(?=\s|[.,!?;:]|$)/g, '<em>$1</em>');

    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\s*(.*?)\s*\*\__(?=\s|[.,!?;:]|$)/g, '<em><strong>$1</strong></em>');

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
            const classAttr = p1.includes('[!NOTE]') ? ' class="note"' : '';
            return `<blockquote${classAttr}>${(level > 1 ? '<br>' : '')}${innerBlockquote}</blockquote>`;
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

    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    const multiLineCodeRegex = /```([\w]*)[\r\n]+([\S\s]*?)```/g;
    text = text.replace(multiLineCodeRegex, '<code>$2</code>');

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

const rootDir = process.cwd();
const markdownFiles = findMarkdownFiles(rootDir);

markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const fileNameWithoutExt = path.basename(file, path.extname(file));
    const outFilePath = (ext) => path.join(path.dirname(file), `${fileNameWithoutExt}.${ext}`);

    const toHTML = hbuoclpMDtoHTML(content);
    
    fs.writeFileSync(outFilePath('html'), HTML.replace('REPLACE_CONTENT', toHTML), 'utf-8');
    fs.writeFileSync(outFilePath('css'), CSS, 'utf-8');
    fs.writeFileSync(outFilePath('js'), JS, 'utf-8');
});