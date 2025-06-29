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

const baseregex = /(@_just base)/g;
const baseregex2= /(@_just base;)/g;
const coderegex = /(@_just highlight)/g;
const coderegex2= /(@_just highlight;)/g;
/**
 * @param {string} CSS 
 * @param {string} CUSTOM
 * @param {string} CODE 
 * @returns {string}
 */
exports.customcss = function (CSS, CUSTOM, CODE) {
    if (!CUSTOM) {
        return CSS + CODE
    }
    CUSTOM = CUSTOM
        .replace(baseregex2,CSS)
        .replace(baseregex, CSS)
        .replace(coderegex2,CODE)
        .replace(coderegex, CODE)
    return CUSTOM
}