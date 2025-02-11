# _just

_just - is a postprocessor that allows you to modify generated Next.js pages before publishing them to GitHub. <br>
<small>Made for lazy devs.</small>

---------
# WHERE I CAN USE _JUST

You can use **_just** only in your Next.js website on GitHub Pages.

---------
# HOW TO USE

1. Create "`_just`" directory in root directory of your GitHub repository.
2. Create "`js`", "`style`", "`dangerously-insert-files`" sub-directories in "`_just`" directory.
3. Create "`404.html`" file that you can customize as you want and insert it in "`_just`" directory.
4. You can add as many as you want JavaScript files in "`js`" sub-directory, these files will be applied to **all** pages on your website.
5. You can add as many as you want CSS files in "`style`" sub-directory, these files will be applied to **all** pages on your website.
6. If you want, you also can add **any** files in "`dangerously-insert-files`" sub-directory, these files will be available at `(PATH TO YOUR WEBSITE)/(FILE NAME)`.
> [!WARNING]
> INSERTING FILES DIRECTLY IN GENERATED NEXT.JS WEBSITE MAY CAUSE ERRORS.
7. Now in your "`.github/workflows/nextjs.yml`" file insert this after "`Build with Next.js`":
```yml
      - name: _just
        uses: JustDeveloper1/_just@v0.0.9
```
8. Change "`Upload artifact`" step's path to "`deploy`". It should look like:
```yml
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: deploy
```

---------
# BEST EXAMPLES

If you want to take a look at websites and services that using _just, here is the best of them:
> [Encoder.js](https://github.com/JustStudio7/Encoder) by [JustStudio.](https://github.com/JustStudio7)

Think you are better? [Open an issue](https://github.com/JustDeveloper1/_just/issues/new) with requesting your project to be added in this list!
