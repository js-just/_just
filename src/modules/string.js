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
        return `${bytes}B`;
    } else if (bytes <= 1024**2) {
        return `${Math.ceil(( bytes / 1024 ) * 100) / 100}KB`;
    } else if (bytes <= 1024**3) {
        return `${Math.ceil(( bytes / ( 1024**2 ) ) * 100) / 100}MB`;
    } else if (bytes <= 1024**4) {
        return `${Math.ceil(( bytes / ( 1024**3 ) ) * 100) / 100}GB`;
    } else if (bytes <= 1024**5) {
        return `${Math.ceil(( bytes / ( 1024**4 ) ) * 100) / 100}TB`;
    }
}

exports.runnerPath = function (input = '') {
    const GitHubRunner = '/home/runner/work'
    if (input.startsWith(GitHubRunner)) {
        input = input.replace(GitHubRunner, '_just')
    }
    return input
}