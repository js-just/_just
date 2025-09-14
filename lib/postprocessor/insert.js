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

const fs = require('fs').promises;
const path = require('path');
const { err } = require('../line');

async function getFiles(dir) {
    const results = [];
    const directoriesToProcess = [dir];
    
    while (directoriesToProcess.length > 0) {
        const currentDir = directoriesToProcess.pop();
        
        try {
            const entries = await fs.readdir(currentDir, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(currentDir, entry.name);
                
                if (entry.isDirectory()) {
                    directoriesToProcess.push(fullPath);
                } else if (entry.isFile() && path.extname(entry.name) === '.html') {
                    results.push(fullPath);
                }
            }
        } catch (error) {
            console.log(error);
            console.log('::warning::'+error)
            throw error;
        }
    }
    
    return results;
}

async function processFile(file, htmlHead) {
    try {
        const content = await fs.readFile(file, 'utf8');
        const updatedContent = content.replace('<head>', `<head>${htmlHead}`);
        
        if (content !== updatedContent) {
            await fs.writeFile(file, updatedContent, 'utf8');
        }
    } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        throw error;
    }
}

exports.insert = async function (config, inputPath) {
    if (!config.insert?.htmlHead) {
        return; 
    }

    try {
        const files = await getFiles(inputPath);
        
        const concurrencyLimit = 10;
        const processingPromises = [];
        
        for (let i = 0; i < files.length; i += concurrencyLimit) {
            const batch = files.slice(i, i + concurrencyLimit);
            const batchPromises = batch.map(file => 
                processFile(file, config.insert.htmlHead)
            );
            
            processingPromises.push(Promise.all(batchPromises));
            await Promise.all(batchPromises);
        }
        
        await Promise.all(processingPromises);
        
    } catch (error) {
        console.log(error);
        console.log('::warning::'+error);
        throw error;
    }

    return;
}
