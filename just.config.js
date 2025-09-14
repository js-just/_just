const i = '/img/';
const hidePages = ['/api-modules/pages/redirect', '/code'];

module.exports = {
    mode: "generator",
    domain: "just.js.org",
    docs_config: {
        metatitle: "Just an Ultimate Site Tool",
        logo: `${i}logo.svg`,
        links: [
            ["Documentation", "/docs", "_self"],
        ],
        insertInHTMLHead: `
            <link rel="apple-touch-icon" sizes="180x180" href="${i}apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="${i}favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="${i}favicon-16x16.png">
            <link rel="manifest" href="/site.webmanifest">
        `,
        footer: '<span onclick="javascript:window.open(\'https://github.com/js-just/_just/blob/main/LICENSE\',\'\_blank\')">Copyright &copy; 2025 &#171;<a href="https://juststudio.is-a.dev/" target="_blank">JustStudio.</a>&#187;</span>',
        keywords: 'Just, an, Ultimate, Site, Tool, Static, Website, GitHub, Action, Postprocessor, Compressor, Generator, Redirector, Compress, Markdown, Redirect, Generate, Documentation, Docs',
        googleAnalytics: 'G-EL1YYL2EX0',
        hidePages,
        metaColor: '#6c3cf4',
        description: 'A GitHub action to enhance your static website.',
        logoLink: '/',
        env: {
            name: 'Just an Ultimate Site Tool'
        }
    },
    sitemap: {
        generateSitemap: true,
        protocol: 'https:',
        hidePages,
    }
}
