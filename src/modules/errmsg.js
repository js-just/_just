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

const { exec } = require('child_process');
/**
 * @param {string} code
 * @param {string} message
 * @param {string} type
 * @returns {Promise<string>}
 */
exports.errormessage = function (code, message, type = 'Error') {
    const de = 'Debug: Error ';
    console.log(`${de}code: ${code}\n${de}type: ${type}\n${de}message: ${message}`);
    type = type == "Error" ? `[0;31m${type}` : `[0;33m${type}`;
    message = message.replaceAll('"', '\\"');
    return new Promise((resolve, reject) => {
        exec(`bash -c 'source $GITHUB_ACTION_PATH/src/modules/errmsg.sh && mkdir _just_data && echo "$(customErrorMessage "${type}" "${code}" "${message}")" > "_just_data/e.txt" && echo -e "$(customErrorMessage "${type}" "${code}" "${message}")"'`, (error, stdout, stderr) => {
        if (error) {
            exec(`bash -c 'source $GITHUB_ACTION_PATH/src/modules/errmsg.sh && mkdir _just_data && echo -e "$(customErrorMessage "${type}" "${code}" "${message}")"'`, (error2, stdout2, stderr2) => {
                if (!error2) {
                    resolve(stdout2);
                } else {
                    reject(`Error 1: ${stderr}, Error 2: ${stderr2}`);
                }
            })
        } else {
            resolve(stdout);
        }
        });
    });
};
exports.prefix = '[2;45m[1;30m_just[0m: ';