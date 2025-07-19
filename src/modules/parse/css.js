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

exports.JSON = function(cssText) {
  const cleanedCSS = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

  let index = 0;

  function skipWhitespace() {
    while (/\s/.test(cleanedCSS[index])) index++;
  }

  function parseRules() {
    const rules = [];

    while (index < cleanedCSS.length) {
      skipWhitespace();

      if (cleanedCSS[index] === '}') {
        index++;
        break;
      }

      if (cleanedCSS[index] === '@') {
        rules.push(parseAtRule());
      } else {
        rules.push(parseSelectorOrNested());
      }
    }

    return rules;
  }

  function parseAtRule() {
    let start = index;
    while (index < cleanedCSS.length && cleanedCSS[index] !== '{' && cleanedCSS[index] !== ';') {
      index++;
    }
    const atRuleHeader = cleanedCSS.slice(start, index).trim();

    if (cleanedCSS[index] === '{') {
      index++;
      const nestedRules = parseRules();
      return {
        type: 'at-rule',
        name: atRuleHeader,
        rules: nestedRules
      };
    } else if (cleanedCSS[index] === ';') {
      index++;
      return {
        type: 'at-rule',
        name: atRuleHeader,
        rules: []
      };
    }
    return { type: 'at-rule', name: atRuleHeader, rules: [] };
  }

  function parseSelectorOrNested() {
    let start = index;
    while (index < cleanedCSS.length && cleanedCSS[index] !== '{' && cleanedCSS[index] !== '}') {
      index++;
    }
    const selectorText = cleanedCSS.slice(start, index).trim();

    if (cleanedCSS[index] === '{') {
      index++;
      
      skipWhitespace();
      
      if (/^[.#a-zA-Z0-9\-\s,:]+$/.test(selectorText)) {
        const selectors = selectorText.split(',').map(s => s.trim());
        
        const properties = {};
        while (true) {
          skipWhitespace();
          if (cleanedCSS[index] === '}') {
            index++;
            break;
          }
          if (cleanedCSS[index] === '@') {
            const atRule = parseAtRule();
            return { type: 'rule', selectors, properties, nestedRules: [atRule] };
          }
          
          let propStart = index;
          while (index < cleanedCSS.length && cleanedCSS[index] !== ';' && cleanedCSS[index] !== '}') {
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
          } else if (/^[.#a-zA-Z0-9\-\s,:]+$/.test(line)) {
            break;
          }
        }
        
        return { type: 'rule', selectors, properties };
        
      } else {
        return null;
      }
      
    } else {
      return null;
    }
  }

  const ast = parseRules();
  return ast;
}
