# MIT License
# 
# Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

#!/bin/bash
tocss() {
    local directory="${1:-.}"
    local -a pids
    local compiled_count=0
    local error_count=0
    
    local sass_files=()
    while IFS= read -r -d '' file; do
        sass_files+=("$file")
    done < <(find "$directory" -name "*.$2" -type f -print0)
    
    if [ ${#sass_files[@]} -eq 0 ]; then
        return 0
    fi
    
    for sass_file in "${sass_files[@]}"; do
        local css_file="${sass_file%.$2}.css"
        
        (
            if sass "$sass_file" "$css_file" > /dev/null 2>&1; then
                exit 0
            else
                echo "Dart Sass error: $sass_file" >&2
                exit 1
            fi
        ) &
        
        pids+=($!)
    done
    
    for pid in "${pids[@]}"; do
        if wait "$pid"; then
            ((compiled_count++))
        else
            ((error_count++))
        fi
    done
    
    return $error_count
}
tojs() {
    local directory="${1:-.}"
    local -a pids
    local compiled_count=0
    local error_count=0
    
    local ts_files=()
    while IFS= read -r -d '' file; do
        ts_files+=("$file")
    done < <(find "$directory" -name "*.ts" -type f -print0)
    
    if [ ${#ts_files[@]} -eq 0 ]; then
        return 0
    fi
    
    for ts_file in "${ts_files[@]}"; do
        
        (
            if tsc "$ts_file" > /dev/null 2>&1; then
                exit 0
            else
                echo "TypeScript compiler error: $ts_file" >&2
                exit 1
            fi
        ) &
        
        pids+=($!)
    done
    
    for pid in "${pids[@]}"; do
        if wait "$pid"; then
            ((compiled_count++))
        else
            ((error_count++))
        fi
    done
    
    return $error_count
}

export -f tocss
export -f tojs
