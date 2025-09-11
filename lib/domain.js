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
_just.error = require('./errmsg.js');

/**
 * @returns {[string[], string[]]}
 */
const psl = async () => {
    const responce = await fetch('https://publicsuffix.org/list/public_suffix_list.dat');
    let dat_ = await responce.text();
    dat_ = dat_.replace(/(?<=^|\n)\/\/(.*?)\n/g, '\n').replace(/\n(\n{0,})\n/g, '\n').trim().split('\n').filter(d => !d.startsWith('!'))
    return [dat_.filter(d => (!d.startsWith('*.') && /\./.test(d))), dat_.filter(d => (!d.startsWith('*.') && !/\./.test(d))), dat_.filter(d => d.startsWith('*.'))] // domains, TLDs, *.domains
}
/**
 * @param {string} hostname 
 * @returns {null | string}
 */
function getTLD(hostname) {
    const parts = hostname.split('.');
    if (parts.length < 2) {
        return null;
    }
    return parts[parts.length - 1];
}
/**
 * @param {string} domain 
 * @returns {string}
 */
const checkTLD = async (domain) => {
    const inputTLD = getTLD(domain);
    const PSL = await psl();
    if (PSL[1].includes(inputTLD)) {
        return domain
    } else {
        _just.error.errormessage('0126', `"${inputTLD}" is not a TLD. (${domain})`).then((errmsg)=>{throw new Error(errmsg)});
    }
}
const domainregex = /^(?=.{1,253}$)(?:(?:[_a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.)+[a-zA-Z]{2,63}$/; // Regex made by @wdhdev - https://github.com/wdhdev ( commit: https://github.com/is-a-dev/register/commit/6339f26bef0d9dbf56737ffddaca7794cf35bd24#diff-80b3110840a7eedb8cc2c29ead4fe4c98f157738ff3dcf22f05f3094ad6ca9bbR6 )
/**
 * @param {string} input 
 * @param {boolean} throwerror 
 * @returns {string | undefined | false}
 */
function checkdomain(input, throwerror) {
    if (input && domainregex.test(input)) {
        return input;
    } else if (!input) {
        return undefined;
    } else if (throwerror) {
        _just.error.errormessage('0122', `"${input}" is not a domain name.`).then((errmsg)=>{throw new Error(errmsg)});
    } else {
        return false;
    }
}

exports.psl = psl;
exports.getTLD = getTLD;
exports.checkTLD = checkTLD;
exports.checkdomain = checkdomain;
exports.domainregex = domainregex;
