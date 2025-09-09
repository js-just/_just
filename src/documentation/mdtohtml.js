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
 * @param {Array} cssclass
 * @returns {string}
 */
exports.MDtoHTML = function (text, cssclass) {
    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*\*\*(.*?)\*\*\*__~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*\*\*(.*?)\*\*\*__==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*\*\*(.*?)\*\*\*==__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*==\*\*(.*?)\*\*==\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*==\*(.*?)\*==\*\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*\*==(.*?)==\*\*\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*\*(.*?)\*\*\*__~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*\*\*(.*?)\*\*\*~~__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*\*\*(.*?)\*\*\*~~==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*\*\*(.*?)\*\*\*==~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*==\*\*(.*?)\*\*==\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*==\*(.*?)\*==\*\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*\*==(.*?)==\*\*\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*\*(.*?)\*\*\*~~__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*~~\*\*(.*?)\*\*~~\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*~~\*\*(.*?)\*\*~~\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==~~\*\*(.*?)\*\*~~==\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~==\*\*(.*?)\*\*==~~\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~\*\*==(.*?)==\*\*~~\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~\*\*(.*?)\*\*~~\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*~~\*(.*?)\*~~\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*~~\*(.*?)\*~~\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==~~\*(.*?)\*~~==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~==\*(.*?)\*==~~\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~\*==(.*?)==\*~~\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~\*(.*?)\*~~\*\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*\*~~(.*?)~~\*\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*\*~~(.*?)~~\*\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==\*\*~~(.*?)~~\*\*==\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==\*~~(.*?)~~\*==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*==~~(.*?)~~==\*\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*~~==(.*?)==~~\*\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*~~(.*?)~~\*\*\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*\*(.*?)\*\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*\*(.*?)\*\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==\*\*(.*?)\*\*==\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==\*(.*?)\*==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*==(.*?)==\*\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*\*(.*?)\*\*\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*\*__(.*?)__\*\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*\*__(.*?)__\*\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==\*\*__(.*?)__\*\*==\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==\*__(.*?)__\*==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*==__(.*?)__==\*\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*__==(.*?)==__\*\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*__(.*?)__\*\*\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~\*\*__(.*?)__\*\*~~\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~\*\*__(.*?)__\*\*~~==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==\*\*__(.*?)__\*\*==~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*==__(.*?)__==\*\*~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*__==(.*?)==__\*\*~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*__(.*?)__\*\*~~\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~\*__(.*?)__\*~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~\*__(.*?)__\*~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==\*__(.*?)__\*==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*==__(.*?)__==\*~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*__==(.*?)==__\*~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*__(.*?)__\*~~\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*~~__(.*?)__~~\*\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*~~__(.*?)__~~\*\*==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*~~__(.*?)__~~\*==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==~~__(.*?)__~~==\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~==__(.*?)__==~~\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~__==(.*?)==__~~\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~__(.*?)__~~\*\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*__~~(.*?)~~__\*\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*__~~(.*?)~~__\*\*==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*__~~(.*?)~~__\*==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==__~~(.*?)~~__==\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__==~~(.*?)~~==__\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__~~==(.*?)==~~__\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__~~(.*?)~~__\*\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*__(.*?)__\*\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*__(.*?)__\*\*==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*__(.*?)__\*==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==__(.*?)__==\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__==(.*?)==__\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*__(.*?)__\*\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*__\*(.*?)\*__\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*__\*(.*?)\*__\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==__\*(.*?)\*__==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__==\*(.*?)\*==__\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__\*==(.*?)==\*__\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__\*(.*?)\*__\*\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~__\*(.*?)\*__~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~__\*(.*?)\*__~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==__\*(.*?)\*__==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__==\*(.*?)\*==__~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__\*==(.*?)==\*__~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__\*(.*?)\*__~~\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__~~\*(.*?)\*~~__\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__~~\*(.*?)\*~~__==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==~~\*(.*?)\*~~==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~==\*(.*?)\*==~~__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~\*==(.*?)==\*~~__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~\*(.*?)\*~~__\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__\*~~(.*?)~~\*__\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__\*~~(.*?)~~\*__==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==\*~~(.*?)~~\*==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*==~~(.*?)~~==\*__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*~~==(.*?)==~~\*__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*~~(.*?)~~\*__\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__\*(.*?)\*__\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__\*(.*?)\*__==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==\*(.*?)\*==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*==(.*?)==\*__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__\*(.*?)\*__\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);
    

    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*__\*\*(.*?)\*\*__\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*__\*\*(.*?)\*\*__\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==__\*\*(.*?)\*\*__==\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__==\*\*(.*?)\*\*==__\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__\*\*==(.*?)==\*\*__\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__\*\*(.*?)\*\*__\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~__\*\*(.*?)\*\*__~~\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~__\*\*(.*?)\*\*__~~==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==__\*\*(.*?)\*\*__==~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__==\*\*(.*?)\*\*==__~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__\*\*==(.*?)==\*\*__~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__\*\*(.*?)\*\*__~~\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__~~\*\*(.*?)\*\*~~__\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__~~\*\*(.*?)\*\*~~__==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==~~\*\*(.*?)\*\*~~==__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~==\*\*(.*?)\*\*==~~__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~\*\*==(.*?)==\*\*~~__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~\*\*(.*?)\*\*~~__\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__\*\*~~(.*?)~~\*\*__\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__\*\*~~(.*?)~~\*\*__==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==\*\*~~(.*?)~~\*\*==__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*==~~(.*?)~~==\*\*__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*~~==(.*?)==~~\*\*__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*~~(.*?)~~\*\*__\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__\*\*(.*?)\*\*__\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__\*\*(.*?)\*\*__==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==\*\*(.*?)\*\*==__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*==(.*?)==\*\*__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__\*\*(.*?)\*\*__\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);
    


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~___\*\*(.*?)\*\*___~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==___\*\*(.*?)\*\*___==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==__\*\*(.*?)\*\*__==_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==_\*\*(.*?)\*\*_==__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___==\*\*(.*?)\*\*==___~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___\*\*==(.*?)==\*\*___~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___\*\*(.*?)\*\*___~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~__\*\*(.*?)\*\*__~~_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~__\*\*(.*?)\*\*__~~==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==__\*\*(.*?)\*\*__==~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__==\*\*(.*?)\*\*==__~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__\*\*==(.*?)==\*\*__~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__\*\*(.*?)\*\*__~~_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~_\*\*(.*?)\*\*_~~__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~_\*\*(.*?)\*\*_~~==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==_\*\*(.*?)\*\*_==~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_==\*\*(.*?)\*\*==_~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_\*\*==(.*?)==\*\*_~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_\*\*(.*?)\*\*_~~__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==___~~\*\*(.*?)\*\*~~___==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__~~\*\*(.*?)\*\*~~__==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_~~\*\*(.*?)\*\*~~_==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___==~~\*\*(.*?)\*\*~~==___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~==\*\*(.*?)\*\*==~~___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~\*\*==(.*?)==\*\*~~___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~\*\*(.*?)\*\*~~___(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==___\*\*~~(.*?)~~\*\*___==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__\*\*~~(.*?)~~\*\*__==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_\*\*~~(.*?)~~\*\*_==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___==\*\*~~(.*?)~~\*\*==___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*==~~(.*?)~~==\*\*___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*~~==(.*?)==~~\*\*___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*~~(.*?)~~\*\*___(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==___\*\*(.*?)\*\*___==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__\*\*(.*?)\*\*__==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_\*\*(.*?)\*\*_==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___==\*\*(.*?)\*\*==___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*==(.*?)==\*\*___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___\*\*(.*?)\*\*___(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*___(.*?)___\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*___(.*?)___\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==___(.*?)___==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*_==__(.*?)__==_\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__==_(.*?)_==__\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*___==(.*?)==___\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*___(.*?)___\*\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~___(.*?)___~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~___(.*?)___~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==___(.*?)___==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~_==__(.*?)__==_~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__==_(.*?)_==__~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~___==(.*?)==___~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~___(.*?)___~~\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*_~~__(.*?)__~~_\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==_~~__(.*?)__~~_==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==~~__(.*?)__~~==_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~==__(.*?)__==~~_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~__==(.*?)==__~~_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~__(.*?)__~~_\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__~~_(.*?)_~~__\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__~~_(.*?)_~~__==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==~~_(.*?)_~~==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~==_(.*?)_==~~__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~_==(.*?)==_~~__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~_(.*?)_~~__\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*___~~(.*?)~~___\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==___~~(.*?)~~___==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==__~~(.*?)~~__==_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==_~~(.*?)~~_==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___==~~(.*?)~~==___\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___~~==(.*?)==~~___\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___~~(.*?)~~___\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*___(.*?)___\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==___(.*?)___==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==__(.*?)__==_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==_(.*?)_==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___==(.*?)==___\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*___(.*?)___\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*\*_(.*?)_\*\*__~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*\*_(.*?)_\*\*__==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*\*_(.*?)_\*\*==__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*==_(.*?)_==\*\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*_==(.*?)==_\*\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*_(.*?)_\*\*__~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*\*_(.*?)_\*\*~~__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*\*_(.*?)_\*\*~~==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*\*_(.*?)_\*\*==~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*==_(.*?)_==\*\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*_==(.*?)==_\*\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*_(.*?)_\*\*~~__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*~~_(.*?)_~~\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*~~_(.*?)_~~\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==~~_(.*?)_~~==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~==_(.*?)_==~~\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~_==(.*?)==_~~\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~_(.*?)_~~\*\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*_~~(.*?)~~_\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*_~~(.*?)~~_\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==_~~(.*?)~~_==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_==~~(.*?)~~==_\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_~~==(.*?)==~~_\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_~~(.*?)~~_\*\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*_(.*?)_\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*_(.*?)_\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==_(.*?)_==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_==(.*?)==_\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*_(.*?)_\*\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~_\*\*__(.*?)__\*\*_~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==_\*\*__(.*?)__\*\*_==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==\*\*__(.*?)__\*\*==_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*==__(.*?)__==\*\*_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*__==(.*?)==__\*\*_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*__(.*?)__\*\*_~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~\*\*__(.*?)__\*\*~~_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~\*\*__(.*?)__\*\*~~==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==\*\*__(.*?)__\*\*==~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*==__(.*?)__==\*\*~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*__==(.*?)==__\*\*~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*__(.*?)__\*\*~~_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*~~__(.*?)__~~\*\*_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*~~__(.*?)__~~\*\*==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==~~__(.*?)__~~==\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~==__(.*?)__==~~\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~__==(.*?)==__~~\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~__(.*?)__~~\*\*_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*__~~(.*?)~~__\*\*_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*__~~(.*?)~~__\*\*==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==__~~(.*?)~~__==\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__==~~(.*?)~~==__\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__~~==(.*?)==~~__\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__~~(.*?)~~__\*\*_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*__(.*?)__\*\*_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*__(.*?)__\*\*==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==__(.*?)__==\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__==(.*?)==__\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*__(.*?)__\*\*_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}"><strong>$1</strong></em>`);



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*\*(.*?)\*\*__~~==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*\*(.*?)\*\*__==~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*\*(.*?)\*\*==__~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*==(.*?)==\*\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*\*(.*?)\*\*__~~(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*\*(.*?)\*\*~~__==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*\*(.*?)\*\*~~==__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*\*(.*?)\*\*==~~__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*==(.*?)==\*\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*\*(.*?)\*\*~~__(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*~~(.*?)~~\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*~~(.*?)~~\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==~~(.*?)~~==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~==(.*?)==~~\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*~~(.*?)~~\*\*__(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*\*(.*?)\*\*__==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*\*(.*?)\*\*==__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*==(.*?)==\*\*__(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*\*(.*?)\*\*__(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline}">$1</strong>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*__(.*?)__\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*__(.*?)__\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==__(.*?)__==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__==(.*?)==__\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*__(.*?)__\*\*~~(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~__(.*?)__~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~__(.*?)__~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==__(.*?)__==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__==(.*?)==__~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~__(.*?)__~~\*\*(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__~~(.*?)~~__\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__~~(.*?)~~__==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==~~(.*?)~~==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~==(.*?)==~~__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__~~(.*?)~~__\*\*(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline} ${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*__(.*?)__\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==__(.*?)__==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__==(.*?)==__\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass.underline}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*__(.*?)__\*\*(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass.underline}">$1</strong>`);



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~___(.*?)___~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==___(.*?)___==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==__(.*?)__==_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==_(.*?)_==__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___==(.*?)==___~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~___(.*?)___~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~__(.*?)__~~_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~__(.*?)__~~==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==__(.*?)__==~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__==(.*?)==__~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~__(.*?)__~~_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~_(.*?)_~~__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~_(.*?)_~~==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==_(.*?)_==~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_==(.*?)==_~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~_(.*?)_~~__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==___~~(.*?)~~___==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__~~(.*?)~~__==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_~~(.*?)~~_==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___==~~(.*?)~~==___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~==(.*?)==~~___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___~~(.*?)~~___(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==___(.*?)___==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==__(.*?)__==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==_(.*?)_==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___==(.*?)==___(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])___(.*?)___(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}">$1</em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*\*(.*?)\*\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*\*(.*?)\*\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==\*\*(.*?)\*\*==\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==\*(.*?)\*==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*==(.*?)==\*\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*\*(.*?)\*\*\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~\*\*(.*?)\*\*~~\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~\*\*(.*?)\*\*~~==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==\*\*(.*?)\*\*==~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*==(.*?)==\*\*~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~\*\*(.*?)\*\*~~\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~\*(.*?)\*~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~\*(.*?)\*~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==\*(.*?)\*==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*==(.*?)==\*~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~\*(.*?)\*~~\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*~~(.*?)~~\*\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*~~(.*?)~~\*\*==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*~~(.*?)~~\*==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==~~(.*?)~~==\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~==(.*?)==~~\*\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*~~(.*?)~~\*\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*\*(.*?)\*\*\*==(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==\*\*(.*?)\*\*==\*(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==\*(.*?)\*==\*\*(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*==(.*?)==\*\*\*(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*\*(.*?)\*\*\*(?=\s|[.,!?;:]|$)/g, '<em><strong>$1</strong></em>');



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~_\*\*(.*?)\*\*_~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==_\*\*(.*?)\*\*_==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==\*\*(.*?)\*\*==_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*==(.*?)==\*\*_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_\*\*(.*?)\*\*_~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~\*\*(.*?)\*\*~~_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~\*\*(.*?)\*\*~~==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==\*\*(.*?)\*\*==~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*==(.*?)==\*\*~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~\*\*(.*?)\*\*~~_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*~~(.*?)~~\*\*_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*~~(.*?)~~\*\*==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==~~(.*?)~~==\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~==(.*?)==~~\*\*_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*~~(.*?)~~\*\*_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_\*\*(.*?)\*\*_==(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])_==\*\*(.*?)\*\*==_(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*==(.*?)==\*\*_(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])_\*\*(.*?)\*\*_(?=\s|[.,!?;:]|$)/g, '<em><strong>$1</strong></em>');


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*_(.*?)_\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*_(.*?)_\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==_(.*?)_==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*_==(.*?)==_\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*_(.*?)_\*\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~_(.*?)_~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~_(.*?)_~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==_(.*?)_==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~_==(.*?)==_~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~_(.*?)_~~\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*_~~(.*?)~~_\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==_~~(.*?)~~_==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==~~(.*?)~~==_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~==(.*?)==~~_\*\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}"><strong>$1</strong></em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_~~(.*?)~~_\*\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}"><strong>$1</strong></em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*_(.*?)_\*\*==(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==_(.*?)_==\*\*(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_==(.*?)==_\*\*(?=\s|[.,!?;:]|$)/g, '<mark><em><strong>$1</strong></em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*_(.*?)_\*\*(?=\s|[.,!?;:]|$)/g, '<em><strong>$1</strong></em>');



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__\*(.*?)\*__~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__\*(.*?)\*__==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==\*(.*?)\*==__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*==(.*?)==\*__~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__\*(.*?)\*__~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~\*(.*?)\*~~__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~\*(.*?)\*~~==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==\*(.*?)\*==~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*==(.*?)==\*~~__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~\*(.*?)\*~~__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*~~(.*?)~~\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*~~(.*?)~~\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==~~(.*?)~~==\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~==(.*?)==~~\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*~~(.*?)~~\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__\*(.*?)\*__==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==\*(.*?)\*==__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*==(.*?)==\*__(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__\*(.*?)\*__(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}">$1</em>`);


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*__(.*?)__\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*__(.*?)__\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==__(.*?)__==\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__==(.*?)==__\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*__(.*?)__\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~__(.*?)__~~\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~__(.*?)__~~==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==__(.*?)__==~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__==(.*?)==__~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~__(.*?)__~~\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__~~(.*?)~~__\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__~~(.*?)~~__==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==~~(.*?)~~==__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~==(.*?)==~~__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__~~(.*?)~~__\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline} ${cssclass["line-through"]}">$1</em>`);
    
    text = text.replace(/(?<=\s|^|[.,!?;:])==\*__(.*?)__\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==__(.*?)__==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__==(.*?)==__\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass.underline}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*__(.*?)__\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass.underline}">$1</em>`);



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~__(.*?)__~~==(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline} ${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==__(.*?)__==~~(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline} ${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__==(.*?)==__~~(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline} ${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~__(.*?)__~~(?=\s|[.,!?;:]|$)/g, `<del class="${cssclass.underline}">$1</del>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__~~(.*?)~~__==(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline} ${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==~~(.*?)~~==__(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline} ${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~==(.*?)==~~__(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline} ${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__~~(.*?)~~__(?=\s|[.,!?;:]|$)/g, `<del class="${cssclass.underline}">$1</del>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==__(.*?)__==(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])__==(.*?)==__(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass.underline}">$1</mark>`);
    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])__(.*?)__(?=\\s|[${all}]|$)`, 'g'), `<u>$1</u>`);
    

    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*\*(.*?)\*\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*\*(.*?)\*\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*==(.*?)==\*\*~~(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*\*(.*?)\*\*~~(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*~~(.*?)~~\*\*==(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==~~(.*?)~~==\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~==(.*?)==~~\*\*(?=\s|[.,!?;:]|$)/g, `<mark><strong class="${cssclass["line-through"]}">$1</strong></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*~~(.*?)~~\*\*(?=\s|[.,!?;:]|$)/g, `<strong class="${cssclass["line-through"]}">$1</strong>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*\*(.*?)\*\*==(?=\s|[.,!?;:]|$)/g, '<mark><strong>$1</strong></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*\*==(.*?)==\*\*(?=\s|[.,!?;:]|$)/g, '<mark><strong>$1</strong></mark>');
    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])\\*\\*(.*?)\\*\\*(?=\\s|[${all}]|$)`, 'g'), '<strong>$1</strong>');



    text = text.replace(/(?<=\s|^|[.,!?;:])==~~_(.*?)_~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==_(.*?)_==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_==(.*?)==_~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~_(.*?)_~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_~~(.*?)~~_==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_==~~(.*?)~~==_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~==(.*?)==~~_(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])_~~(.*?)~~_(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==_(.*?)_==(?=\s|[.,!?;:]|$)/g, '<mark><em>$1</em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])_==(.*?)==_(?=\s|[.,!?;:]|$)/g, '<mark><em>$1</em></mark>');
    text = text.replace(new RegExp(`(?<=\\s|^|[${all.replaceAll('_','')}])_(.*?)_(?=\\s|[${all.replaceAll('_','')}]|$)`, 'g'), '<em>$1</em>');


    text = text.replace(/(?<=\s|^|[.,!?;:])==~~\*(.*?)\*~~==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~==\*(.*?)\*==~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*==(.*?)==\*~~(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])~~\*(.*?)\*~~(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*~~(.*?)~~\*==(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==~~(.*?)~~==\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~==(.*?)==~~\*(?=\s|[.,!?;:]|$)/g, `<mark><em class="${cssclass["line-through"]}">$1</em></mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])\*~~(.*?)~~\*(?=\s|[.,!?;:]|$)/g, `<em class="${cssclass["line-through"]}">$1</em>`);

    text = text.replace(/(?<=\s|^|[.,!?;:])==\*(.*?)\*==(?=\s|[.,!?;:]|$)/g, '<mark><em>$1</em></mark>');
    text = text.replace(/(?<=\s|^|[.,!?;:])\*==(.*?)==\*(?=\s|[.,!?;:]|$)/g, '<mark><em>$1</em></mark>');
    text = text.replace(new RegExp(`(?<=\\s|^|[${all.replaceAll('*','')}])\\*(.*?)\\*(?=\\s|[${all.replaceAll('*','')}]|$)`, 'g'), '<em>$1</em>');



    text = text.replace(/(?<=\s|^|[.,!?;:])~~==(.*?)==~~(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass["line-through"]}">$1</mark>`);
    text = text.replace(/(?<=\s|^|[.,!?;:])==~~(.*?)~~==(?=\s|[.,!?;:]|$)/g, `<mark class="${cssclass["line-through"]}">$1</mark>`);


    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])~~(.*?)~~(?=\\s|[${all}]|$)`, 'g'), `<del>$1</del>`);
    text = text.replace(new RegExp(`(?<=\\s|^|[${all}])==(.*?)==(?=\\s|[${all}]|$)`, 'g'), `<mark>$1</mark>`);

    return text;
}