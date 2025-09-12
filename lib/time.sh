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
current_time_ms() {
    echo $(($(date +%s%N) / 1000000))
}
format_duration() {
    local ms=$1
    local seconds minutes result
    
    if [ "$ms" -lt 0 ]; then
        echo "0ms"
        return
    fi
    
    if [ "$ms" -lt 1000 ]; then
        echo "${ms}ms"
        return
    fi
    
    seconds=$((ms / 1000))
    
    if [ "$seconds" -le 60 ]; then
        # Округляем до десятых: ms/100 = десятые, затем делим на 10
        local tenths=$(( (ms + 50) / 100 ))
        echo "${tenths%?}.${tenths: -1}s"
    else
        # Минуты: округляем до сотых
        minutes=$(echo "scale=2; $seconds / 60" | bc)
        echo "${minutes}m"
    fi
}
calculate_duration() {
    local time1=$1
    local time2=$2
    local diff=$((time2 - time1))
    format_duration "$diff"
}

export -f current_time_ms
export -f calculate_duration
