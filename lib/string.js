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
 * @param {string} input 
 * @param {string} removeThis 
 * @returns {string}
 */
exports.removeLast = function (input, removeThis) {
    return `${input}`
        .split('').reverse().join('')
        .replace(
            `${removeThis}`.split('').reverse().join(''),
            '')
        .split('').reverse().join('');
}

/**
 * @param {number} bytes 
 * @returns {string}
 */
exports.fileSize =  function (bytes) {
    if (bytes <= 1024) {
        return `${bytes}B`; // Byte
    } else if (bytes <= 1024**2) {
        return `${Math.ceil(( bytes / 1024 ) * 100) / 100}KB`; // Kilobyte
    } else if (bytes <= 1024**3) {
        return `${Math.ceil(( bytes / ( 1024**2 ) ) * 100) / 100}MB`; // Megabyte
    } else if (bytes <= 1024**4) {
        return `${Math.ceil(( bytes / ( 1024**3 ) ) * 100) / 100}GB`; // Gigabyte
    } else if (bytes <= 1024**5) {
        return `${Math.ceil(( bytes / ( 1024**4 ) ) * 100) / 100}TB`; // Terabyte
    } else if (bytes <= 1024**6) {
        return `${Math.ceil(( bytes / ( 1024**5 ) ) * 100) / 100}PB`; // Petabyte
    } else if (bytes <= 1024**7) {
        return `${Math.ceil(( bytes / ( 1024**6 ) ) * 100) / 100}EB`; // Exabyte
    } else if (bytes <= 1024**8) {
        return `${Math.ceil(( bytes / ( 1024**7 ) ) * 100) / 100}ZB`; // Zettabyte
    } else if (bytes <= 1024**9) {
        return `${Math.ceil(( bytes / ( 1024**8 ) ) * 100) / 100}YB`; // Yottabyte
    } else if (bytes <= 1024**10) {
        return `${Math.ceil(( bytes / ( 1024**9 ) ) * 100) / 100}RB`; // Ronnabyte
    } else if (bytes <= 1024**11) {
        return `${Math.ceil(( bytes / ( 1024**10 ) ) * 100) / 100}QB`; // Quettabyte
    }
}

/**
 * @param {string?} input
 * @returns {string}
 */
exports.runnerPath = function (input = '') {
    const GitHubRunner = '/home/runner/work';
    if (input.startsWith(GitHubRunner)) {
        input = input.replace(GitHubRunner, '_just');
    }
    return input;
}

/**
 * @param {string} str 
 * @returns {string}
 */
exports.shuffleString = function (str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}


/**
 * @param {string} str 
 * @returns {string}
 */
exports.Aa = function (str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

/**
 * @param {string} str
 * @param {boolean?} spaces
 * @returns {string}
 */
exports.toText = function (str, spaces = false) {
    if (str.endsWith(':')) str = str.slice(0,-1)
    else if (str.endsWith('?')) str = str.slice(0,-1);
    return spaces ? str.replaceAll('_', ' ').replaceAll('-', ' ') : str;
}
