module.exports = {
    "plugins": [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-react-jsx",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ],
        [
            "import",
            {
                "libraryName": "antd",
                "style": "css"
            }
        ]
    ],
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ],
        "@babel/preset-react"
    ],
    "comments": false
}
