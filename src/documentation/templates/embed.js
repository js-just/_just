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
    let embedid = 0;
    function extlink(url) {
        let output = false;
        try {
            output = (new URL(url)).hostname === window.location.hostname
        } catch (_e) {};
        return !output
    };
    elems.forEach(async(elem)=>{
        const link = elem.getAttribute('data-link');
        function linkify() {
            elem.innerHTML = `<a href="${link}" target="_blank"${extlink(link)?` id="REPLACE_EXT"`:''}></a>`;
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
            else if(meta.property==="og:image:alt"){output.imgAlt=meta.content}
            else if(meta.property==="og:image:width"){output.imgX=meta.content}
            else if(meta.property==="og:image:height"){output.imgY=meta.content}
            else if(meta.property==="og:site_name"){output.name=meta.content}
        });
        metaTags.forEach((meta)=>{
            if(meta.name==="just:title"){output.title=meta.content}
            else if(meta.name==="just:description"){output.desc=meta.content}
            else if(meta.name==="just:image"){output.img=meta.content}
            else if(meta.name==="just:color"){output.color=meta.content}
            else if(meta.name==="just:image:alt"){output.imgAlt=meta.content}
            else if(meta.name==="just:image:width"){output.imgX=meta.content}
            else if(meta.name==="just:image:height"){output.imgY=meta.content}
            else if(meta.name==="just:name"){output.name=meta.content}
        });
        elem.innerHTML=`${
            output.name?`<small>${output.name}</small>`:''
        }${
            output.title?`<strong>${output.title}</strong>`:''
        }${
            output.desc?`<span>${output.desc}</span>`:''
        }${
            output.img?`<img src="${output.img}" alt="${output.imgAlt||output.title||link}" id="${embedid}" onerror="javascript:document.getElementById('${embedid++}').remove()"${output.imgX||output.imgY?
                ` style="${output.imgX?`max-width:${output.imgX}px;width:100%${output.imgY?';':''}`:''}${output.imgY?`max-height:${output.imgY}px`:''}"`
            :''}></img>`:''
        }`;
        if(output.color){elem.setAttribute('data-color', output.color)}
    })
})()
