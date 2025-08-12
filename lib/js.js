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

const _just = {};
_just.number = require('./number.js');

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

    const allNames = Array.from(new Set([...variables, ...functions])).filter(v => v != 'null');

    return {
        total: allNames.length,
        names: allNames
    };
}

/**
 * @param {string} code 
 * @param {string[]} oldNames 
 * @param {string[]} newNames 
 * @param {string} jstrimmedstrvarbasestr
 * @returns {string}
 */
exports.set = function(code, oldNames, newNames, jstrimmedstrvarbasestr) {
    let id = 0;
    const nameMap = {};
    for (let i = 0; i < oldNames.length; i++) {
        const name_ = _just.number.convertbase(i.toString(10), 10, jstrimmedstrvarbasestr.length, jstrimmedstrvarbasestr) || i.toString(36);
        nameMap[oldNames[i]] = newNames[i] && newNames[i].trim() == '' ? `_just__${_just.number.convertbase(`${id++}`, 10, 62) || id++}` : newNames[i] || '_just_'+name_;
    }

    const lines = code.split('\n');

    id = 0;
    const processedLines = lines.map(line => {
        let inString = false;
        let stringChar = '';
        let resultLine = '';
        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (!inString && (char === '"' || char === "'" || char === '`' || 
                (char === '(' && line[i-1] === 'n' && line[i-2] === 'r' && line[i-3] === 'u' && line[i-4] === 't' && line[i-5] === 'e' && line[i-6] === 'r') || // fix replacing null in return(null)
                (char === '}' && line.includes('`') && line.includes('$') && line.includes('{'))
            )) {
                inString = true;
                stringChar = char === '}' ? '`' : char;
                resultLine += char;
            } else if (
                inString && ((char === stringChar && line[i - 1] !== '\\') ||
                (char === '{' && line[i-1] === '$' && line.includes('`')) || // `${not a string}`
                (char === '(' && line[i-1] === 't' && line[i-2] === 's' && line[i-3] === 'e' && line[i-4] === 't' && line[i-5] === '.' && line[i-6] === '/') // regex.test(not a string)
            )) {
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
                        resultLine += nameMap[word] != 'null' ? nameMap[word] || `_just__${_just.number.convertbase(`${id++}`, 10, 62) || id++}` || `_just___${id++}` : `_just__${_just.number.convertbase(`${id++}`, 10, 62) || id++}` || `_just___${id++}`;
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

/**
 * http://jsfuck.com
 * @param {string} code
 * @returns {string}
 */
exports.fuck = function(code) {
    const SIMPLE = {
        'false':'![]',
        'true':'!![]',
    };
    const MAPPING = {
        'a':'(false+"")[1]',
        'b':'([]["entries"]()+"")[2]',
        'c':'([]["at"]+"")[3]',
        'd':'(undefined+"")[2]',
        'e':'(true+"")[3]',
        'f':'(false+"")[0]',
        'g':'(false+[0]+String)[20]',
        'h':'(+(101))["to"+String["name"]](21)[1]',
        'i':'([false]+undefined)[10]',
        'j':'([]["entries"]()+"")[3]',
        'k':'(+(20))["to"+String["name"]](21)',
        'l':'(false+"")[2]',
        'm':'(Number+"")[11]',
        'n':'(undefined+"")[1]',
        'o':'(true+[]["at"])[10]',
        'p':'(+(211))["to"+String["name"]](31)[1]',
        'q':'("")["fontcolor"]([0]+false+")[20]',
        'r':'(true+"")[1]',
        's':'(false+"")[3]',
        't':'(true+"")[0]',
        'u':'(undefined+"")[0]',
        'v':'(+(31))["to"+String["name"]](32)',
        'w':'(+(32))["to"+String["name"]](33)',
        'x':'(+(101))["to"+String["name"]](34)[1]',
        'y':'(NaN+[Infinity])[10]',
        'z':'(+(35))["to"+String["name"]](36)',

        'A':'(NaN+[]["entries"]())[11]',
        'B':'(+[]+Boolean)[10]',
        'C':'Function("return escape")()(("")["italics"]())[2]',
        'D':'Function("return escape")()([]["at"])["at"]("-1")',
        'E':'(RegExp+"")[12]',
        'F':'(+[]+Function)[10]',
        'G':'(false+Function("return Date")()())[30]',
        'H':null,
        'I':'(Infinity+"")[0]',
        'J':null,
        'K':null,
        'L':null,
        'M':'(true+Function("return Date")()())[30]',
        'N':'(NaN+"")[0]',
        'O':null,
        'P':null,
        'Q':null,
        'R':'(+[]+RegExp)[10]',
        'S':'(+[]+String)[10]',
        'T':'(NaN+Function("return Date")()())[30]',
        'U':null,
        'V':null,
        'W':null,
        'X':null,
        'Y':null,
        'Z':null,

        ' ':'(NaN+[]["at"])[11]',
        '!':null,
        '"':'("")["fontcolor"]()[12]',
        '#':null,
        '$':null,
        '%':'Function("return escape")()([]["at"])[22]',
        '&':'("")["fontcolor"](")[13]',
        '\'':null,
        '(':'([]["at"]+"")[11]',
        ')':'(""+[]["at"])[12]',
        '*':null,
        '+':'(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[2]',
        ',':'[[]]["concat"]([[]])+""',
        '-':'(+(.+[0000001])+"")[2]',
        '.':'(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]',
        '/':'(false+[0])["italics"]()[10]',
        ':':'(RegExp()+"")[3]',
        ';':'("")["fontcolor"](NaN+")[21]',
        '<':'("")["italics"]()[0]',
        '=':'("")["fontcolor"]()[11]',
        '>':'("")["italics"]()[2]',
        '?':'(RegExp()+"")[2]',
        '@':null,
        '[':'([]["entries"]()+"")[0]',
        '\\':'(RegExp("/")+"")[1]',
        ']':'([]["entries"]()+"")[22]',
        '^':null,
        '_':null,
        '`':null,
        '{':'([0]+false+[]["at"])[20]',
        '|':null,
        '}':'([]["at"]+"")["at"]("-1")',
        '~':null
    };
    return code
        .replaceAll(' = true;', `=${SIMPLE.true};`)
        .replace('return true;', `return${SIMPLE.true};`)
        .replaceAll('false',SIMPLE.false)
        .replace(" = 'p' + ", ` = ${MAPPING['p']} + `)
        .replaceAll("('s' + ", `(${MAPPING['s'].replace('false',SIMPLE.false)} + `)
        .replaceAll("'t'", MAPPING['t'].replace('true',SIMPLE.true))
}