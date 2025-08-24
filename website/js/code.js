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

const APIURL = 'https://test.just.is-a.dev/data/codes.json';
/**
 * @param {string} elementId 
 * @param {string} text 
 * @param {number?} speed 
 * @param {Function?} callback 
 * @returns {void}
 */
function animateTyping(elementId, text, speed = 100, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) {
        return;
    };
    let index = 0;
    element.innerHTML = '';
    function type() {
        if (index >= text.length) {
            if (callback) callback();
            return;
        };
        if (text.charAt(index) === '<') {
            let endIdx = -1;
            const openTagMatch = text.substring(index).match(/^<([a-zA-Z0-9]+)[^>]*>/);
            if (openTagMatch) {
                const tagName = openTagMatch[1];
                const closeTagStr = `</${tagName}>`;
                const closeIdx = text.indexOf(closeTagStr, index);
                if (closeIdx !== -1) {
                    endIdx = closeIdx + closeTagStr.length;
                    const fullTagBlock = text.substring(index, endIdx);
                    element.innerHTML += fullTagBlock;
                    index = endIdx;
                } else {
                    element.innerHTML += '<';
                    index++;
                }
            } else {
                element.innerHTML += '<';
                index++;
            }
        } else {
            element.innerHTML += text.charAt(index);
            index++;
        };
        setTimeout(type, speed);
    };
    type();
};

(async()=>{
    /**
     * @returns {Promise<{data:any[],nums:any[]}>}
     */
    async function getCodes() {
        const responce = await fetch(APIURL).then((r)=>{
            return r.json();
        });
        let[data,nums]=[[],[]];
        for (const[key,val]of Object.entries(responce)) {
            if (key !== 'README') {
                val.forEach((item)=>{
                    data.push(item);
                    nums.push(item.code);
                });
            }
        };
        data = data.filter(item=>item.data);
        return {
            data,nums:nums.filter((item)=>{
                let output = false;
                data.forEach((code)=>{
                    output=!output?code.code===item:output;
                });
                return output;
            })
        }
    }
    /**
     * @param {text} code 
     * @param {any[]} data 
     * @returns {{code: String, message: String, crashed: Boolean, data?: {mg: boolean, i: string | null}} | null}
     */
    function getCodeData(code, data) {
        let output = null;
        data.forEach((item)=>{
            if (item.code === code) {
                output = item;
            }
        });
        return output;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    const codes = await getCodes();

    if (code != null && codes.nums.includes(code)) {
        const codedata = getCodeData(code, codes.data);
        const elem = (id) => document.getElementById(id);
        if (codedata.crashed || code.startsWith('03')) {
            elem('a').classList.add('error');
        } else if (code.startsWith('02')) {
            elem('a').classList.add('warn');
        } else {
            elem('a').classList.add('ok');
        };
        animateTyping('a', code, 100, ()=>{
            animateTyping('b', !codedata.data.mg?codedata.message:'', 100, ()=>{
                animateTyping('c', codedata.data.i||'', 100, ()=>{
                    animateTyping('d', 'Do you want to redirect to the docs? (y/n)');
                });
            });
        });
    }
})();
