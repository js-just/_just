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

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
let sass = false;
let sassformat = '.scss';
const tempdir = '_just_temp';
const errmsg = require('./../errmsg.js');

const config = JSON.parse(fs.readFileSync('just.config.json', 'utf8'));
const parsers= ['CSS', 'SCSS', 'SASS'];
if (config.parser && (config.parser.css === 'SCSS' || config.parser.css === 'SASS')) {
    fs.mkdirSync(tempdir);
    sass = true;
    if (config.parser.css === 'SASS') {
        sassformat = '.sass';
    }
} else if (config.parser && config.parser.css && !parsers.includes(config.parser.css)) {
    errmsg.errormessage('0131', 'Invalid value of property "css" in "parser" in module.exports of just.config.js. It must be one of: "CSS", "SCSS", "SASS".').then((errmsg)=>{throw new Error(errmsg)});
}

async function parse(scss) {
    if (sass) {
        const filename = String((new Date()).getTime());
        fs.writeFileSync(path.join(tempdir, `${filename}${sassformat}`), scss, 'utf8');
        let output = scss;
        await exec(`sass ${path.join(tempdir, `${filename}${sassformat}`)} ${path.join(tempdir, `${filename}.css`)}`, (error, stdout, stderr) => {
            if (error) {
                console.log('::error::'+stderr);
                errmsg.errormessage('0132', 'Dart Sass compilation error.').then((errmsg)=>{throw new Error(errmsg)});
            } else {
                output = fs.readFileSync(path.join(tempdir, `${filename}.css`), 'utf8');
                fs.rmSync(path.join(tempdir, `${filename}.css`));
            }
        });
        return output;
    } else {
        return scss;
    }
}

/**
 * @param {string} cssText 
 * @returns {Promise<Array>} 
 */
exports.JSON = async function(cssText) {
    const cleanedCSS = await parse(cssText.replace(/\/\*[\s\S]*?\*\//g, ''));
    let index = 0;
    let ruleid = 0;
    const length = cleanedCSS.length;

    function skipWhitespace() {
        while (index < length && /\s/.test(cleanedCSS[index])) index++;
    }

    function peek() {
        return cleanedCSS[index];
    }

    function consume() {
        return cleanedCSS[index++];
    }

    const stack = [];
    const rules = [];

    while (index < length) {
        skipWhitespace();

        if (index >= length) break;

        const char = peek();

        if (char === '}') {
            index++;
        if (stack.length > 0) stack.pop();
            continue;
        }

        if (char === '@') {
            rules.push(parseAtRuleV2());
        } else {
            rules.push(parseSelectorOrNested());
        }
    }

    function parseAtRule() {
        let start = index;
        while (index < length && cleanedCSS[index] !== '{' && cleanedCSS[index] !== ';') {
            index++;
        }
        const atRuleHeader = cleanedCSS.slice(start, index).trim();

        if (cleanedCSS[index] === '{') {
            index++;
            const nestedRules = [];
            stack.push({ type: 'at-rule', name: atRuleHeader, rules: nestedRules, id: ruleid++ });
            
            while (index < length) {
                skipWhitespace();
                if (peek() === '}') {
                    index++;
                    break;
                }
                nestedRules.push(parseSelectorOrNested());
            }
            
            return { type: 'at-rule', name: atRuleHeader, rules: nestedRules, id: ruleid++ };
            
        } else if (cleanedCSS[index] === ';') {
            index++;
            return { type: 'at-rule', name: atRuleHeader, rules: [], id: ruleid++ };
        }
        
        return { type: 'at-rule', name: atRuleHeader, rules: [], id: ruleid++ };
    }
    function parseAtRuleV2() {
        let text = '';
        function insert() {
            let reading = true;
            let readingValue = false;
            while (reading) {
                if (!readingValue) {skipWhitespace()};
                if (peek()===':') {readingValue=true}
                else if(peek()===';'){readingValue=false}
                else if(peek()==='}'){reading=false};
                text += cleanedCSS[index++];
            }
            return { type: 'insert', text }
        }
        function insert2() {
            let reading = true;
            let readingString = false;
            let quoteChar = null;
            
            while (reading && index < length) {
                const currentChar = peek();
                
                if ((currentChar === '"' || currentChar === "'") && cleanedCSS[index - 1] !== '\\') {
                    if (!readingString) {
                        readingString = true;
                        quoteChar = currentChar;
                    } else if (currentChar === quoteChar) {
                        readingString = false;
                    }
                }
                
                if (!readingString && (currentChar === ';' || currentChar === '}')) {
                    reading = false;
                    if (currentChar === ';') {
                        text += cleanedCSS[index++];
                    }
                    break;
                }
                
                text += cleanedCSS[index++];
            }
            return { type: 'insert', text };
        }
        const nextChars = cleanedCSS.slice(index + 1, index + 10);
    
        if (nextChars.startsWith('property')) {
            index += 9;
            text = '@property ';
            return insert();
        } else if (nextChars.startsWith('font-face')) {
            index += 10;
            text = '@font-face ';
            return insert();
        } else if (nextChars.startsWith('import')) {
            index += 7;
            skipWhitespace();
            
            if (cleanedCSS.slice(index, index + 3) === 'url') {
                index += 3;
                text = '@import url';
                return insert2();
            } else {
                text = '@import ';
                let reading = true;
                while (reading && index < length) {
                    const currentChar = peek();
                    if (currentChar === ';' || currentChar === '}') {
                        reading = false;
                        if (currentChar === ';') {
                            text += cleanedCSS[index++];
                        }
                        break;
                    }
                    text += cleanedCSS[index++];
                }
                return { type: 'insert', text };
            }
        } else {
            return parseAtRule();
        }
    }

    function parseSelectorOrNested() {
        let start = index;
        while (
            index < length &&
            cleanedCSS[index] !== '{' &&
            cleanedCSS[index] !== '}'
        ) {
            index++;
        }
        
        const selectorText = cleanedCSS.slice(start, index).trim();

        if (cleanedCSS[index] === '{') {
            index++;
            
            skipWhitespace();

            if (/^[.#a-zA-Z0-9\-\s,:()%*\+<>_\[\]="]+$/.test(selectorText)) {
                const selectors = selectorText.split(',').map(s => s.trim());
                let properties = [];
                const nestedRules = [];

                while (index < length) {
                    skipWhitespace();
                    if (peek() === '}') {
                        index++;
                        break;
                    }
                    
                    if (peek() === '@') {
                        nestedRules.push(parseAtRuleV2());
                        continue;
                    }

                    let propStart = index;
                    while (
                        index < length &&
                        cleanedCSS[index] !== ';' &&
                        cleanedCSS[index] !== '}'
                    ) {
                        index++;
                    }
                    
                    const line = cleanedCSS.slice(propStart, index).trim();

                    if (!line) break;

                    if (line.includes(':')) {
                        const [key, value] = line.split(':').map(s => s.trim());
                        properties.push([key, value]);
                        if (cleanedCSS[index] === ';') index++;
                    } else if (cleanedCSS[index] === '}') {
                        index++;
                        break;
                    }
                }

                return { type: 'rule', selectors, properties, nestedRules, id: ruleid++ };
                
            } else {
                return null;
            }
        
        } else {
            return null;
        }
    }

    return rules.filter(Boolean).sort((a, b) => a.id - b.id);;
}
