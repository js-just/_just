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

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const deployDir = process.argv[2] || __dirname;
import { JSON as css } from '../lib/ast/css.js';

async function serializeRules(rules) {
    let result = '';

    const ruleToString = async (rule) => {
        if (!rule) return '';

        if (rule.type === 'at-rule') {
            let innerContent = '';
            if (rule.rules && rule.rules.filter(Boolean).length > 0) {
                innerContent = await serializeRules(rule.rules.filter(Boolean).sort((a, b) => a.id - b.id));
            }
            return `${rule.name}{${innerContent}}`;
        } else if (rule.type === 'rule') {
            const props = [];
            for (const [key, value] of Object.entries(rule.properties)) {
                props.push(`${key}:${value}`);
            }
            return `${rule.selectors.join(',')}{${props.join(';')}}`;
        } else if (rule.type === 'insert') {
            return rule.text;
        }
        return '';
    };

    for (const rule of rules) {
        result += await ruleToString(rule);
    }

    return result;
}

async function compressFile(filePath) {
    let content = readFileSync(filePath, 'utf8');
    let done = false;
    if (filePath.endsWith('.css')) {
        content = await css(content);
        const compressed = await serializeRules(content.sort((a, b) => a.id - b.id));
        writeFileSync(filePath, compressed, 'utf8');
        done = true;
    } else if (filePath.endsWith('.json') || filePath.endsWith('.webmanifest')) {
        try {
            content = JSON.parse(content);
            const compressed = JSON.stringify(content);
            writeFileSync(filePath, compressed, 'utf8');
            done = true;
        } catch (_e) {}
    }

    if (done) {
        return;
    }

    if (filePath.endsWith('.js')) {
        content = content.replace(/(?<!["'`][\s\S]*)\/\/.*\n/g, '\n')
                         .replace(/\/\*[\s\S]*?\*\//g, '');
    }

    if (filePath.endsWith('.html') || filePath.endsWith('.svg') || filePath.endsWith('.xml')) {
        content = content.replace(/<!--[\s\S]*?-->/g, '');
    }

    if (filePath.endsWith('.js')) {
        content = content
        .replace(/(?<!['"`][\s\S]*)\btrue\b(?!['"`][\s\S]*)/g, '!0')
        .replace(/(?<!['"`][\s\S]*)\bfalse\b(?!['"`][\s\S]*)/g, '!1')
        .replace(/(?<!['"`][\s\S]*)\bundefined\b(?!['"`][\s\S]*)/g, '[][[]]')
        .replace(/(?<!['"`][\s\S]*)\/\/(.*?)\n/g, '');
    }    

    content = content.replace(/(\s*["'`])([^"'\n`]*)(["'`]\s*)/g, (match, p1, p2, p3) => {
        return p1 + p2.replace(/\s+/g, ' ') + p3;
    });

    content = content.replace(/\n\s*/g, ' ').replace(/\s+/g, ' ');

    if (filePath.endsWith('.js')) {
        content = content.replace(/;\s*}/g, '}').replace(/;\s*$/, '')
                         .replace(/(?<!['"`][\s\S]*)\/\*(.*?)\*\/(?!['"`][\s\S]*)/g, '');
    }

    if (filePath.endsWith('.js') || filePath.endsWith('.json') || filePath.endsWith('.webmanifest')) {
        content = content.replace(/,\s*}/g, '}').replace(/,\s*]}/g, ']');
    }

    writeFileSync(filePath, content, 'utf8');
}

async function findAndCompressFiles(dir) {
    await readdirSync(dir).forEach(async file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
            await findAndCompressFiles(filePath);
        } else if (
            file.endsWith('.html') || 
            file.endsWith('.svg') || 
            file.endsWith('.xml') || 
            file.endsWith('.css') || 
            file.endsWith('.js') || 
            file.endsWith('.json') || 
            file.endsWith('.webmanifest')
        ) {
            await compressFile(filePath);
        }
    });
}

await findAndCompressFiles(deployDir);

/*

EXAMPLE just.config.js FILE to minify js, css, html files in your static website:

module.exports = {
    type: "compress"
}

*/
