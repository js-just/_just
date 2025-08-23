const three = 3;

module.exports = {
    //type: "docs",
    docs_config: {
        metatitle: "Just an Ultimate Site Tool",
        domain: "test.just.is-a.dev",
        links: [
            ["a link", "https://juststudio.is-a.dev/", "_blank"],
            ["another link", "https://justdeveloper.is-a.dev/", "_blank"]
        ],
        buttons: [
            ["a button", "https://just.is-a.dev/", "_blank"],
        ] // comment test
    },
    debug: false,
    tests: [
        1+1, 2*2,
        three
    ]
}
