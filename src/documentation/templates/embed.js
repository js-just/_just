(async()=>{
    async function fetchMetaTags(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const metaTags = doc.querySelectorAll('meta');
            const metaData = Array.from(metaTags).map(meta => {
                const attributes = {};
                for (let i = 0; i < meta.attributes.length; i++) {
                    const attr = meta.attributes[i];
                    attributes[attr.name] = attr.value;
                }
                return attributes;
            });
            return metaData;
        } catch (error) {
            return false;
        }
    }
    const elems = document.querySelectorAll('div[data-link]');
    elems.forEach(async(elem)=>{
        const link = elem.getAttribute('data-link');
        function linkify() {
            elem.innerHTML = `<a href="${link}" target="_blank" id="ext"></a>`;
            return;
        }
        const metaTags = await fetchMetaTags(link).catch(linkify);
        if (!metaTags) linkify;
        let output = {};
        metaTags.forEach((meta)=>{
            if(meta.name==="title"){output.title=meta.content}
            else if(meta.name==="description"){output.desc=meta.content}
            else if(meta.property==="og:title"&&!output.title){output.title=meta.content}
            else if(meta.property==="og:description"&&!output.desc){output.desc=meta.content}
            else if(meta.itemprop==="image"&&!output.img){output.img=meta.content}
            else if(meta.property==="og:image"&&!output.img){output.img=meta.content}
            else if(meta.itemprop==="name"&&!output.title){output.title=meta.content}
            else if(meta.itemprop==="description"&&!output.desc){output.desc=meta.content}
            else if(meta.name==="theme-color"){output.color=meta.content}
        });
        metaTags.forEach((meta)=>{
            if(meta.name==="just:title"){output.title=meta.content}
            else if(meta.name==="just:description"){output.desc=meta.content}
            else if(meta.name==="just:image"){output.img=meta.content}
            else if(meta.name==="just:color"){output.color=meta.content}
        });
        elem.innerHTML=`${output.title?`<span class="embedTitle">${output.title}</span>`:''}${output.desc?`<span class="embedDesc">${output.desc}</span>`:''}${output.img?`<img src="${output.img}" alt="${output.title||link}" class="embedLogo"></img>`:''}`;
        elem.style.backgroundColor=output.color?output.color:null;
    })
})()
