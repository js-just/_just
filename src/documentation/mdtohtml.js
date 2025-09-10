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

const base = `.,!?;:`;
const all = `${base}*_\`<>=~^"'-+()&%$#№@\\\\|/×÷℃℉©®℗™‹›«»\\[\\]¸¨′‵‘’‚‛″‶“”„‟‴‷⁗*‰‱✓✕¡¿‼⁈⁇¥฿₫₩֏€₹₪₺₡₦£₽₢₱৳₲₮₸₾₥៛₨₴₵₭؋૱¢﷼₣₿₼௹¤⃀₻ƒ₧৲₳₯₤₷৹₰₠ℳ₶৻`;

/**
 * @param {string} text 
 * @param  {...string} arguments 
 * @returns {string}
 */
const element = (text, ...arguments) => {
    let open = '';
    let close= '';
    arguments.forEach((elem)=>{
        open += `<${elem}>`;
    });
    arguments.reverse().forEach((elem)=>{
        close+= `</${elem}>`
    });
    return `${open}${text}${close}`;
}

/**
 * @param {string} text
 * @returns {string}
 */
exports.MDtoHTML = function (text) {
    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*\*\*(.*?)\*\*\*__~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*\*\*(.*?)\*\*\*__==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*\*\*(.*?)\*\*\*==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*==\*\*(.*?)\*\*==\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*==\*(.*?)\*==\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*\*==(.*?)==\*\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*\*(.*?)\*\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*\*\*(.*?)\*\*\*~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*\*\*(.*?)\*\*\*~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*\*\*(.*?)\*\*\*==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*==\*\*(.*?)\*\*==\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*==\*(.*?)\*==\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*\*==(.*?)==\*\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*\*(.*?)\*\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*~~\*\*(.*?)\*\*~~\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*~~\*\*(.*?)\*\*~~\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==~~\*\*(.*?)\*\*~~==\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~==\*\*(.*?)\*\*==~~\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~\*\*==(.*?)==\*\*~~\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~\*\*(.*?)\*\*~~\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*~~\*(.*?)\*~~\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*~~\*(.*?)\*~~\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==~~\*(.*?)\*~~==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~==\*(.*?)\*==~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~\*==(.*?)==\*~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~\*(.*?)\*~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*\*~~(.*?)~~\*\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*\*~~(.*?)~~\*\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==\*\*~~(.*?)~~\*\*==\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==\*~~(.*?)~~\*==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*==~~(.*?)~~==\*\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*~~==(.*?)==~~\*\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*~~(.*?)~~\*\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*\*(.*?)\*\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*\*(.*?)\*\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==\*\*(.*?)\*\*==\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==\*(.*?)\*==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*==(.*?)==\*\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*(.*?)\*\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*\*__(.*?)__\*\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*\*__(.*?)__\*\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==\*\*__(.*?)__\*\*==\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==\*__(.*?)__\*==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*==__(.*?)__==\*\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*__==(.*?)==__\*\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*__(.*?)__\*\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~\*\*__(.*?)__\*\*~~\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~\*\*__(.*?)__\*\*~~==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==\*\*__(.*?)__\*\*==~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*==__(.*?)__==\*\*~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*__==(.*?)==__\*\*~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*__(.*?)__\*\*~~\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~\*__(.*?)__\*~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~\*__(.*?)__\*~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==\*__(.*?)__\*==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*==__(.*?)__==\*~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*__==(.*?)==__\*~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*__(.*?)__\*~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*~~__(.*?)__~~\*\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*~~__(.*?)__~~\*\*==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*~~__(.*?)__~~\*==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==~~__(.*?)__~~==\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~==__(.*?)__==~~\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~__==(.*?)==__~~\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~__(.*?)__~~\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*__~~(.*?)~~__\*\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*__~~(.*?)~~__\*\*==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*__~~(.*?)~~__\*==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==__~~(.*?)~~__==\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__==~~(.*?)~~==__\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__~~==(.*?)==~~__\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__~~(.*?)~~__\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*__(.*?)__\*\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*__(.*?)__\*\*==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*__(.*?)__\*==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==__(.*?)__==\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__==(.*?)==__\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__(.*?)__\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*__\*(.*?)\*__\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*__\*(.*?)\*__\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==__\*(.*?)\*__==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__==\*(.*?)\*==__\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__\*==(.*?)==\*__\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__\*(.*?)\*__\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~__\*(.*?)\*__~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~__\*(.*?)\*__~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==__\*(.*?)\*__==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__==\*(.*?)\*==__~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__\*==(.*?)==\*__~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__\*(.*?)\*__~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__~~\*(.*?)\*~~__\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__~~\*(.*?)\*~~__==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==~~\*(.*?)\*~~==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~==\*(.*?)\*==~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~\*==(.*?)==\*~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~\*(.*?)\*~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__\*~~(.*?)~~\*__\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__\*~~(.*?)~~\*__==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==\*~~(.*?)~~\*==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*==~~(.*?)~~==\*__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*~~==(.*?)==~~\*__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*~~(.*?)~~\*__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__\*(.*?)\*__\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__\*(.*?)\*__==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==\*(.*?)\*==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*==(.*?)==\*__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*(.*?)\*__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));
    

    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*__\*\*(.*?)\*\*__\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*__\*\*(.*?)\*\*__\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==__\*\*(.*?)\*\*__==\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__==\*\*(.*?)\*\*==__\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__\*\*==(.*?)==\*\*__\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__\*\*(.*?)\*\*__\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~__\*\*(.*?)\*\*__~~\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~__\*\*(.*?)\*\*__~~==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==__\*\*(.*?)\*\*__==~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__==\*\*(.*?)\*\*==__~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__\*\*==(.*?)==\*\*__~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__\*\*(.*?)\*\*__~~\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__~~\*\*(.*?)\*\*~~__\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__~~\*\*(.*?)\*\*~~__==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==~~\*\*(.*?)\*\*~~==__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~==\*\*(.*?)\*\*==~~__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~\*\*==(.*?)==\*\*~~__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~\*\*(.*?)\*\*~~__\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__\*\*~~(.*?)~~\*\*__\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__\*\*~~(.*?)~~\*\*__==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==\*\*~~(.*?)~~\*\*==__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*==~~(.*?)~~==\*\*__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*~~==(.*?)==~~\*\*__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*~~(.*?)~~\*\*__\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__\*\*(.*?)\*\*__\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__\*\*(.*?)\*\*__==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==\*\*(.*?)\*\*==__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*==(.*?)==\*\*__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*(.*?)\*\*__\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));
    


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~___\*\*(.*?)\*\*___~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==___\*\*(.*?)\*\*___==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==__\*\*(.*?)\*\*__==_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==_\*\*(.*?)\*\*_==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___==\*\*(.*?)\*\*==___~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___\*\*==(.*?)==\*\*___~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___\*\*(.*?)\*\*___~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~__\*\*(.*?)\*\*__~~_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~__\*\*(.*?)\*\*__~~==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==__\*\*(.*?)\*\*__==~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__==\*\*(.*?)\*\*==__~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__\*\*==(.*?)==\*\*__~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__\*\*(.*?)\*\*__~~_(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~_\*\*(.*?)\*\*_~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~_\*\*(.*?)\*\*_~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==_\*\*(.*?)\*\*_==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_==\*\*(.*?)\*\*==_~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_\*\*==(.*?)==\*\*_~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_\*\*(.*?)\*\*_~~__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==___~~\*\*(.*?)\*\*~~___==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__~~\*\*(.*?)\*\*~~__==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_~~\*\*(.*?)\*\*~~_==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___==~~\*\*(.*?)\*\*~~==___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~==\*\*(.*?)\*\*==~~___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~\*\*==(.*?)==\*\*~~___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~\*\*(.*?)\*\*~~___(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==___\*\*~~(.*?)~~\*\*___==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__\*\*~~(.*?)~~\*\*__==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_\*\*~~(.*?)~~\*\*_==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___==\*\*~~(.*?)~~\*\*==___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*==~~(.*?)~~==\*\*___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*~~==(.*?)==~~\*\*___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*~~(.*?)~~\*\*___(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==___\*\*(.*?)\*\*___==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__\*\*(.*?)\*\*__==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_\*\*(.*?)\*\*_==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___==\*\*(.*?)\*\*==___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*==(.*?)==\*\*___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*(.*?)\*\*___(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*___(.*?)___\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*___(.*?)___\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==___(.*?)___==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*_==__(.*?)__==_\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__==_(.*?)_==__\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*___==(.*?)==___\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*___(.*?)___\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~___(.*?)___~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~___(.*?)___~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==___(.*?)___==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~_==__(.*?)__==_~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__==_(.*?)_==__~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~___==(.*?)==___~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~___(.*?)___~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*_~~__(.*?)__~~_\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==_~~__(.*?)__~~_==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==~~__(.*?)__~~==_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~==__(.*?)__==~~_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~__==(.*?)==__~~_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~__(.*?)__~~_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__~~_(.*?)_~~__\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__~~_(.*?)_~~__==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==~~_(.*?)_~~==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~==_(.*?)_==~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~_==(.*?)==_~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~_(.*?)_~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*___~~(.*?)~~___\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==___~~(.*?)~~___==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==__~~(.*?)~~__==_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==_~~(.*?)~~_==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___==~~(.*?)~~==___\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___~~==(.*?)==~~___\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___~~(.*?)~~___\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*___(.*?)___\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==___(.*?)___==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==__(.*?)__==_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==_(.*?)_==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___==(.*?)==___\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___(.*?)___\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*\*_(.*?)_\*\*__~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*\*_(.*?)_\*\*__==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*\*_(.*?)_\*\*==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*==_(.*?)_==\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*_==(.*?)==_\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*_(.*?)_\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*\*_(.*?)_\*\*~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*\*_(.*?)_\*\*~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*\*_(.*?)_\*\*==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*==_(.*?)_==\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*_==(.*?)==_\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*_(.*?)_\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*~~_(.*?)_~~\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*~~_(.*?)_~~\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==~~_(.*?)_~~==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~==_(.*?)_==~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~_==(.*?)==_~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~_(.*?)_~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*_~~(.*?)~~_\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*_~~(.*?)~~_\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==_~~(.*?)~~_==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_==~~(.*?)~~==_\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_~~==(.*?)==~~_\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_~~(.*?)~~_\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*_(.*?)_\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*_(.*?)_\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==_(.*?)_==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_==(.*?)==_\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_(.*?)_\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~_\*\*__(.*?)__\*\*_~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==_\*\*__(.*?)__\*\*_==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==\*\*__(.*?)__\*\*==_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*==__(.*?)__==\*\*_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*__==(.*?)==__\*\*_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*__(.*?)__\*\*_~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~\*\*__(.*?)__\*\*~~_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~\*\*__(.*?)__\*\*~~==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==\*\*__(.*?)__\*\*==~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*==__(.*?)__==\*\*~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*__==(.*?)==__\*\*~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*__(.*?)__\*\*~~_(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*~~__(.*?)__~~\*\*_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*~~__(.*?)__~~\*\*==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==~~__(.*?)__~~==\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~==__(.*?)__==~~\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~__==(.*?)==__~~\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~__(.*?)__~~\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*__~~(.*?)~~__\*\*_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*__~~(.*?)~~__\*\*==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==__~~(.*?)~~__==\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__==~~(.*?)~~==__\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__~~==(.*?)==~~__\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__~~(.*?)~~__\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*__(.*?)__\*\*_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*__(.*?)__\*\*==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==__(.*?)__==\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__==(.*?)==__\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__(.*?)__\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','em','u','strong'));



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*\*(.*?)\*\*__~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*\*(.*?)\*\*__==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*\*(.*?)\*\*==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*==(.*?)==\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*(.*?)\*\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','strong','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*\*(.*?)\*\*~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*\*(.*?)\*\*~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*\*(.*?)\*\*==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*==(.*?)==\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*(.*?)\*\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','strong','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*~~(.*?)~~\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*~~(.*?)~~\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==~~(.*?)~~==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~==(.*?)==~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~(.*?)~~\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','strong','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*(.*?)\*\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*(.*?)\*\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==(.*?)==\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*(.*?)\*\*__(?=\s|[.,!?;:]|$)/g, element('$1','strong','u'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*__(.*?)__\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*__(.*?)__\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==__(.*?)__==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__==(.*?)==__\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__(.*?)__\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','strong','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~__(.*?)__~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~__(.*?)__~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==__(.*?)__==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__==(.*?)==__~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__(.*?)__~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','strong','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__~~(.*?)~~__\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__~~(.*?)~~__==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==~~(.*?)~~==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~==(.*?)==~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~(.*?)~~__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','strong','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__(.*?)__\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__(.*?)__==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==(.*?)==__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__(.*?)__\*\*(?=\s|[.,!?;:]|$)/g, element('$1','strong','u'));



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~___(.*?)___~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==___(.*?)___==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==__(.*?)__==_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==_(.*?)_==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___==(.*?)==___~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___(.*?)___~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~__(.*?)__~~_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~__(.*?)__~~==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==__(.*?)__==~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__==(.*?)==__~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__(.*?)__~~_(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~_(.*?)_~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~_(.*?)_~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==_(.*?)_==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_==(.*?)==_~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_(.*?)_~~__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==___~~(.*?)~~___==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__~~(.*?)~~__==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_~~(.*?)~~_==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___==~~(.*?)~~==___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~==(.*?)==~~___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~(.*?)~~___(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==___(.*?)___==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__(.*?)__==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_(.*?)_==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___==(.*?)==___(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])___(.*?)___(?=\s|[.,!?;:]|$)/g, element('$1','em','u'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*\*(.*?)\*\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*\*(.*?)\*\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==\*\*(.*?)\*\*==\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==\*(.*?)\*==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*==(.*?)==\*\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*(.*?)\*\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~\*\*(.*?)\*\*~~\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~\*\*(.*?)\*\*~~==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==\*\*(.*?)\*\*==~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*==(.*?)==\*\*~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*(.*?)\*\*~~\*(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~\*(.*?)\*~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~\*(.*?)\*~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==\*(.*?)\*==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*==(.*?)==\*~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*(.*?)\*~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*~~(.*?)~~\*\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*~~(.*?)~~\*\*==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*~~(.*?)~~\*==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==~~(.*?)~~==\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~==(.*?)==~~\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~(.*?)~~\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*(.*?)\*\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*(.*?)\*\*==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*(.*?)\*==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==(.*?)==\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*(.*?)\*\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','strong'));



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~_\*\*(.*?)\*\*_~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==_\*\*(.*?)\*\*_==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==\*\*(.*?)\*\*==_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*==(.*?)==\*\*_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*(.*?)\*\*_~~(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~\*\*(.*?)\*\*~~_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~\*\*(.*?)\*\*~~==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==\*\*(.*?)\*\*==~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*==(.*?)==\*\*~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*(.*?)\*\*~~_(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*~~(.*?)~~\*\*_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*~~(.*?)~~\*\*==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==~~(.*?)~~==\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~==(.*?)==~~\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~(.*?)~~\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*(.*?)\*\*_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*(.*?)\*\*==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==(.*?)==\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*(.*?)\*\*_(?=\s|[.,!?;:]|$)/g, element('$1','em','strong'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*_(.*?)_\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*_(.*?)_\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==_(.*?)_==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*_==(.*?)==_\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*_(.*?)_\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~_(.*?)_~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~_(.*?)_~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==_(.*?)_==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~_==(.*?)==_~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~_(.*?)_~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*_~~(.*?)~~_\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==_~~(.*?)~~_==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==~~(.*?)~~==_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~==(.*?)==~~_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~(.*?)~~_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*_(.*?)_\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==_(.*?)_==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==(.*?)==_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_(.*?)_\*\*(?=\s|[.,!?;:]|$)/g, element('$1','em','strong'));



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*(.*?)\*__~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*(.*?)\*__==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*(.*?)\*==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*==(.*?)==\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*(.*?)\*__~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*(.*?)\*~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*(.*?)\*~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*(.*?)\*==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*==(.*?)==\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*(.*?)\*~~__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*~~(.*?)~~\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*~~(.*?)~~\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==~~(.*?)~~==\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~==(.*?)==~~\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~(.*?)~~\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*(.*?)\*__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*(.*?)\*==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==(.*?)==\*__(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*(.*?)\*__(?=\s|[.,!?;:]|$)/g, element('$1','em','u'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*__(.*?)__\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*__(.*?)__\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==__(.*?)__==\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__==(.*?)==__\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__(.*?)__\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~__(.*?)__~~\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~__(.*?)__~~==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==__(.*?)__==~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__==(.*?)==__~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__(.*?)__~~\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__~~(.*?)~~__\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__~~(.*?)~~__==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==~~(.*?)~~==__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~==(.*?)==~~__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~(.*?)~~__\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u','del'));
    
    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__(.*?)__\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__(.*?)__==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==(.*?)==__\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__(.*?)__\*(?=\s|[.,!?;:]|$)/g, element('$1','em','u'));



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__(.*?)__~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__(.*?)__==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==(.*?)==__~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__(.*?)__~~(?=\s|[.,!?;:]|$)/g, element('$1','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~(.*?)~~__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~(.*?)~~==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==(.*?)==~~__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~(.*?)~~__(?=\s|[.,!?;:]|$)/g, element('$1','u','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==__(.*?)__==(?=\s|[.,!?;:]|$)/g, element('$1','mark','u'));
    text = text.replace(/(?<=\s|^|[.,!?;:])__==(.*?)==__(?=\s|[.,!?;:]|$)/g, element('$1','mark','u'));
    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])__(.*?)__(?=\\s|[${all}]|$)`, 'g'), element('$1','u'));
    

    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*(.*?)\*\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*(.*?)\*\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==(.*?)==\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*(.*?)\*\*~~(?=\s|[.,!?;:]|$)/g, element('$1','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~(.*?)~~\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~(.*?)~~==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==(.*?)==~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','del','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~(.*?)~~\*\*(?=\s|[.,!?;:]|$)/g, element('$1','del','strong'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*(.*?)\*\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','strong'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==(.*?)==\*\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','strong'));
    text = text.replace(/\*\*(.*?)\*\*/g, element('$1','strong'));



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~_(.*?)_~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==_(.*?)_==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==(.*?)==_~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_(.*?)_~~(?=\s|[.,!?;:]|$)/g, element('$1','em','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~(.*?)~~_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~(.*?)~~==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==(.*?)==~~_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~(.*?)~~_(?=\s|[.,!?;:]|$)/g, element('$1','em','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==_(.*?)_==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em'));
    text = text.replace(/(?<=\s|^|[.,!?;:])_==(.*?)==_(?=\s|[.,!?;:]|$)/g, element('$1','mark','em'));
    text = text.replace(new RegExp(`(?<=\\s|^|[${all.replaceAll('_','')}])_(.*?)_(?=\\s|[${all.replaceAll('_','')}]|$)`, 'g'), element('$1','em'));


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*(.*?)\*~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*(.*?)\*==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==(.*?)==\*~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*(.*?)\*~~(?=\s|[.,!?;:]|$)/g, element('$1','em','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~(.*?)~~\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~(.*?)~~==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==(.*?)==~~\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~(.*?)~~\*(?=\s|[.,!?;:]|$)/g, element('$1','em','del'));

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*(.*?)\*==(?=\s|[.,!?;:]|$)/g, element('$1','mark','em'));
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==(.*?)==\*(?=\s|[.,!?;:]|$)/g, element('$1','mark','em'));
    text = text.replace(new RegExp(`(?<=\\s|^|[${all.replaceAll('*','')}])\\*(.*?)\\*(?=\\s|[${all.replaceAll('*','')}]|$)`, 'g'), element('$1','em'));



    text = text.replace(/(?<=\s|^|[.,!?;:])~~==(.*?)==~~(?=\s|[.,!?;:]|$)/g, element('$1','mark','del'));
    text = text.replace(/(?<=\s|^|[.,!?;:])==~~(.*?)~~==(?=\s|[.,!?;:]|$)/g, element('$1','mark','del'));


    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])~~(.*?)~~(?=\\s|[${all}]|$)`, 'g'), element('$1','del'));
    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])==(.*?)==(?=\\s|[${all}]|$)`, 'g'), element('$1','mark'));

    return text;
}