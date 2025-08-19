_just: title: Supported markdown syntax
# Markdown support
### Supported elements
- [Headings](https://www.markdownguide.org/basic-syntax/#headings) (Alternate headings aren’t supported.)
- [Line Breaks](https://www.markdownguide.org/basic-syntax/#line-breaks)
- [Bold](https://www.markdownguide.org/basic-syntax/#bold) (Use asterisks. Underscores aren’t supported.)
- [Italic](https://www.markdownguide.org/basic-syntax/#italic)
- [Blockquotes](https://www.markdownguide.org/basic-syntax/#blockquotes-1)
- [Ordered Lists](https://www.markdownguide.org/basic-syntax/#ordered-lists) (Nested lists aren’t supported.)
- [Unordered Lists](https://www.markdownguide.org/basic-syntax/#unordered-lists) (Nested lists aren’t supported.)
- [Code](https://www.markdownguide.org/basic-syntax/#code) (To escape backticks (\`) use backslash (\\))
- [Horizontal Rules](https://www.markdownguide.org/basic-syntax/#horizontal-rules)
- [Links](https://www.markdownguide.org/basic-syntax/#links)
- [Images](https://www.markdownguide.org/basic-syntax/#images-1)
- [Fenced Code Blocks](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks) (Use triple backticks (\`\`\`). Spaces/Tabs aren’t supported.)
- [Syntax Highlighting](https://www.markdownguide.org/extended-syntax/#syntax-highlighting)
- [Heading IDs](https://www.markdownguide.org/extended-syntax/#heading-ids) (Automatically generated.)
- [Strikethrough](https://www.markdownguide.org/extended-syntax/#strikethrough)
- [Task Lists](https://www.markdownguide.org/extended-syntax/#task-lists)
- [Emoji (copy and paste)](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji)
- [Highlight](https://www.markdownguide.org/extended-syntax/#highlight)
- [Subscript](https://www.markdownguide.org/extended-syntax/#subscript)
- [Superscript](https://www.markdownguide.org/extended-syntax/#superscript)
- [Automatic URL Linking](https://www.markdownguide.org/extended-syntax/#automatic-url-linking)
- [Disabling Automatic URL Linking](https://www.markdownguide.org/extended-syntax/#disabling-automatic-url-linking) (You can also use backslash (\\) before protocol to disable Automatic URL Linking)
- [HTML](https://www.markdownguide.org/basic-syntax/#html)

### Not supported elements
- [Paragraphs](https://www.markdownguide.org/basic-syntax/#paragraphs-1)
- [Footnotes](https://www.markdownguide.org/extended-syntax/#footnotes)
- [Definition Lists](https://www.markdownguide.org/extended-syntax/#definition-lists)
- Abbreviation
- [Tables](https://www.markdownguide.org/extended-syntax/#tables)

### Planned
- [Emoji (shortcodes)](https://www.markdownguide.org/extended-syntax/#using-emoji-shortcodes)

## Support for Additional Syntax Elements
- Note, tip, important, warning, caution blockquotes:
```md
> [!NOTE] A note!
> [!TIP] A tip!
> [!IMPORTANT] Something important.
> [!WARNING] A warning!
> [!CAUTION] Caution!
```

- Underline:
__Underline example__
```md
__This text will be underlined.__
```

- Subtext:
-# Subtext example
```md
-# This line will be made smaller and greyed out.
```

## Escaping
To escape any element or character, use a backslash (\\).
To insert a backslash in your text, use two backslashes (\\\\).

_just: prev: /docs/modes/generator
_just: next: /docs/generator/advanced-usage