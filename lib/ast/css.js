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

let sass;
exports.SASS = async function() {
    sass = await import('https://jspm.dev/sass');
}

function parse(scss) {
    if (sass) {
        return sass.compileString(scss);
    } else {
        console.log('noSASS');
        return scss;
    }
}

/**
 * @param {string} cssText 
 * @returns {Array} 
 */
exports.JSON = function(cssText) {
    const cleanedCSS = parse(cssText.replace(/\/\*[\s\S]*?\*\//g, ''));
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
        if (cleanedCSS[index+1]==='p'&&cleanedCSS[index+2]==='r'&&cleanedCSS[index+3]==='o'&&cleanedCSS[index+4]==='p'&&cleanedCSS[index+5]==='e'&&cleanedCSS[index+6]==='r'&&cleanedCSS[index+7]==='t'&&cleanedCSS[index+8]==='y') {
            index += 9;
            text = '@property ';
            return insert()
        } else if (cleanedCSS[index+1]==='f'&&cleanedCSS[index+2]==='o'&&cleanedCSS[index+3]==='n'&&cleanedCSS[index+4]==='t'&&cleanedCSS[index+5]==='-'&&cleanedCSS[index+6]==='f'&&cleanedCSS[index+7]==='a'&&cleanedCSS[index+8]==='c'&&cleanedCSS[index+9]==='e') {
            index += 10;
            text = '@font-face ';
            return insert()
        } else {
            return parseAtRule()
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
                const properties = {};
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
                        properties[key] = value;
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
