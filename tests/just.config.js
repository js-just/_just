module.exports = {
    type: "docs",
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
            <link rel="manifest" href="/site.webmanifest"></link>
        `,
        footer: 'Copyright &copy; 2025 &#171;JustStudio.&#187;'
    }
}
