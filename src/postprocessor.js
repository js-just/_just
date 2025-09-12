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

const _just = {};
const fs = require('fs').promises;
const path = require('path');

async function loadConfig() {
    try {
        const configData = await fs.readFile('just.config.json', 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        console.error('Error loading config:', error);
        process.exit(1);
    }
}

async function main() {
    const [inputPath, inputFixPath, VERSION] = process.argv.slice(2);
    
    const [config, domainModule, sitemapModule] = await Promise.all([
        loadConfig(),
        import('../lib/domain.js').catch(() => null),
        import('../lib/postprocessor/sitemap.js').catch(() => null)
    ]);

    const debug_ = config.debug || false;
    const esc = '\x1B';
    const debuglog = (text) => {
        if (debug_) console.log(`${_just.error?.prefix || ''}${esc}[0;36mDebug: ${text}`);
    };

    const tasks = [];

    if (config.mode === 'void' && domainModule) {
        _just.domain = domainModule;
        const { checkdomain, checkTLD } = _just.domain;
        const domain = checkdomain(config.domain, true) || undefined;
        
        if (domain) {
            tasks.push(
                checkTLD(domain)
                    .then(debuglog)
                    .catch(() => {})
            );
        }
    }

    if (config.sitemap && sitemapModule) {
        tasks.push(
            sitemapModule.sitemap(config, inputPath, inputFixPath)
                .then(debuglog)
                .catch(() => {})
        );
    }

    await Promise.allSettled(tasks);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
