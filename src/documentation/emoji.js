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

/**
 * @param {{unified:string,non_qualified:string|null,short_name:string,short_names:string[]|null}[]} data 
 * @param {string} searchName 
 * @returns {string|null}
 */
exports.findEmoji = function (data, searchName) {
    const foundItem = data.find(item => 
        item.short_name === searchName || 
        (item.short_names && item.short_names.includes(searchName))
    );

    if (!foundItem) {
        return null;
    }

    const { unified, non_qualified } = foundItem;

    if (non_qualified && unified.includes('-')) {
        const unifiedParts = unified.split('-');
        const nonQualifiedParts = non_qualified.split('-');
        
        const uniquePart = unifiedParts.find(part => !nonQualifiedParts.includes(part));
        
        return uniquePart || null;
    }

    if (non_qualified === null) {
        if (unified.includes('-')) {
            return unified.split('-')[0];
        } else {
            return unified;
        }
    }

    return null;
}
