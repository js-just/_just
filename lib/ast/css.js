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
        return index < length ? cleanedCSS[index] : null;
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
            const rule = parseSelectorOrNested();
            if (rule) rules.push(rule);
        }
    }

    function parseAtRule() {
        let start = index;
        while (index < length && cleanedCSS[index] !== '{' && cleanedCSS[index] !== ';') {
            index++;
        }
        const atRuleHeader = cleanedCSS.slice(start, index).trim();

        if (index < length && cleanedCSS[index] === '{') {
            index++;
            const nestedRules = [];
            stack.push({ type: 'at-rule', name: atRuleHeader, rules: nestedRules, id: ruleid++ });
            
            while (index < length) {
                skipWhitespace();
                if (peek() === '}') {
                    index++;
                    break;
                }
                if (peek() === '@') {
                    nestedRules.push(parseAtRuleV2());
                } else {
                    const rule = parseSelectorOrNested();
                    if (rule) nestedRules.push(rule);
                }
            }
            
            return { type: 'at-rule', name: atRuleHeader, rules: nestedRules, id: ruleid++ };
            
        } else if (index < length && cleanedCSS[index] === ';') {
            index++;
            return { type: 'at-rule', name: atRuleHeader, rules: [], id: ruleid++ };
        }
        
        return { type: 'at-rule', name: atRuleHeader, rules: [], id: ruleid++ };
    }

    function parseAtRuleV2() {
        let text = '';
        const startIndex = index;
        
        let braceCount = 0;
        let inString = false;
        let stringChar = null;
        let escaped = false;
        
        while (index < length) {
            const char = cleanedCSS[index];
            
            if (escaped) {
                escaped = false;
                text += char;
                index++;
                continue;
            }
            
            if (char === '\\') {
                escaped = true;
                text += char;
                index++;
                continue;
            }
            
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
                text += char;
                index++;
                continue;
            }
            
            if (inString && char === stringChar) {
                inString = false;
                text += char;
                index++;
                continue;
            }
            
            if (!inString) {
                if (char === '{') {
                    braceCount++;
                } else if (char === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        text += char;
                        index++;
                        break;
                    }
                } else if (char === ';' && braceCount === 0) {
                    text += char;
                    index++;
                    break;
                }
            }
            
            text += char;
            index++;
        }
        
        return { type: 'insert', text: text.trim(), id: ruleid++ };
    }

    function parsePropertyValue() {
        let value = '';
        let inString = false;
        let stringChar = null;
        let escaped = false;
        let parenCount = 0;
        let bracketCount = 0;
        
        while (index < length) {
            const char = cleanedCSS[index];
            
            if (escaped) {
                escaped = false;
                value += char;
                index++;
                continue;
            }
            
            if (char === '\\') {
                escaped = true;
                value += char;
                index++;
                continue;
            }
            
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
                value += char;
                index++;
                continue;
            }
            
            if (inString && char === stringChar) {
                inString = false;
                value += char;
                index++;
                continue;
            }
            
            if (!inString) {
                if (char === '(') {
                    parenCount++;
                } else if (char === ')') {
                    parenCount--;
                } else if (char === '[') {
                    bracketCount++;
                } else if (char === ']') {
                    bracketCount--;
                } else if (char === ';' && parenCount === 0 && bracketCount === 0) {
                    break;
                } else if (char === '}' && parenCount === 0 && bracketCount === 0) {
                    break;
                }
            }
            
            value += char;
            index++;
        }
        
        return value.trim();
    }

    function parseSelectorOrNested() {
        let start = index;
        let inString = false;
        let stringChar = null;
        let escaped = false;
        
        while (index < length) {
            const char = cleanedCSS[index];
            
            if (escaped) {
                escaped = false;
                index++;
                continue;
            }
            
            if (char === '\\') {
                escaped = true;
                index++;
                continue;
            }
            
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
                index++;
                continue;
            }
            
            if (inString && char === stringChar) {
                inString = false;
                index++;
                continue;
            }
            
            if (!inString && (char === '{' || char === '}')) {
                break;
            }
            
            index++;
        }
        
        const selectorText = cleanedCSS.slice(start, index).trim();

        if (index < length && cleanedCSS[index] === '{') {
            index++;
            
            skipWhitespace();

            if (selectorText) {
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
                    while (index < length && cleanedCSS[index] !== ':' && cleanedCSS[index] !== ';' && cleanedCSS[index] !== '}') {
                        index++;
                    }
                    
                    if (index >= length) break;
                    
                    const key = cleanedCSS.slice(propStart, index).trim();
                    
                    if (cleanedCSS[index] === ':') {
                        index++;
                        const value = parsePropertyValue();
                        
                        if (key && value !== '') {
                            properties.push([key, value]);
                        }
                        
                        if (index < length && cleanedCSS[index] === ';') {
                            index++;
                        }
                    } else if (cleanedCSS[index] === ';') {
                        index++;
                    } else if (cleanedCSS[index] === '}') {
                        index++;
                        break;
                    }
                }

                return { type: 'rule', selectors, properties, nestedRules, id: ruleid++ };
            }
        }
        
        return null;
    }

    return rules.filter(Boolean).sort((a, b) => a.id - b.id);
}
