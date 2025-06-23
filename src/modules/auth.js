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
const clerk = require('./clerk.js');
function auth(str) {
    return str.split('').map(char => {
        if (char === char.toUpperCase()) {
        return char.toLowerCase();
        } else {
        return char.toUpperCase();
        }
    }).reverse().join('');
};
exports.userCheck = async (token, userid, authkey) => {
    const user = await clerk.user(token, auth(userid));
    const key = user ? user.primary_email_address_id || null : null
    if (user.errors) {
        _just.error.errormessage('0128', `Failed to fetch user. (Clerk error: ${user.errors[0].message})`).then((errmsg)=>{throw new Error(errmsg)});
    }
    return key && key == `idn_${auth(authkey)}`;
};
exports.domainGet = async (token, userid, domain) => {
    const user = await clerk.user(token, auth(userid));
    return user && user.public_metadata && user.public_metadata._just ? user.public_metadata._just[domain] || null : null;
};
exports.domainSet = async (token, userid, domain) => {
    const expire = new Date().getTime() + 2592000000;
    const user = await clerk.user(token, auth(userid));
    const meta = user && user.public_metadata ? user.public_metadata._just || {} : {}
    meta[domain] = expire;
    await clerk.meta(token, auth(userid), meta);
};
exports.log = async (token, userid, logs = {}) => {
    await clerk.meta(token, auth(userid), null, logs);
}
