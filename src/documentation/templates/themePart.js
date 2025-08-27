let currentTheme = 1;
const getnsettheme = () => {
    try {
        const darkThemeMq = () => wndw_?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
        if (darkThemeMq()) {
            dcmnt.documentElement.classList.remove('l');
            currentTheme = 0;
        } else {
            dcmnt.documentElement.classList.add('l');
            currentTheme = 1;
        }
    } catch {
        dcmnt.documentElement.classList.add('l');
        currentTheme = 1;
    }
};
const checkTheme = () => localStorage.getItem('t');
let listeningforcolorscheme = false;
const autotheme = () => {
    const setColorScheme = (scheme) => {
        switch(scheme){
            case 'dark':
                currentTheme = 0;
                if (checkTheme() == 'a') {
                    dcmnt.documentElement.classList.remove('l');
                }
            break;
            case 'light': default:
                currentTheme = 1;
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
    currentTheme = 1;
    dcmnt.documentElement.classList.add('l');
    dcmnt.documentElement.classList.remove('a');
} else if (theme && theme == 'a') {
    dcmnt.documentElement.classList.add('a');
    autotheme()
} else {
    currentTheme = 0;
    dcmnt.documentElement.classList.remove('a');
    getnsettheme()
};