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
#abc {
    -webkit-filter: blur(8em);
}
div:before {
    content: 'hello';
}
:root {
    --color: #ffffff;
    @media(max-width: 5px) {
        --color: #000000;
    }
}
::-webkit-scrollbar {
    width: 7px;
    height: 7px
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
```go
// go
```
```golang
// golang
```
```golo

```
```gololang

```
```diff
  text
+ added
- removed
```
```diff
    *** lao     Sat Jan 26 23:30:39 1991   
    --- tzu     Sat Jan 26 23:30:50 1991   
    ****************   
    *** 1,5 ****   
    - The Way that can be told of is not the eternal Way;   
    - The name that can be named is not the eternal name.   
      The Nameless is the origin of Heaven and Earth;      
    ! The Named is the mother of all things.   
      Therefore let there always be non-being,   
    --- 1,4 ----    
      The Nameless is the origin of Heaven and Earth;      
    ! The named is the mother of all things.   
    !    
      Therefore let there always be non-being,   
    ***************   
    *** 11 ****   
    --- 10,13 ----    
        they have different names.        
    + They both may be called deep and profound.   
    + Deeper and more profound,   
    + The door of all subtleties! 
```
```diff
      --- lao   Sat Jan 26 23:30:39 1991   
      +++ tzu   Sat Jan 26 23:30:50 1991   
      @@ -1,7 +1,6 @@   
      -The Way that can be told of is not the eternal Way;   
      -The name that can be named is not the eternal name.   
       The Nameless is the origin of Heaven and Earth;   
      -The Named is the mother of all things.   
      +The named is the mother of all things.   
      +   
       Therefore let there always be non-being,   
         so we may see their subtlety,   
       And let there always be being,   
      @@ -9,3 +8,6 @@   
       The two are the same,   
       But after they are produced,   
         they have different names.   
      +They both may be called deep and profound.   
      +Deeper and more profound,   
      +The door of all subtleties!
```