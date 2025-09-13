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
clearall() {
    local path="${1:-.}"
    local extensions="${2}"
    
    if [[ -z "$extensions" ]]; then
        return 1
    fi
    if [[ ! -d "$path" ]]; then
        return 0
    fi
    
    path="${path%/}"
    
    local start_time=$(date +%s%3N)
    local deleted_count=0
    
    IFS=',' read -ra ext_array <<< "$extensions"
    
    if [[ ${#ext_array[@]} -eq 1 ]]; then
        local ext="${ext_array[0]#.}"
        deleted_count=$(find "$path" -type f -name "*.${ext}" 2>/dev/null | wc -l)
        if [[ $deleted_count -gt 0 ]]; then
            find "$path" -type f -name "*.${ext}" -delete 2>/dev/null
        fi
    else
        for ext in "${ext_array[@]}"; do
            ext="${ext#.}"
            local count=$(find "$path" -type f -name "*.${ext}" 2>/dev/null | wc -l)
            if [[ $count -gt 0 ]]; then
                find "$path" -type f -name "*.${ext}" -delete 2>/dev/null
                deleted_count=$((deleted_count + count))
            fi
        done
    fi
    
    local end_time=$(date +%s%3N)
    local duration=$((end_time - start_time))
    
    echo "::debug::Deleted $deleted_count files in ${duration}ms"
    
    return 0
}
export -f clearall
