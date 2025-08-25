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
const entr = 'Enter the code or command, or type "help" and press "Enter"...';
let cooldown = false;
let loadingerr = false;
let aTerr = false;
/**
 * @param {string} elementId 
 * @param {string} text 
 * @param {number?} speed 
 * @param {Function?} callback 
 * @returns {void}
 */
function animateTyping(elementId, text, speed = 100, callback = null) {
    const element = document.getElementById(elementId);
    if (!element || (text === entr && cooldown)) {
        return;
    };
    cooldown = true;
    let index = 0;
    element.innerHTML = '';
    function type() {
        if (index >= text.length) {
            cooldown = false;
            if (element.innerHTML !== text.replaceAll('\n', '<br>')) {
                aTerr = true;
                console.warn(`"${element.innerHTML}" !== "${text.replaceAll('\n', '<br>')}"`)
            };
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
    if (speed === 0) {
        index = text.length + 1;
        element.innerHTML = text;
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
        }).catch((_e)=>{loadingerr=true});
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
    const init = params.get('i') === 'y';
    const codes = await getCodes();

    const elem = (id) => document.getElementById(id);
    elem('e').style.display = none;
    function redirect(to) {
        try{window.location.replace(to)}catch(e){};try{window.location.href=to}catch(e){};try{window.location.assign(to)}catch(e){}
    }
    const redirecting = (to) => `Redirecting to "<a href="${to}" target="_self">${to}</a>"...`;
    function close_() {
        const url_ = 'https://just.is-a.dev/';
        elem('d').innerHTML = redirecting(to);
        redirect(url_)
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
        animateTyping('d', entr);
    };
    async function codecmd(cmd) {
        const codess=await getCodes();
        if (codess.nums.includes(cmd)) {
            const url_ = `?c=${cmd}&i=y`;
            elem('f').innerHTML = redirecting(`https://just.is-a.dev/code${url_}`);
            window.location.search = url_
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
    function fatal(err) {
        elem('loader').classList.add('fatal');
        elem('loader').innerText = err;
        elem('a')?.remove();
        elem('b')?.remove();
        elem('c')?.remove();
        animateTyping('d', 'Press any key to retry...', 25, ()=>{
            window.addEventListener('keydown', ()=>{
                elem('d').innerHTML = 'Reloading window... <small>The window didn\'t reload? Check your internet connection and try to reload the window manually.</small>';
                window.location.reload()
            })
        });
        throw new Error(err)
    }
    function animErr() {
        if (aTerr) {
            fatal('Unexpected behavior')
        }
    }
    function helpcmd() {
        animErr();
        disableD();
        animateTyping('f', '<strong>Command list:</strong>\nhelp - help command / command list\nhome - redirect to home page\nlist - list of codes', 30, timeoutED)
    };
    function listcmd() {
        animErr();
        disableD();
        animateTyping('f', `<strong>List of codes:</strong>\n${codes.nums.join('\n')}`, 40, timeoutED)
    };
    let interval;
    let enterKeyCooldown = false;
    let listener;
    let aEEid=0;
    /**
     * @param {Function} oncommand 
     * @param {boolean?} onlyYorN
     */
    function animElemE(oncommand, onlyYorN = false) {
        const runid = aEEid++;
        animErr();
        if (interval) clearInterval(interval);
        interval = setInterval(()=>{
            elem('e').style.display = elem('e').style.display === none ? null : none
        }, 500);
        let input = '';
        function updInp() {
            animErr();
            if (input === '') {
                elem('text')?.remove();
                elem('e').insertAdjacentHTML('beforebegin', '<span id="text"></span>');
            } else if (elem('text')) {
                elem('text').innerText = `${input}`;
            } else {
                elem('e').insertAdjacentHTML('beforebegin', `<span id="text">${input}</span>`);
            }
        }
        const keydownListener=(event)=>{
            if (aTerr) {
                animErr();
            } else if (runid === aEEid - 1) {
                if ((event.key.toLowerCase() === 'c' || event.key.toLowerCase() === 'd') && event.ctrlKey) {
                    event.preventDefault();
                    close_()
                } else if (/^[a-zA-Z0-9]$/.test(event.key) && !event.ctrlKey) {
                    event.preventDefault();
                    input += event.key;
                    updInp()
                } else if (event.key.toLowerCase() === 'Enter'.toLowerCase() && !enterKeyCooldown) {
                    event.preventDefault();
                    enterKeyCooldown = true;
                    const uncooldown=()=>{setTimeout(()=>{enterKeyCooldown=false},300)};
                    const inpt = input.trim().toLowerCase();
                    input = '';
                    updInp();
                    if (closecmds.includes(inpt) && !onlyYorN) {
                        close_();
                        uncooldown()
                    } else if (onlyYorN) {
                        if (yescmds.includes(inpt)) {
                            oncommand();
                            uncooldown()
                        } else {
                            animateTyping('d', entr, 25, () => {
                                animElemE((cmd)=>{codecmd(cmd);uncooldown()});
                            })
                        }
                    } else if (helpcmds.includes(inpt)) {
                        helpcmd();
                        uncooldown()
                    } else if (listcmds.includes(inpt)) {
                        listcmd();
                        uncooldown()
                    } else {
                        oncommand(inpt);
                        uncooldown()
                    };
                    return
                } else if (event.key.toLowerCase() === 'Backspace'.toLowerCase()) {
                    event.preventDefault();
                    input = input.slice(0,-1);
                    updInp()
                }
            }
        };
        window.removeEventListener('keydown',listener);
        listener=keydownListener;
        window.addEventListener('keydown',keydownListener)
    };
    animateTyping('loader', `<small>Initializing</small> Just an Ultimate Site Tool helper terminal <small>...</small>\n${' '.repeat(20)}\n${loadingerr ? 'Error' : 'Done.'}`, init ? 0 : 50, ()=>{
        setTimeout(()=>{
            if (code != null && codes.nums.includes(code) && !loadingerr) {
                elem('loader').innerText = `> ${code}\n\n`;
                const codedata = getCodeData(code, codes.data);
                if (codedata.crashed || code.startsWith('03')) {
                    elem('a').classList.add('error');
                } else if (code.startsWith('02')) {
                    elem('a').classList.add('warn');
                } else {
                    elem('a').classList.add('ok');
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
                                    const url_ = 'https://just.is-a.dev/docs';
                                    elem('d').innerHTML = redirecting(url_);
                                    redirect(url_)
                                }, true);
                            });
                        });
                    });
                });
            } else if (loadingerr) {
                fatal('Failed to fetch codes')
            } else {
                elem('loader').remove();
                elem('a').remove();
                elem('b').remove();
                elem('c').remove();
                animateTyping('d', entr, 25, ()=>{
                    animElemE(codecmd);
                })
            }
        }, init ? 0 : 234)
    });
    window.addEventListener('keydown',(event)=>{
        if (event.key.toLowerCase()==='Enter'.toLowerCase()) {
            setTimeout(()=>{enterKeyCooldown=false},350)
        }
    })
})();
