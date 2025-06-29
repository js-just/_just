_just: title: Syntax highlighting test
# Syntax highlighting
```json
{
    "hello": "world",
    "number": 1234567890,
    "array": []
}
```
```json
[
    "hello", "world"
]
```
```js
console.log('hello world');
console.warn(1 + 1);
alert(false);
const abc = true;
for (i = 1; i <= 4; i++) {
    // do something
}
```
```html
<!DOCTYPE html>
<span class="hw" id="abc">Hello World!</span>
```
```css
* {
    background-color: black;
}
span {
    color: white;
}
.hw {
    border: 1px solid #6e3bf3;
}
```
```sh
#!/bin/bash
echo "Hello World!"
```
```py
#!/usr/bin/env python3
import time
out = int(time.time() * 1000)
print(out)
```
```lua
print("hiii")
warn(1 + 1)
local abc = true
while wait(1) do
    -- do something
end
```
```md
# markdown inside markdown
```