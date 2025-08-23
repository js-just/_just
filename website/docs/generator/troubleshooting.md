_just: title: Troubleshooting
# Troubleshooting

## `Node.js` errors
### Invalid string length error at `logs.js`
The error looks like this:
```
RangeError: Invalid string length
  at /home/runner/work/_actions/js-just/_just/main/src/documentation/logs.js:XX:XXX
  at FSReqCallback.oncomplete (node:fs:XXX:XX)
```
-# Note that after an error, there may be some Just an Ultimate Site Tool logs, so the error may not be at the end of the logs.

To fix that error you can disable debug lods in `module.exports` of the `just.config.js` file.
```js
module.exports = {
  // ...
  debug: false
}
```

## Generated content errors
### Couldn’t load the website. (0302)
<div id="0302"></div>
This error looks like this:
![Error](/img/0302.png)

This error can be caused by various reasons:
- Poor Internet connection.
- Other reasons that are not related to Just an Ultimate Site Tool.
- Just an Ultimate Site Tool paths/directories error - this means that Just an Ultimate Site Tool did not determine the file paths correctly, and browsers are unable to load scripts and styles.

**To fix the paths/directories error:**
- If you are inserting generated website into another directory, for example you have made the website in the root of the repository and then moved it to another directory in a different repository, try adding the `fix-path` input in your workflow file:
```yml
      - name: Generate with _just
        uses: js-just/_just@main
        with:
          # ...
          fix-path: example # path to directory that your generated website will be moved to
```
-# If that doesn’t help, you can also try adding these options:
- Otherwise, you can try adding these options in the `docs_config` in `module.exports` of the `just.config.js` file:
```js
module.exports = {
  // ...
  docs_config: {
    // ...
    usePathInput: true,
    usePathInputInHTML: true,
    usePathInputInJS: true
    /*
      Try different configurations by setting these options to true or false until the problem is fixed.
    */
  }
}
```

_just: prev: /docs/generator/advanced-usage