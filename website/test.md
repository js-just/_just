# This is a test page
Generated using [Just an Ultimate Site Tool](https://just.is-a.dev/).

Some **bold**, *italic*, ***important***, __underlined__, ~~strikethrough~~, ~sub~, ^super^, ==marked==, __***very important***__, __==***extreme important***==__, ~~***not important***~~ text.
Some `code`; **`bold`**, *`italic`*, ***`important`***, __`underlined`__, ~~`strikethrough`~~, ~`sub`~, ^`super`^, ==`marked`==, __***`very important`***__, __==***`extreme important`***==__, ~~***`not important`***~~ code.

In__middle__here
In**middle**here
(__bold__)
(**bold**)
\$__0.00__
\$**0.00**

==~~__***text***__~~==

1. List
2. (with numbers)

- List
- (no numbers)

A line:
---

${ test.txt }$
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


> Multi <br>Line <br>(\<br>)

> Multi
> 
> Line
>
> (\\n + > + space + \\n)

> Multi
>
> Line
>
> (\\n + > + \\n)

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

\https://example.com - escaped link
`https://example.com` - disabled auto linking

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

## v0.0.29 features:
-# small text

## v0.1.1 features:
#### Embeds:
{https://juststudio.is-a.dev/}
{https://is-a.dev/}
{https://discord.com/app}
#### Tables:
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
#### Emoji shortcodes:
:right: :fog is coming: :left:
#### Environment variables:
$${test}$$
#### Details/Dropdown:
<details>
    <summary>Some text here</summary>
    Some **bold**, *italic*, ***important***, __underlined__, ~~strikethrough~~, ~sub~, ^super^, ==marked==, __***very important***__, __==***extreme important***==__, ~~***not important***~~ text.
    Some `code`; **`bold`**, *`italic`*, ***`important`***, __`underlined`__, ~~`strikethrough`~~, ~`sub`~, ^`super`^, ==`marked`==, __***`very important`***__, __==***`extreme important`***==__, ~~***`not important`***~~ code.
</details>
#### Tabs:
{% TABS %}

# Tab 1
Some **bold**, *italic*, ***important***, __underlined__, ~~strikethrough~~, ~sub~, ^super^, ==marked==, __***very important***__, __==***extreme important***==__, ~~***not important***~~ text.

# Tab 2
Some `code`; **`bold`**, *`italic`*, ***`important`***, __`underlined`__, ~~`strikethrough`~~, ~`sub`~, ^`super`^, ==`marked`==, __***`very important`***__, __==***`extreme important`***==__, ~~***`not important`***~~ code.

{% ENDTABS %}
#### API Request Element
{% API GET https://api.just.js.org/v1/latest/ %}

no body/query required

%{ JSON }%

{"success":true,"value":"v0.1.0","message":"Latest version","code":200,"last-updated":{"time":1756491298934,"commit":"456e97ffb47fa9c06dbfca297f6768c0384a9f30","initiator":{"name":"JustDeveloper1","id":176615419}}}

{% ENDAPI %}

_just: prev: /docs/getting-started
_just: next: /docs/getting-started
