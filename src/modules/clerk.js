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

const _just = {}
_just.error = require('./errmsg.js');
function failed(err) {
    _just.error.errormessage('0128', `Failed to fetch user.`).then((errmsg)=>{throw new Error(errmsg)});
}
exports.user = async (token, userid) => {
    const auth = `Bearer ${token}`;
    console.log(auth) // debug
    return await fetch(`https://api.clerk.com/v1/users/user_${userid}`, {
        method: 'GET',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    }).catch(failed).then((resp) => {
        return resp.json()
    }).catch(failed);
}
exports.meta = async (token, userid, meta = null, logs = null) => {
    const date = new Date().getTime();
    const public = meta ? {
        "_just": meta
    } : {};
    const private = logs ? JSON.parse(`{
        "_just_logs${date}": ${JSON.stringify(logs)}
    }`) : {};
    const body = {
        "public_metadata": public,
        "private_metadata": private,
        "unsafe_metadata": {}
    }
    const auth = `Bearer ${token}`;
    return await fetch(`https://api.clerk.com/v1/users/user_${userid}/metadata`, {
        method: 'PATCH',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).catch(failed).then((resp) => {
        return resp.json()
    }).catch(failed);
}
