const page_ = 'p' + window.location.pathname;
const scrll = localStorage.getItem('s' + page_);
const theme = localStorage.getItem('t');
const main_ = 'html > body > main > div#main > article.main';
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

const publicOutput = 'PUBLICOUTPUT';
console.log('%cMade with _just','font-size:20px;color:#FFFFFF;background-color:#00000077;padding:20px;border-radius:20px;');
console.log('%chttps://just.is-a.dev/','font-size:10px;color:#FFFFFF;background-color:#00000077;padding:0px 40px;border-radius:20px;');
if (publicOutput) {
    console.log(`_just output: ${window.location.protocol}//${window.location.hostname}/_just_data/output.txt`)
}

window.addEventListener('scroll', () => {
    let headerIndex_=false;
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.querySelector(".navbar").classList.add("scroll");
    } else {
        headerIndex_ = true;
        document.querySelector(".navbar").classList.remove("scroll");
    }

    localStorage.setItem('s' + page_, document.documentElement.scrollTop);

    const elements = document.querySelectorAll(`${main_} h1, ${main_} h2, ${main_} h3, ${main_} h4`);
    let headerIndex = -1;
    let headers;
    let lastindex = undefined;
    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isInView = (rect.top + rect.height / 2) <= (window.innerHeight / 2);

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

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        document.body.classList.add('stb');
        headerIndex = headers;
    } else {
        document.body.classList.remove('stb');
    }

    document.body.style.setProperty('--hc', headerIndex_ ? 0 : headerIndex >= 0 ? headerIndex : 0);
});

if (scrll) {
    document.documentElement.scrollTo(0, scrll);
}

let swipe;
function handleSwipeLeft() {
    document.body.classList.remove('navleft');
}
function handleSwipeRight() {
    document.body.classList.add('navleft');
}
document.addEventListener('touchstart', function(event) {
    swipe = [event.touches[0].clientX, event.touches[0].clientY];
}, false);
document.addEventListener('touchend', function(event) {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const distanceX = endX - swipe[0];
    const distanceY = endY - swipe[1];

    if (distanceY < 35 && distanceY > -35) {
        if (distanceX > 50) {
            handleSwipeRight();
        } else if (distanceX < -50) {
            handleSwipeLeft();
        }
    }
}, false);

const getnsettheme = () => {
    try {
        const darkThemeMq = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
        if (darkThemeMq()) {
            document.documentElement.classList.remove('l');
        } else {
            document.documentElement.classList.add('l');
        }
    } catch {
        document.documentElement.classList.add('l');
    }
};
const checkTheme = () => localStorage.getItem('t');
const autotheme = () => {
    function setColorScheme(scheme) {
        switch(scheme){
            case 'dark':
                if (checkTheme() == 'a') {
                    document.documentElement.classList.remove('l');
                }
            break;
            case 'light':
                if (checkTheme() == 'a') {
                    document.documentElement.classList.add('l');
                }
            break;
            default:
                if (checkTheme() == 'a') {
                    document.documentElement.classList.add('l');
                }
            break;
        }
    }

    function getPreferredColorScheme() {
        if (window.matchMedia) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                return 'dark';
            } else {
                return 'light';
            }
        }
        return 'light';
    }

    function updateColorScheme(){
        setColorScheme(getPreferredColorScheme());
    }

    if(window.matchMedia){
        var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', updateColorScheme);
    }

    updateColorScheme();
};

if (theme && theme == 'l') {
    document.documentElement.classList.add('l');
    document.documentElement.classList.remove('a');
} else if (theme && theme == 'a') {
    document.documentElement.classList.add('a');
    autotheme()
} else {
    document.documentElement.classList.remove('a');
    getnsettheme()
}

const updateMinHeight = () => {
    try {
        document.querySelector('.main').style.minHeight = `${window.innerHeight-62*2-1}px`
    } catch (err_) {}
};
updateMinHeight();
window.addEventListener('resize', updateMinHeight);

let fun_function = false;
const glass = 'url("#glass")';
const i_want_liquid_glass = () => {
    document.body.style.filter = glass;
    document.body.style.webkitFilter = glass;
    if (fun_function) {
        document.querySelector('feDisplacementMap').scale.baseVal += 100;
    }
    fun_function = true;
};

function search1(data, searchTerm) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const lowerValue = value.toLowerCase();
      const index = lowerValue.indexOf(lowerSearchTerm);
      
      if (index !== -1) {
        const start = Math.max(0, index - 6);
        let end = Math.min(value.length, index + searchTerm.length + 9);
        
        let snippet = value.substring(start, end);
        
        const regex = new RegExp(`(?<=\s|^|[.,!?;: \n])(${searchTerm})(?=\s|[.,!?;: \n]|$)`, 'gi');
        
        snippet = snippet.replace(regex, '<strong>$1</strong>');
        if (start > 0) {snippet = '...'+snippet.slice(3)}
        if (end < value.length) {snippet = snippet.trim()+'...'};
        
        return [
          key,
          snippet
        ];
      }
    }
  }
  return null;
}
function search2(data, searchTerm) {
    let output = [];
    for (let i = 1; i <= 5; i++) {
        const search1_ = search1(data, searchTerm);
        if (search1_) {
            data[search1_[0]] = '';
            output.push(search1_);
        }
    }
    return output;
}
document.addEventListener('DOMContentLoaded', () => {
    let ltb = document.getElementById('l');
    let dtb = document.getElementById('d');
    let atb = document.getElementById('a');

    if (ltb && dtb && atb) {
        ltb.addEventListener('click', () => {
            document.documentElement.classList.add('l');
            document.documentElement.classList.remove('a');
            localStorage.setItem('t', 'l');
        });

        dtb.addEventListener('click', () => {
            document.documentElement.classList.remove('l');
            document.documentElement.classList.remove('a');
            localStorage.setItem('t', 'd');
        });

        atb.addEventListener('click', () => {
            document.documentElement.classList.add('a');
            localStorage.setItem('t', 'a');
            autotheme();
        });
    }

    if (isIOS()) {
        document.body.classList.add('ios');
    };

    const sb = document.getElementById("searchbar");
    const sd = document.querySelector('.search');
    const updateSD = (toggle = false) => {
        if (!toggle) {sd.innerHTML = ''};
        sd.style.left = `${sb.offsetLeft + sb.parentElement.offsetLeft}px`;
        sd.style.top = `${sb.parentElement.offsetTop + sb.offsetHeight - (sb.parentElement.offsetWidth == 0 ? 15 : 0)}px`;
        sd.style.width = `${sb.offsetWidth - 8*2}px`;
        sd.style.opacity = toggle ? 1 : 0;
        sd.style.pointerEvents = toggle ? 'all' : 'none';
    };
    window.addEventListener('resize', ()=>{updateSD(false)});

    function searchString(str) {
        if (!str) {
            return false;
        }
        const trimmedStr = str.trim();
        if (trimmedStr.length === 0) {
            return false;
        }
        if(/^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(trimmedStr)){
            return false;
        }
        return true;
    };
    let searchurl = "/_just/search";
    sb.addEventListener("input", async () => {
        const sv = sb.value;
        const st = searchString(sv);
        sd.innerHTML = '<span>Loading...</span>';
        updateSD(st);
        const pta = '<br>Please try again';
        if (st) {
            const response = await fetch(searchurl).catch((err__)=>{
                console.warn(err__);
                sd.innerHTML = `<span>Failed to fetch.${pta}</span>`;
                return
            });
            const data = await response.json().catch((err__)=>{
                console.warn(err__);
                sd.innerHTML = `<span>Something went wrong.${pta}</span>`;
                return
            });
            const searchdata = search2(data, sv);
            if (searchdata.length == 0) {
                sd.innerHTML = '<span>Nothing found.</span>';
            } else {
                sd.innerHTML = '';
                for (const [id, data_] of Object.entries(searchdata)) {
                    sd.innerHTML += `<a href="${data_[0]}" target="_self">${data_[1].replaceAll('/n','')}</a>`;
                }
            }
        }
    });

    updateSD(false);updateMinHeight();
});