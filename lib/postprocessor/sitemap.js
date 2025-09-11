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
const _just_error = require('../errmsg.js');

async function getHtmlFiles(baseDir) {
    const results = [];
    const directoriesToProcess = [baseDir];
    
    while (directoriesToProcess.length > 0) {
        const currentDir = directoriesToProcess.pop();
        
        try {
            const entries = await fs.readdir(currentDir, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(currentDir, entry.name);
                
                if (entry.isDirectory()) {
                    directoriesToProcess.push(fullPath);
                } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.html') {
                    const relativePath = path.relative(baseDir, fullPath);
                    results.push({
                        path: relativePath.replace(/\.html$/, ''),
                        fullPath: fullPath
                    });
                }
            }
            
        } catch (error) {
            console.log(error)
            _just_error.errormessage('0', 'Fail').then((errmsg)=>{throw new Error(errmsg)});
        }
    }
    
    return results;
}

async function countLinkOccurrences(htmlFiles, targetLink) {
    let count = 0;
    const promises = htmlFiles.map(async (file) => {
        try {
            const content = await fs.readFile(file.fullPath, 'utf8');
            const occurrences = (content.match(new RegExp(targetLink, 'g')) || []).length;
            count += occurrences;
        } catch (error) {}
    });

    await Promise.all(promises);
    return count;
}

function calculatePriority(linkCount) {
    if (linkCount === 0) return '0.5';
    if (linkCount <= 5) return '0.6';
    if (linkCount <= 20) return '0.7';
    if (linkCount <= 50) return '0.8';
    return '1.0';
}

async function generateSitemapFile(filePath, urls, isIndex = false) {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    
    if (isIndex) {
        xmlContent += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        urls.forEach(url => {
            xmlContent += `<sitemap><loc>${url}</loc></sitemap>`;
        });
        xmlContent += '</sitemapindex>';
    } else {
        xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        urls.forEach(url => {
            xmlContent += `<url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod><priority>${url.priority}</priority></url>`;
        });
        xmlContent += '</urlset>';
    }
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, xmlContent, 'utf8');
}

exports.sitemap = async function (config, inputPath, inputFixPath) {
    if (config.sitemap.generateSitemap !== true) {
        return 'Unable to generate sitemap: sitemap.generateSitemap is not true.';
    }

    if (!config.sitemap.protocol || typeof config.sitemap.protocol !== 'string' || 
        (config.sitemap.protocol !== 'https:' && config.sitemap.protocol !== 'http:')) {
        _just_error.errormessage('0', 'Invalid protocol').then((errmsg)=>{throw new Error(errmsg)});
        return;
    }

    const baseDir = config.sitemap.base || inputPath || '.';
    const outputDir = config.sitemap.output || baseDir;
    const url = `${config.sitemap.protocol}//${config.domain}/`;
    
    function makeurl(path) {
        return `${url}${config.sitemap.path || inputFixPath || ''}${config.sitemap.unpath ? path.replace(config.sitemap.unpath, '') : path}`;
    }

    try {
        const htmlFiles = await getHtmlFiles(baseDir);
        
        if (htmlFiles.length === 0) {
            return 'No HTML files found for sitemap generation';
        }

        const currentDate = new Date().toISOString().split('T')[0];
        
        const urlPromises = htmlFiles.map(async (file) => {
            const link = makeurl(file.path);
            const linkCount = await countLinkOccurrences(htmlFiles, link);
            const priority = calculatePriority(linkCount);
            if (config.sitemap.hidePages && Array.isArray(config.sitemap.hidePages) && config.sitemap.hidePages.includes('/'+file.path)) return undefined;
            return {
                loc: link,
                lastmod: currentDate,
                priority: priority
            };
        }).filter(i=>i);

        const urlsWithPriority = await Promise.all(urlPromises);

        if (urlsWithPriority.length <= 50000) {
            const sitemapPath = path.join(outputDir, 'sitemap.xml');
            await generateSitemapFile(sitemapPath, urlsWithPriority);
            return `Sitemap generated successfully at ${sitemapPath}`;
        } else {
            const chunks = require('../array.js').chunks(urlsWithPriority, 50000);
            const sitemapFiles = [];
            
            const generationPromises = chunks.map(async (chunk, i) => {
                const sitemapFileName = `sitemap${i + 1}.xml`;
                const sitemapPath = path.join(outputDir, sitemapFileName);
                
                await generateSitemapFile(sitemapPath, chunk);
                sitemapFiles.push(`${url}/${sitemapFileName}`);
            });

            await Promise.all(generationPromises);
            
            const indexPath = path.join(outputDir, 'sitemap-index.xml');
            await generateSitemapFile(indexPath, sitemapFiles, true);
            
            return `Sitemap index generated successfully at ${indexPath} with ${chunks.length} sitemap files`;
        }
        
    } catch (error) {
        throw new Error(`Error generating sitemap: ${error.message}`);
    }
}
