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
const none = 'none';
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
        element.innerHTML = element.innerHTML.replaceAll('\n', '<br>');
        setTimeout(type, speed);
    };
    type();
};
function checkFirstLetterCase(text) {
    if (!text || typeof text !== 'string') {
        return undefined;
    }
    const firstChar = text.charAt(0);
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
        return true;
    } else if (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase()) {
        return false;
    } else {
        return null;
    }
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

    const h1 = document.querySelector('.exit');
    function updh1() {
        h1.classList.remove('exit');
        h1.classList.add('code');
    };
    const elem = (id) => document.getElementById(id);
    elem('e').style.display = none;
    function redirect(to) {
        try{window.location.replace(to)}catch(e){};try{window.location.href=to}catch(e){};try{window.location.assign(to)}catch(e){}
    }
    function close_() {
        redirect('https://just.is-a.dev/');
    };
    const closecmds = [
        'kill', 'exit', 'home', 'e'
    ];
    const yescmds = [
        'y', 'yes', 'ye', 'yeah', 'yep', 'sure', 'ok', 'k'
    ];
    function disableD() {
        const f = elem('d').cloneNode();
        f.id = 'f';
        elem('d').after(f);
        elem('d').style.display = none;
    };
    function enableD() {
        elem('f')?.remove();
        elem('d').style.display = null;
        animateTyping('d', 'Enter the code...');
    };
    async function codecmd(cmd) {
        const codess=await getCodes();
        if (codess.nums.includes(cmd)) {
            window.location.search = `?c=${cmd}`;
        } else {
            disableD();
            elem('f').innerText = 'No code found and unknown command.';
            setTimeout(enableD, 1000)
        }
    };
    const helpcmds = [
        'help', 'h'
    ];
    const listcmds = [
        'list', 'l'
    ];
    function timeoutED() {
        setTimeout(enableD, 3000)
    };
    function helpcmd() {
        disableD();
        animateTyping('f', '<strong>Command list:</strong>\nhelp - help command / command list\nhome - redirect to home page\nlist - list of codes', 30, timeoutED)
    };
    function listcmd() {
        disableD();
        animateTyping('f', `<strong>List of codes:</strong>\n${codes.nums.join('\n')}`, 40, timeoutED)
    };
    let interval;
    /**
     * @param {Function} oncommand 
     * @param {boolean?} onlyYorN
     */
    function animElemE(oncommand, onlyYorN = false) {
        if (interval) clearInterval(interval);
        interval = setInterval(()=>{
            elem('e').style.display = elem('e').style.display === none ? null : none
        }, 500);
        let input = '';
        function updInp() {
            if (input === '') {
                elem('text')?.remove();
                elem('e').insertAdjacentHTML('beforebegin', '<span id="text"></span>');
            } else if (elem('text')) {
                elem('text').innerText = `${input}`;
            } else {
                elem('e').insertAdjacentHTML('beforebegin', `<span id="text">${input}</span>`);
            }
        }
        window.addEventListener('keydown', (event)=>{
            if ((event.key.toLowerCase() === 'c' || event.key.toLowerCase() === 'd') && event.ctrlKey) {
                event.preventDefault();
                close_()
            } else if (/^[a-zA-Z0-9]$/.test(event.key) && !event.ctrlKey) {
                event.preventDefault();
                input += event.key;
                updInp()
            } else if (event.key.toLowerCase() === 'Enter'.toLowerCase()) {
                event.preventDefault();
                const inpt = input.trim().toLowerCase();
                input = '';
                updInp();
                if (closecmds.includes(inpt) && !onlyYorN) {
                    close_();
                } else if (onlyYorN) {
                    if (yescmds.includes(inpt)) {
                        oncommand();
                    } else {
                        animateTyping('d', 'Enter the code...', 25, ()=>{animElemE(codecmd)});
                    }
                } else if (helpcmds.includes(inpt)) {
                    helpcmd();
                } else if (listcmds.includes(inpt)) {
                    listcmd();
                } else {
                    oncommand(inpt);
                };
                return
            } else if (event.key.toLowerCase() === 'Backspace'.toLowerCase()) {
                event.preventDefault();
                input = input.slice(0,-1);
                updInp()
            }
        })
    };
    if (code != null && codes.nums.includes(code)) {
        const codedata = getCodeData(code, codes.data);
        if (codedata.crashed || code.startsWith('03')) {
            elem('a').classList.add('error');
        } else if (code.startsWith('02')) {
            updh1();
            elem('a').classList.add('warn');
        } else {
            elem('a').classList.add('ok');
        };
        if (code.startsWith('03')) {
            updh1();
        };
        const info = codedata.data.i||'';
        const check = checkFirstLetterCase(info);
        animateTyping('a', code, 200, ()=>{
            animateTyping('b', !codedata.data.mg?codedata.message:'', 50, ()=>{
                if (codedata.data.mg) {
                    elem('b').remove();
                };
                if (check===true) {
                    elem('c').classList.add('info');
                } else {
                    elem('c').classList.add('tip');
                };
                animateTyping('c', check===false?`To fix it, ${info}.`:check===true?info:''||'', 50, ()=>{
                    animateTyping('d', 'Do you want to redirect to the docs? (y/n)', 25, ()=>{
                        animElemE(()=>{
                            redirect('https://just.is-a.dev/docs')
                        }, true);
                    });
                });
            });
        });
    } else {
        updh1();
        elem('a').remove();
        elem('b').remove();
        elem('c').remove();
        animateTyping('d', 'Enter the code...', 25, ()=>{
            animElemE(codecmd);
        })
    }
})();
