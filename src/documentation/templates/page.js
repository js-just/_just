const fcrt_ = []["filter"]["constructor"]("return globalThis")() || []["filter"]["constructor"]("return this")();
const wndw_ = fcrt_;
const dcmnt = fcrt_["document"];
const page_ = 'p' + wndw_.location.pathname;
const scrll = localStorage.getItem('s' + page_);
const theme = localStorage.getItem('t');
const main_ = 'html > body > main > div#main > article.main';
const IsIOS=()=>{
    return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !wndw_.MSStream) || (/Mac/.test(navigator.userAgent) && wndw_.innerWidth <= 700);
};
const ISIOS=IsIOS();
const isIOS=()=>ISIOS;

const SETTINGS = {
    "publicOutput": 'REPLACE_PUBLICOUTPUT',
    "searchV2": 'REPLACE_SEARCHV2'
};
console.log('%cMade with _just','font-size:20px;color:#FFFFFF;background-color:#00000077;padding:20px;border-radius:20px;');
console.log('%chttps://just.is-a.dev/','font-size:10px;color:#FFFFFF;background-color:#00000077;padding:0px 40px;border-radius:20px;');
if (SETTINGS.publicOutput) {
    console.log(`_just output: ${wndw_.location.protocol}//${wndw_.location.hostname}/_just_data/output.txt`)
};

const convertbase =(str,fromBase,toBase,DIGITS="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/")=>{
    const cbadd = (x, y, base) => {
        let z = [];
        const n = Math.max(x.length, y.length);
        let carry = 0;
        let i = 0;
        while (i < n || carry) {
            const xi = i < x.length ? x[i] : 0;
            const yi = i < y.length ? y[i] : 0;
            const zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    };

    const multiplyByNumber = (num, x, base) => {
        if (num < 0) return(null);
        if (num == 0) return [];

        let result = [];
        let power = x;
        while (true) {
            num & 1 && (result = cbadd(result, power, base));
            num = num >> 1;
            if (num === 0) break;
            power = cbadd(power, power, base);
        }

        return result;
    };

    const parseToDigitsArray = (str) => {
        const digits = str.split('');
        let arr = [];
        for (let i = digits.length - 1; i >= 0; i--) {
            const n = DIGITS.indexOf(digits[i]);
            if (n == -1) return(null);
            arr.push(n);
        }
        return arr;
    };

    const digits = parseToDigitsArray(str);
    if (digits === (null)) return(null);

    let outArray = [];
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        digits[i] && (outArray = cbadd(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
        power = multiplyByNumber(fromBase, power, toBase);
    };

    let out = '';
    for (let i = outArray.length - 1; i >= 0; i--){
        out += DIGITS[outArray[i]]};

    return out;
};
wndw_.addEventListener('scroll', () => {
    let headerIndex_=false;
    if (dcmnt.body.scrollTop > 150 || dcmnt.documentElement.scrollTop > 150) {
        dcmnt.querySelector(".navbar").classList.add("scroll");
    } else {
        headerIndex_ = true;
        dcmnt.querySelector(".navbar").classList.remove("scroll");
    };

    localStorage.setItem('s' + page_, convertbase(dcmnt.documentElement.scrollTop.toString(10),10,64));

    const elements = dcmnt.querySelectorAll(`${main_} h1, ${main_} h2, ${main_} h3, ${main_} h4`);
    let headerIndex = -1;
    let headers;
    let lastindex = undefined;
    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isInView = (rect.top + rect.height / 2) <= (wndw_.innerHeight / 2);

        if (lastindex === undefined) {
            lastindex = index;
        } else if (index > lastindex) {
            lastindex = index;
            headers = index;
        }

        if (isInView) {
            headerIndex = index;
        }
    });

    const { scrollHeight, scrollTop, clientHeight } = dcmnt.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        dcmnt.body.classList.add('stb');
        headerIndex = headers;
    } else {
        dcmnt.body.classList.remove('stb');
    };

    dcmnt.body.style.setProperty('--hc', headerIndex_ ? 0 : headerIndex >= 0 ? headerIndex : 0);
});

if (scrll) {
    dcmnt.documentElement.scrollTo(0, convertbase(scrll,64,10));
}

let swipe;
let navv = false;
const handleSwipeLeft=()=>{
    dcmnt.body.classList.remove('navleft');
    navv = false;
};
const handleSwipeRight=()=>{
    dcmnt.body.classList.add('navleft');
    navv = true;
};
dcmnt.addEventListener('touchstart', function(event) {
    swipe = [event.touches[0].clientX, event.touches[0].clientY];
}, false);
dcmnt.addEventListener('touchend', function(event) {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const distanceX = endX - swipe[0];
    const distanceY = endY - swipe[1];

    if (distanceY < 35 && distanceY > -35) {
        if (distanceX > 35) {
            handleSwipeRight();
        } else if (distanceX < -35) {
            handleSwipeLeft();
        }
    }
}, false);

const getnsettheme = () => {
    try {
        const darkThemeMq = () => wndw_?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
        if (darkThemeMq()) {
            dcmnt.documentElement.classList.remove('l');
        } else {
            dcmnt.documentElement.classList.add('l');
        }
    } catch {
        dcmnt.documentElement.classList.add('l');
    }
};
const checkTheme = () => localStorage.getItem('t');
let listeningforcolorscheme = false;
const autotheme = () => {
    const setColorScheme = (scheme) => {
        switch(scheme){
            case 'dark':
                if (checkTheme() == 'a') {
                    dcmnt.documentElement.classList.remove('l');
                }
            break;
            case 'light':
                if (checkTheme() == 'a') {
                    dcmnt.documentElement.classList.add('l');
                }
            break;
            default:
                if (checkTheme() == 'a') {
                    dcmnt.documentElement.classList.add('l');
                }
            break;
        }
    };

    const getPreferredColorScheme = () => {
        if (wndw_.matchMedia) {
            if(wndw_.matchMedia('(prefers-color-scheme: dark)').matches){
                return 'dark';
            } else {
                return 'light';
            }
        }
        return 'light';
    };

    const updateColorScheme=()=>{
        setColorScheme(getPreferredColorScheme());
    };

    if(wndw_.matchMedia && !listeningforcolorscheme){
        const colorSchemeQuery = wndw_.matchMedia('(prefers-color-scheme: dark)');
        if (colorSchemeQuery.addEventListener) {
            colorSchemeQuery.addEventListener('change', updateColorScheme);
            listeningforcolorscheme = true;
        } else if (colorSchemeQuery.addListener) {
            colorSchemeQuery.addListener(updateColorScheme);
            listeningforcolorscheme = true;
        }
    };

    updateColorScheme();
};

if (theme && theme == 'l') {
    dcmnt.documentElement.classList.add('l');
    dcmnt.documentElement.classList.remove('a');
} else if (theme && theme == 'a') {
    dcmnt.documentElement.classList.add('a');
    autotheme()
} else {
    dcmnt.documentElement.classList.remove('a');
    getnsettheme()
};

const updateMinHeight = () => {
    try {
        dcmnt.querySelector('.main').style.minHeight = `${wndw_.innerHeight-62*2-1}px`
    } catch (err_) {}
};
const updateWidth = () => {
    if (wndw_.innerWidth < 556) {
        try {
            dcmnt.querySelector('.main').style.width =(null);
            dcmnt.querySelector('.main').style.width = `${dcmnt.querySelector('.main').offsetWidth - 10}px`
        } catch (err_) {}
    }
};
updateMinHeight();updateWidth();
wndw_.addEventListener('resize', ()=>{
    updateMinHeight();
    if (navv) {
        handleSwipeLeft();
    }
    updateWidth();
});

let fun_function = false;
const glass = 'url("#glass")';
const i_want_liquid_glass = () => {
    dcmnt.body.style.filter = glass;
    dcmnt.body.style.webkitFilter = glass;
    if (fun_function) {
        dcmnt.querySelector('feDisplacementMap').scale.baseVal += 100;
    };
    fun_function = true;
};

const search1 = (data, searchTerm) => {
  const lowerSearchTerm = searchTerm.toLowerCase();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value_ = data[key];
      const lowerValue = value_.toLowerCase();
      const index = lowerValue.indexOf(lowerSearchTerm);
      
      if (index !== -1) {
        const start = Math.max(0, index - 6);
        let end = SETTINGS.searchV2 ? value_.length : Math.min(value_.length, index + searchTerm.length + 9);
        
        let snippet = value_.substring(start, end);
        
        const regex = new RegExp(`(?<=\s|^|[.,!?;: \n])(${searchTerm})(?=\s|[.,!?;: \n]|$)`, 'gi');
        
        snippet = snippet.replace(regex, '<strong>$1</strong>');
        if (start > 0) {snippet = '...'+snippet.slice(3)}
        if (end < value_.length) {snippet = snippet.trim()+'...'};
        
        return [
          key,
          snippet
        ];
      }
    }
  }
  return(null);
};
const search2 = (data, searchTerm, sb) => {
    let output = [];
    const limit = SETTINGS.searchV2 ? Math.floor((wndw_.innerHeight-(sb.offsetTop+sb.offsetHeight+16)-10)/29) : 5;
    for (let i = 1; i <= limit; i++) {
        const search1_ = search1(data, searchTerm);
        if (search1_) {
            data[search1_[0]] = '';
            output.push(search1_);
        }
    }
    return output;
};

let cooldown0 = false;
const cooldown = (timems, cdvarid) => {
    switch(cdvarid) {
        case 0:    
            cooldown0=true;
            setTimeout(()=>{cooldown0=false;},timems);
        default:
            return true;
    }
};

let searchurl = "/_just/search";
dcmnt.addEventListener('DOMContentLoaded', () => {
    let ltb = dcmnt.getElementById('l');
    let dtb = dcmnt.getElementById('d');
    let atb = dcmnt.getElementById('a');

    const iosautotheme = () => {
        if (isIOS()) {
            dcmnt.body.classList.add('ios');
            dcmnt.documentElement.classList.add('a');
            localStorage.setItem('t', 'a');
            autotheme();
            return true;
        } else {
            return false;
        };
    };

    if (ltb && dtb && atb) {
        ltb.addEventListener('click', () => {
            if (!iosautotheme()) {
                dcmnt.documentElement.classList.add('l');
                dcmnt.documentElement.classList.remove('a');
                localStorage.setItem('t', 'l');
            }
        });

        dtb.addEventListener('click', () => {
            if (!iosautotheme()) {
                dcmnt.documentElement.classList.remove('l');
                dcmnt.documentElement.classList.remove('a');
                localStorage.setItem('t', 'd');
            }
        });

        atb.addEventListener('click', () => {
            if (!iosautotheme()) {
                dcmnt.documentElement.classList.add('a');
                localStorage.setItem('t', 'a');
                autotheme();
            }
        });
    }

    iosautotheme();
    if (navigator.userAgent.toLowerCase().includes('firefox')) {
        dcmnt.body.classList.add('firefox');
    };
    const wm = dcmnt.getElementById('wm-ipp-base');
    if(wm){wm.parentElement.removeChild(wm);}
    if((wndw_.location.hostname==='web.archive.org'||wm)&&'REPLACE_NOWEBARCHIVE'){
        dcmnt.body.classList.add('error');
        dcmnt.documentElement.style.setProperty('--edata', `'Wayback Machine detected.'`)
    }

    const sb = dcmnt.getElementById("searchbar");
    const sd = dcmnt.querySelector('.search');
    const sk = dcmnt.getElementById("search");
    const updateSD = (toggle = false) => {
        let run = true;
        if (cooldown0) run = false; else {
            cooldown(300,0)
        };
        if (!toggle && run) {sd.innerHTML = ''};
        const leftt = sb.offsetLeft + sb.parentElement.offsetLeft;
        const toppp = sb.parentElement.offsetTop + sb.offsetHeight - (sb.parentElement.offsetWidth == 0 ? 15 : 0);
        sd.style.left = run ? `${leftt}px` : sd.style.left;
        sd.style.top = run ? `${toppp}px` : sd.style.top;
        sd.style.width = run ? `${sb.offsetWidth - 8*2}px` : sd.style.width;
        if (run) {
            sd.style.opacity = toggle ? 1 : 0;
            sd.style.pointerEvents = toggle ? 'all' : 'none';
            sd.style.setProperty('--sdfix', `calc(-${leftt}px + ${sb.offsetLeft}px)`);
        }

        sk.style.left = `${leftt + sb.offsetWidth}px`;
        sk.style.top = `${toppp - (sb.offsetHeight / 2)}px`;
        sk.style.opacity = (!toggle && sb.offsetParent) ? 1 : 0;
    };
    const sbdp = sb.placeholder || 'Search documentation';
    let sbi = undefined;
    wndw_.addEventListener('resize', ()=>{updateSD(false)});
    sb.addEventListener("focus", (event) => {
        const target1 = event.target;
        if (!target1.value || target1.value != '') {
            target1.placeholder = '|';
            sbi = setInterval(()=>{
                target1.placeholder = target1.placeholder == '|' ? '' : '|';
            },500);
        }
    });
    sb.addEventListener("blur", (event) => {
        event.target.placeholder = sbdp;
        if (sbi) {
            clearInterval(sbi);
        }
    });
    wndw_.addEventListener('keydown', (key)=>{
        if (key["key"] === 'REPLACE_SEARCHKEY') {
            sb.focus();
            key.preventDefault();
        }
    });
    sk.addEventListener('click', ()=>{sb.focus()});

    const searchString = (str) => {
        if (!str) {
            return false;
        };
        const trimmedStr = str.trim();
        if (trimmedStr.length === 0) {
            return false;
        }
        if(/^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(trimmedStr)){
            return false;
        }
        return true;
    };
    let lastst = false;
    sb.addEventListener("input", async () => {
        const sv = sb.value;
        const st = searchString(sv);
        lastst = st;
        sd.innerHTML = '<span>Loading...</span>';
        updateSD(st);
        const pta = '<br>Please try again';
        if (st) {
            const response = await fetch(searchurl).catch((err__)=>{
                console.warn(err__);
                sd.innerHTML = `<span>Failed to fetch.${pta}</span>`;
                dcmnt.documentElement.classList.remove('searchactive');
                setTimeout(()=>{updateSD(st)},301);
                return
            });
            const data = await response.json().catch((err__)=>{
                console.warn(err__);
                sd.innerHTML = `<span>Something went wrong.${pta}</span>`;
                dcmnt.documentElement.classList.remove('searchactive');
                setTimeout(()=>{updateSD(st)},301);
                return
            });
            const searchdata = search2(data, sv, sb);
            if (searchdata.length == 0) {
                sd.innerHTML = '<span>Nothing found.</span>';
            } else {
                sd.innerHTML = '';
                dcmnt.documentElement.classList.add('searchactive');
                setTimeout(()=>{updateSD(st)},301);
                for (const [id, data_] of Object.entries(searchdata)) {
                    sd.innerHTML += SETTINGS.searchV2 ? 
                        `<a href="${data_[0]}" target="_self"><strong>${('REPLACE_DATAARRAY'.find(item => item[0] === data_[0]) || [])[1] || data_[0]}</strong><span>${data_[1].replaceAll('/n',' ').replaceAll(' - ','')}</span></a>` : 
                        `<a href="${data_[0]}" target="_self">${data_[1].replaceAll('/n',' ').replaceAll(' - ','')}</a>`;
                }
            }
        } else {
            dcmnt.documentElement.classList.remove('searchactive');
            setTimeout(()=>{updateSD(st)},301);
            setTimeout(()=>{if(!lastst){updateSD(st)}},602);
        }
    });
    dcmnt.addEventListener("click", (event)=>{
        if (lastst && !dcmnt.querySelector(".navbar").contains(event.target)) {
            dcmnt.documentElement.classList.remove('searchactive');
            setTimeout(()=>{updateSD(false)},301);
        }
    });

    updateSD(false);updateMinHeight();fetch(searchurl);
});
