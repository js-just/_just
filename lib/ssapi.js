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
_just.string = require('./string.js');
const apis = {};
apis["is-a.dev"] = 'https://raw.is-a.dev/v2.json';
const warn_ = (d, e) => {
    console.warn(`${_just.error.prefix}[0;33mWarning 0206[0m: [0;33mFailed to fetch "[0m${apis[d]}[0;33m": [0m${e}`);
}

/**
 * @param {string} domain 
 * @param {number} attempt
 */
exports["is-a.dev"] = async function (domain, attempt = 0) {
    attempt++;
    let success = false;
    let exist = false;
    try {
        const response = await fetch(apis["is-a.dev"]).catch(async(error)=>{
            if (attempt < 5) {
                await exports["is-a.dev"](domain, attempt);
            } else {
                warn_("is-a.dev", error)
            }
        });
        const data = (await response.json()).filter(d => !d.reserved);
        
        const domains = data.map((item, index) => {return item.domain});
        exist = domains.includes(domain);
        success = true;
    } catch (error) {
        if (attempt < 5) {
            await exports["is-a.dev"](domain, attempt);
        } else {
            warn_("is-a.dev", error)
        }
    }
    if (success && !exist) {
        _just.error.errormessage('0123', `Subdomain "${_just.string.removeLast(domain, '.is-a.dev')}" is not registered on "is-a.dev".`).then((errmsg)=>{throw new Error(errmsg)});
    }
}
