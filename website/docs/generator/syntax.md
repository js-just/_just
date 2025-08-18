_just: title: Supported markdown syntax
# Markdown support
### Supported elements
- Headings (Alternate headings aren’t supported.)
- Line Breaks
- Bold (Use asterisks. Underscores aren’t supported.)
- Italic
- Blockquotes
- Ordered Lists (Nested lists aren’t supported.)
- Unordered Lists (Nested lists aren’t supported.)
- Code (To escape backticks (\`) use backslash (\\))
- Horizontal Rules
- Links
- Images
- Fenced Code Blocks (Use triple backticks (\`\`\`). Spaces/Tabs aren’t supported.)
- Syntax Highlighting
- Heading IDs (Automatically generated.)
- Strikethrough
- Task Lists
- Emoji (copy and paste)
- Highlight
- Subscript
- Superscript
- Automatic URL Linking
- Disabling Automatic URL Linking (You can also use backslash (\\) before protocol to disable Automatic URL Linking)
- HTML

### Not supported elements
- Paragraphs
- Footnotes
- Definition Lists
- Abbreviation

### Planned
- Emoji (shortcodes)

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

_just: prev: /docs/modes/generator
_just: next: /docs/generator/advanced-usage