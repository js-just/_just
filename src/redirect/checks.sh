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
source $GITHUB_ACTION_PATH/lib/errmsg.sh
source $GITHUB_ACTION_PATH/lib/color.sh

config=$(cat just.config.json)

redirect_config_=$(echo "$config" | jq -r '.redirect_config')
if ! echo "$config" | jq -e '.redirect_config' > /dev/null; then
    local ERROR_MESSAGE=$(ErrorMessage "redirect/checks.sh" "0117")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

validate_redirect_config() {
    if ! echo "$config" | jq -e '.redirect_config.url' > /dev/null; then
        local ERROR_MESSAGE=$(ErrorMessage "redirect/checks.sh" "0114")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
}

validate_paths() {
    local paths=$(echo "$config" | jq -c '.redirect_config.paths[]?')
    if [[ -n "$paths" ]]; then
        local countt=0
        for path in $paths; do
            if ! echo "$path" | jq -e '.url' > /dev/null; then
                local ERROR_MESSAGE=$(customErrorMessage "Error" "0115" "Missing \"url\" in item #$countt in \"paths\" in \"redirect_config\" in \"module.exports\" at \"just.config.js\" file.")
                echo -e "::error::$_RED$ERROR_MESSAGE$_RESET" && exit 1
            fi

            if ! echo "$path" | jq -e '.path_' > /dev/null; then
                local ERROR_MESSAGE=$(customErrorMessage "Error" "0116" "Missing \"path_\" in item #$countt in \"paths\" in \"redirect_config\" in \"module.exports\" at \"just.config.js\" file.")
                echo -e "::error::$_RED$ERROR_MESSAGE$_RESET" && exit 1
            fi

            countt=$((countt + 1))
        done
    fi
}

validate_redirect_config && \
validate_paths && \
echo "::debug::Running Just an Ultimate Site Tool Redirector Mode"
