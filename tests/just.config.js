module.exports = {
    mode: "generator",
    docs_config: {
        metatitle: "Just an Ultimate Site Tool",
        domain: "test.just.is-a.dev",
        logo: "/img/logo.svg",
        links: [
            ["Documentation", "/docs", "_self"],
        ],
        insertInHTMLHead: `
            <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
            <link rel="manifest" href="/site.webmanifest">
            <script src="/js/f.js"></script>
        `,
        footer: '<span onclick="javascript:window.open(\'https://github.com/js-just/_just/blob/main/LICENSE\',\'\_blank\')">Copyright &copy; 2025 &#171;<a href="https://juststudio.is-a.dev/" target="_blank">JustStudio.</a>&#187;</span>',
        keywords: 'Just, an, Ultimate, Site, Tool, Static, Website, GitHub, Action, Postprocessor, Compressor, Generator, Redirector, Compress, Markdown, Redirect, Generate, Documentation, Docs',
        hidePages: ['/api-modules/pages/redirect', '/code']
    }
}
