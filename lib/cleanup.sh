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
    local target_path="$1"
    local extensions="$2"
    
    if [[ ! -d "$target_path" ]]; then
        return 0
    fi
    
    local find_extensions=()
    IFS=',' read -ra ext_array <<< "$extensions"
    for ext in "${ext_array[@]}"; do
        ext="${ext#.}"
        find_extensions+=(-name "*.${ext}")
    done
    
    if [[ ${#find_extensions[@]} -eq 0 ]]; then
        return 0
    fi
    
    local start_time=$(date +%s%3N)
    
    if [[ ${#find_extensions[@]} -eq 1 ]]; then
        find "$target_path" -type f "${find_extensions[0]}" -print0 | \
        xargs -0 -P $(nproc) -I {} rm -f {} 2>/dev/null
    else
        local find_cmd=("find" "$target_path" "-type" "f")
        for ((i=0; i<${#find_extensions[@]}; i++)); do
            find_cmd+=("${find_extensions[i]}")
            if [[ $i -lt $((${#find_extensions[@]} - 1)) ]]; then
                find_cmd+=("-o")
            fi
        done
        
        "${find_cmd[@]}" -print0 | \
        xargs -0 -P $(nproc) -I {} rm -f {} 2>/dev/null
    fi
    
    local end_time=$(date +%s%3N)
    local deleted_count=$(find "$target_path" -type f \( $(echo "${find_extensions[@]}" | tr ' ' '|') \) 2>/dev/null | wc -l)
    
    echo "::debug::Deleted $deleted_count files in $((end_time - start_time))ms"
}
export -f clearall
