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

const regex = /(?<=^|\n)_just: (prev|next): \/(.*?)(?=\n|$)/g;
exports.regex = regex;

/**
 * @param {string} text 
 * @returns {[
 *     string, 
 *     {
 *         "prev"?: string,
 *         "next"?: string
 *     }
 * ]}
 */
exports.get = (text) => {
    const data = {};
    text.replace(regex, (a, b, c) => {
        data[b] = c;
        return '';
    })
    return [
        text, 
        data
    ]
}

/**
 * 
 * @param {{
 *     "prev"?: string,
 *     "next"?: string
 * }} data 
 * @param {string} n0 
 * @param {string} n1 
 * @param {string} n2 
 * @param {string} pid 
 * @param {string} nid 
 * @param {[string[]]} pl
 * @returns {string}
 */
exports.html = (data, n0, n1, n2, pid, nid, pl) => {
    if (!data.prev && !data.next) {
        return '';
    } else {
        const dataprev = '/' + data.prev;
        const datanext = '/' + data.next;
        const pl1 = [], pl2 = {};
        for (const [id, p] of Object.entries(pl)) {
            pl1.push(p[0]);
            pl2[p[0]] = p[1];
        }
        return `<div class="${n0}"${data.next && !data.prev ? ' style="display:flex;flex-direction:column;"' :''}>${data.prev && pl1.includes(dataprev) ? `<button class="${n1}" id="${pid}"><small>Previous page</small><span>${pl2[dataprev] || data.prev}</span></button>` : ''}${data.next && pl1.includes(datanext) ? `<button class="${n2}" id="${nid}"${data.next && !data.prev ? ' style="align-self:flex-end;"' : ''}><small>Next page</small><span>${pl2[datanext] || data.next}</span></button>` : ''}</div>`;
    }
}