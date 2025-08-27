const _just_THEME = class {
    constructor () {
        return (i)=>{ // input
            const wndw = []["filter"]["constructor"]("return globalThis")() || []["filter"]["constructor"]("return this")();
            const doct = wndw["document"];
            i = String(i).toLowerCase();
            function e(t) { // error ( text )
                throw new Error(`Just an Ultimate Site Tool: Generator mode: theme.js: ${t}.`)
            };
            function c(t) { // check ( theme )
                switch(t) {
                    case 'l': case 'd': case 'a':
                        return t;break;
                    default:
                        e('Invalid theme');
                        break
                }
            };
            switch(i) {
                case 'get':
                    return c(wndw.localStorage.getItem('t'));
                    break;
                case 'light':
                    wndw.localStorage.setItem('t','l');
                    doct.documentElement.classList.add('l');
                    doct.documentElement.classList.remove('a');
                    break;
                case 'dark':
                    wndw.localStorage.setItem('t','d');
                    doct.documentElement.classList.remove('l');
                    doct.documentElement.classList.remove('a');
                    break;
                case 'auto':
                    wndw.localStorage.setItem('t','a');
                    wndw.location.reload();
                    break;
                default: 
                    e('Invalid input');
                    break
            }
        };
    }
};
