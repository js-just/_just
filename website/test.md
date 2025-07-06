# This is a test page
Generated using [Just an Ultimate Site Tool](https://just.is-a.dev/).

Some **bold**, *italic*, ***important***, __underlined__, ~~strikethrough~~, ~sub~, ^super^, ==marked==, __***very important***__, __==***extreme important***==__, ~~***not important***~~ text.
Some `code`; **`bold`**, *`italic`*, ***`important`***, __`underlined`__, ~~`strikethrough`~~, ~`sub`~, ^`super`^, ==`marked`==, __***`very important`***__, __==***`extreme important`***==__, ~~***`not important`***~~ code.

1. List
2. (with numbers)

- List
- (no numbers)

A line:
---

```
Some code here
```

# Blockquotes test
> A blockquote.
> > Another one!
> > > And another blockquote!
> > > > Many nested blockquotes.
> > > > > This line should not be another nested blockquote. (Limit: 4 nested blockqutes)

> [!NOTE] A note!
> [!TIP] A tip!
> [!IMPORTANT] Something important.
> [!WARNING] A warning!
> [!CAUTION] Another warning?

> [!NOTE] `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` and `[!CAUTION]` are should be in one line. You can add \<br> tags to break the line for HTML. <br> > `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` and `[!CAUTION]` cannot have nested blockquotes.

# Headers test (h1)
## h2
### h3
#### h4
##### h5
###### h6
> [!IMPORTANT] Only h1, h2, h3 and h4 will be included in the "On this page" content list and will have their own unique IDs for shortlinks.

# Escape test
Not a line:
\---

\1. Not a list
2\. (with numbers)

\- Not a list
\- (no numbers)

\`\`\`
No code here
\`\`\`

\> Not a blockquote.

> \[!NOTE] A blockquote, but not a note.

# Links test
[a link](https://just.is-a.dev/ "link title")
<https://just.is-a.dev/>
https://just.is-a.dev

---

## v0.0.28 bugs:
#### blockquote link:
> [!WARNING] Just an Ultimate Site Tool is in **beta**. Expect regular updates, possible bugs, and changes. If you have found a bug, please [report it here](https://github.com/js-just/_just/issues/new?labels=bug&template=bug.md).

#### text styling:
"**`_just`**"

#### multiple links(?):
same:
[a link](https://juststudio.is-a.dev) [another link](https://justdeveloper.is-a.dev/)
<https://juststudio.is-a.dev> <https://justdeveloper.is-a.dev>
https://juststudio.is-a.dev https://justdeveloper.is-a.dev

different:
[a link](https://juststudio.is-a.dev) <https://juststudio.is-a.dev> 
<https://juststudio.is-a.dev> https://justdeveloper.is-a.dev
https://juststudio.is-a.dev [another link](https://justdeveloper.is-a.dev/)

## v0.0.29 features:
-# small text