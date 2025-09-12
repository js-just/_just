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

const fs = require('fs');
const path = require('path');

let emojiIndex = null;
function buildEmojiIndex(data) {
    const index = new Map();
    
    for (const item of data) {
        if (item.short_name) {
            index.set(item.short_name.toLowerCase(), item);
        }
        
        if (item.short_names) {
            for (const name of item.short_names) {
                if (name) {
                    index.set(name.toLowerCase(), item);
                }
            }
        }
    }
    
    return index;
}

/**
 * @param {{unified:string,short_name:string,short_names:string[]|null}[]} data 
 * @param {string} searchName 
 * @returns {string|null}
 */
exports.findEmoji = function (data, searchName) {
    if (searchName === undefined || searchName === null || searchName === '') {
        return null;
    }

    if (!emojiIndex) {
        emojiIndex = buildEmojiIndex(data);
    }

    const searchNameLower = searchName.toLowerCase();
    const foundItem = emojiIndex.get(searchNameLower);

    if (!foundItem) {
        return null;
    }

    const { unified } = foundItem;
    let output = '';
    unified.split('-').filter(unicode => unicode).forEach((unicode) => {
        output += `&#x${unicode};`;
    });

    return output || null;
}

/**
 * @returns {{unified:string,short_name:string,short_names:string[]|null}[]}
 */
exports.jsonEmoji = function () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../third-party/emoji-data.json'), 'utf8'));
}