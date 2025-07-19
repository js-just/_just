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

/**
 * @param {string} cssText 
 * @returns {Array} 
 */
exports.JSON = function(cssText) {
  const cleanedCSS = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  let index = 0;
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
      rules.push(parseAtRule());
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
      stack.push({ type: 'at-rule', name: atRuleHeader, rules: nestedRules });
      
      while (index < length) {
        skipWhitespace();
        if (peek() === '}') {
          index++;
          break;
        }
        nestedRules.push(parseSelectorOrNested());
      }
      
      return { type: 'at-rule', name: atRuleHeader, rules: nestedRules };
      
    } else if (cleanedCSS[index] === ';') {
      index++;
      return { type: 'at-rule', name: atRuleHeader, rules: [] };
    }
    
    return { type: 'at-rule', name: atRuleHeader, rules: [] };
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

      if (/^[.#a-zA-Z0-9\-\s,:()%*\+<>]+$/.test(selectorText)) {
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
            nestedRules.push(parseAtRule());
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

        return { type: 'rule', selectors, properties, nestedRules };
        
      } else {
        return null;
      }
      
    } else {
      return null;
    }
  }

  return rules.filter(Boolean);
}
