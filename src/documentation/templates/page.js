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
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.querySelector(".navbar").classList.add("scroll");
    } else {
        document.querySelector(".navbar").classList.remove("scroll");
    }

    localStorage.setItem('s' + page_, document.documentElement.scrollTop);

    const elements = document.querySelectorAll(`${main_} h1, ${main_} h2, ${main_} h3`);
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

    document.body.style.setProperty('--hc', headerIndex >= 0 ? headerIndex : 0);
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
    updateMinHeight();
});