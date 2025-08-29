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
const process = processor.querySelector('.l');
const inputs = [
    processor.querySelector('.c'),
    processor.querySelector('.tl'),
    processor.querySelector('.bl'),
];
const outputs = [
    processor.querySelector('.r'),
    processor.querySelector('.d')
];
const label = processor.querySelector('span');

const colors = {
    "html": "#f06529",
    "css": "#2965f1",
    "js": "#f0db4f",
    "just.config.js": "#6c3cf4",
    "md": "#fff",
}

/**
 * @returns {[HTMLDivElement, {x: number, y: number}, number]}
 */
function centerDot() {
    return [
        document.createElement('div'),
        {x: window.innerWidth, y: window.innerHeight},
        processor.offsetHeight / 2 + 4,
    ]
}

/**
 * @param {HTMLElement} track 
 * @param {number} offset 
 * @returns {string}
 */
function yPos(track, offset) {
    return `${(track.offsetTop + track.offsetHeight / 2 + 1) - offset - 1.5 + processor.offsetTop + 55 + 0.5}px`;
}

/**
 * @param {String} c 
 * @param {String} t1 
 * @param {String?} t2 
 */
function centerInput(c, t1, t2) {
    const [element, screen, offset] = centerDot();
    const y = yPos(inputs[0], offset);
    element.style.backgroundColor = c;
    element.style.boxShadow = `0px 0px 3px ${c}`;
    element.style.translate = `-${screen.x / 4}px ${y}`;
    box.appendChild(element);
    const element2 = element.cloneNode();
    element2.style.boxShadow = `0px 0px 20px 5px ${c}`;
    inputs[0].appendChild(element2);
    setTimeout(()=>{
        const pos=`${screen.x / 4}px `;
        element.style.translate = `${pos}${y}`;
        element2.style.translate =`${pos}-25%`;
    }, 100);
    const span = document.createElement('span');
    span.innerText = t1;
    span.style.opacity = '0';
    element.appendChild(span);
    let time = -500;
    setTimeout(()=>{
        span.style.opacity = '1';
    },1000+time);
    setTimeout(()=>{
        span.style.opacity = '0';
    },3000+time);
    if (t2) {
        setTimeout(()=>{
            span.innerText = t2;
            span.style.opacity = '1';
        },3100+time);
        setTimeout(()=>{
            span.style.opacity = '0';
        },5100+time);
        time += 2100;
    }
    setTimeout(()=>{
        const pos = `${screen.x / 4 * 3}px `;
        element.style.translate = `${pos}${y}`;
        element2.style.translate =`${pos}-25%`;
    },3200+time);
    setTimeout(()=>{
        element.remove();
        element2.remove();
        process.style.borderColor = '#6c3cf4';
        process.style.filter = 'drop-shadow(0px 0px 8px #6c3cf4)';
    },3450+time);
}

let _outputs = 0;
/**
 * @param {String} c 
 * @param {String} t1 
 * @param {String?} t2 
 */
function output(c, t1, t2) {
    _outputs++;
    const offset2 = ((_outputs % 2 == 0 ? _outputs : -_outputs) - 1) * 35 - (_outputs % 2 == 0 ? 35 : 0);
    const [element, screen, offset] = centerDot();
    const y = yPos(inputs[0], offset);
    element.style.backgroundColor = 'transparent';
    element.style.translate = `${screen.x / 4}px ${y}`;
    box.appendChild(element);
    const element2 = element.cloneNode();
    element2.style.boxShadow = `0px 0px 20px 5px ${c}`;
    outputs[0].appendChild(element2);
    setTimeout(()=>{
        const pos = `${screen.x / 4 * 3 + offset2}px `;
        element.style.translate = `${pos}${y}`;
        element2.style.translate =`${pos}-25%`;
    }, 100);
    setTimeout(()=>{
        process.style.borderColor = '#3f3f3f';
        process.style.filter = 'none';
        element.style.backgroundColor = c;
        element.style.boxShadow = `0px 0px 3px ${c}`;
    }, 200);
    const span = document.createElement('span');
    span.innerText = t1;
    span.style.opacity = '0';
    element.appendChild(span);
    let time = -500;
    setTimeout(()=>{
        span.style.opacity = '1';
    },1000+time);
    setTimeout(()=>{
        span.style.opacity = '0';
    },3000+time);
    if (t2) {
        setTimeout(()=>{
            span.innerText = t2;
            span.style.opacity = '1';
        },3100+time);
        setTimeout(()=>{
            span.style.opacity = '0';
        },5100+time);
        time += 2100;
    }
    setTimeout(()=>{
        const pos = `${screen.x / 4 * 5}px `;
        element.style.translate = `${pos}${y}`;
        element2.style.translate =`${pos}-25%`;
    },3200+time);
    setTimeout(()=>{
        element.remove();
        element2.remove();
        _outputs--;
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
};

const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
function animateTyping(elementId, text, speed = 100, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) {
        return;
    };
    let index = 0;
    element.innerHTML = '';
    function type() {
        if (index >= text.length) {
            if (element.innerHTML !== text.replaceAll('\n', '<br>')) {
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

function time(ms) {
    return ms > 999 ? `${Math.floor(ms/100)/10}s` : `${ms}ms`;
};

let canAnimate = true;

function compressor() {
    canAnimate = false;
    const variations = [
        [colors.html, '.html', '2kB', '0.9kB'],
        [colors.html, '.html', '14kB', '0.5kB'],
        [colors.html, '.html', '25kB', '6.8kB'],
        [colors.html, '.html', '18kB', '5.6kB'],
        [colors.js, '.js', '7kB', '0.8kB'],
        [colors.js, '.js', '15kB', '3.2kB'],
        [colors.js, '.js', '25kB', '6.1kB'],
        [colors.js, '.js', '20kB', '5.9kB'],
        [colors.css, '.css', '10kB', '2kB'],
        [colors.css, '.css', '22kB', '4.2kB'],
        [colors.css, '.css', '19kB', '2.6kB'],
        [colors.css, '.css', '24kB', '4.2kB'],
    ];
    const data = shuffleArray(variations)[0];
    const offset = Math.ceil((Math.random() / 2 + 0.700) * 1000);
    labelAnim();
    label.id = `c${data[1]}${offset}`;
    animateTyping(label.id, 'Compressor', 75);
    centerInput(data[0], data[1], data[2]);
    setTimeout(()=>{
        labelAnim(true)
    }, 5050);
    setTimeout(()=>{
        labelAnim();
        output(data[0], data[1], data[3]);
        animateTyping(label.id, `Compressing completed (${time(offset)})`, 50, ()=>{
            setTimeout(()=>{
                labelAnim();
                canAnimate = true
            },1200)
        })
    }, 5050+offset+1200);
}

function redirector() {
    canAnimate = false;
    const offset = Math.ceil((Math.random() / 2 + 0.700) * 1000);
    labelAnim();
    label.id = `r${offset}`;
    animateTyping(label.id, 'Redirector', 75);
    centerInput(colors["just.config.js"], 'just.config.js');
    setTimeout(()=>{
        labelAnim(true)
    }, 2950);
    setTimeout(()=>{
        labelAnim();
        output(colors.css, '.css');
        output(colors.js, '.js');
        output(colors.html, '.html');
        animateTyping(label.id, `Generating completed (${time(offset)})`, 50, ()=>{
            setTimeout(()=>{
                labelAnim();
                canAnimate = true
            },1200)
        })
    }, 2950+offset+1200);
}

function generator() {
    canAnimate = false;
    const offset = Math.ceil((Math.random() * 2 + 1.700) * 1000);
    labelAnim();
    label.id = `g${offset}`;
    animateTyping(label.id, 'Generator', 75);
    centerInput(colors.md, '.md');
    setTimeout(()=>{
        labelAnim(true)
    }, 2950);
    setTimeout(()=>{
        labelAnim();
        output(colors.css, '.css');
        output(colors.js, '.js');
        output(colors.html, '.html');
        animateTyping(label.id, `Generating completed (${time(offset)})`, 50, ()=>{
            setTimeout(()=>{
                labelAnim();
                canAnimate = true
            },1200)
        })
    }, 2950+offset+1200);
}

let lastanimation = -1;
const animations = [compressor, redirector, generator];
function animate() {
    labelAnim();
    setInterval(()=>{
        if (canAnimate) {
            canAnimate = false;
            const animation = animations[shuffleArray([0, 1, 2].filter(anim => anim != lastanimation))[0]];
            lastanimation = animations.indexOf(animation) || -1;
            setTimeout(animation, 500)
        }
    },100)
};
animate()
