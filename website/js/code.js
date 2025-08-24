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

async function getCodes() {
    const responce = await fetch('https://test.just.is-a.dev/codes.json').then((r)=>{
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
    document.getElementById('a').innerText=code;
    document.getElementById('b').innerText=!codedata.data.mg?codedata.message:'';
    document.getElementById('c').innerHTML=codedata.data.i||'';
}
