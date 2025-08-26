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

const box = document.querySelector('.pjs');
const processor = document.querySelector('.p');
const inputs = [
    processor.querySelector('.c')
];
const outputs = [
    processor.querySelector('.r'),
    processor.querySelector('.d')
];
const label = processor.querySelector('span');

function createCenter(t1, t2) {
    const element = document.createElement('div');
    const screen = {x: window.innerWidth, y: window.innerHeight};
    const offset = processor.offsetHeight / 2 + 4;
    const y = `${(inputs[0].offsetTop + inputs[0].offsetHeight / 2 + 1) - offset - 1.5}px`;
    element.id = 'abc';
    element.style.backgroundColor = 'white';
    element.style.translate = `-${screen.x / 4}px ${y}`;
    box.appendChild(element);
    setTimeout(()=>{
        element.style.translate = `${screen.x / 4}px ${y}`;
    }, 100);
    const span = document.createElement('span');
    span.innerText = t1;
    span.style.opacity = '0';
    element.appendChild(span);
    setTimeout(()=>{
        span.style.opacity = '1';
    },1000);
    setTimeout(()=>{
        span.style.opacity = '0';
    },3000);
    let time = 0;
    if (t2) {
        setTimeout(()=>{
            span.innerText = t2;
            span.style.opacity = '1';
        },3100);
        setTimeout(()=>{
            span.style.opacity = '0';
        },5100);
        time = 2100;
    }
    setTimeout(()=>{
        element.style.translate = `${screen.x / 4 * 3}px ${y}`;
    },3200+time);
    setTimeout(()=>{
        element.remove();
    },3450+time);
}

let _labelAnim;
function labelAnim(switch_) {
    const s = '&nbsp;';
    const d = '.';
    switch(switch_) {
        case true:
            _labelAnim = setInterval(()=>{
                switch(label.innerHTML) {
                    case d+s.repeat(2):
                        label.innerHTML = d.repeat(2)+s;
                        break;
                    case d.repeat(2)+s:
                        label.innerHTML = d.repeat(3);
                        break;
                    case d.repeat(3):
                        label.innerHTML = s+d.repeat(2);
                        break;
                    case s+d.repeat(2):
                        label.innerHTML = s.repeat(2)+d;
                        break;
                    case s.repeat(2)+d:
                        label.innerHTML = s.repeat(3);
                        break;
                    default:
                        label.innerHTML = d+s.repeat(2);
                        break;
                }
            },200);
            break;
        default:
            clearInterval(_labelAnim);
            label.innerHTML = s.repeat(3);
            break;
    }
}
