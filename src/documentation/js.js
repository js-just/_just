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
 * @param {string} code 
 * @returns {{total: number, names: string[]}}
 */
exports.get = function(code) {
    const variableRegex = /\b(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    const functionRegex = /\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*$/g;

    const variables = new Set();
    const functions = new Set();

    let match;
    while ((match = variableRegex.exec(code)) !== null) {
        variables.add(match[2]);
    }

    while ((match = functionRegex.exec(code)) !== null) {
        functions.add(match[1]);
    }

    const allNames = Array.from(new Set([...variables, ...functions]));

    return {
        total: allNames.length,
        names: allNames
    };
}

/**
 * @param {string} code 
 * @param {string[]} oldNames 
 * @param {string[]} newNames 
 * @returns {string}
 */
exports.set = function(code, oldNames, newNames) {
    const nameMap = {};
    for (let i = 0; i < oldNames.length; i++) {
        nameMap[oldNames[i]] = newNames[i];
    }

    const lines = code.split('\n');

    const processedLines = lines.map(line => {
        let inString = false;
        let stringChar = '';
        let resultLine = '';
        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (!inString && (char === '"' || char === "'")) {
                inString = true;
                stringChar = char;
                resultLine += char;
            } else if (inString && char === stringChar && line[i - 1] !== '\\') {
                inString = false;
                resultLine += char;
            } else if (!inString) {
                if (/[a-zA-Z_$]/.test(char)) {
                    let startIdx = i;
                    let word = '';
                    while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
                        word += line[i];
                        i++;
                    }
                    i--;

                    if (nameMap.hasOwnProperty(word)) {
                        resultLine += nameMap[word];
                    } else {
                        resultLine += word;
                    }
                } else {
                    resultLine += char;
                }
            } else {
                resultLine += char;
            }
        }
        return resultLine;
    });

    return processedLines.join('\n');
}