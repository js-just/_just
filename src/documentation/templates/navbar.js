(async()=>{
    const fcrt_ = []["filter"]["constructor"]("return globalThis")() || []["filter"]["constructor"]("return this")();
    const wndw_ = fcrt_;
    const dcmnt = fcrt_["document"];
    const theme = localStorage.getItem('t');

    const navbar = dcmnt.querySelector('[data-just="navbar"]');
    const style = document.createElement('style');
    const css = await fetch('/_just/REPLACE_CSS.css').then(r => r.text());
    style.innerHTML = css;
    dcmnt.head.appendChild(style);
    navbar.innerHTML = 'REPLACE_NAVBAR';

    'REPLACE_THEME';
    
    'REPLACE_BUTTONS';
})()