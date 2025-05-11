# MIT License
# 
# Copyright (c) 2025 JustDeveloper <https://justdeveloper.is-a.dev/>
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
source $GITHUB_ACTION_PATH/src/modules/errmsg.sh
config=$(cat just.config.json)

local docs_config=$(echo "$config" | jq -r '.docs_config')
if ! echo "$config" | jq -e '.docs_config' > /dev/null; then
    local ERROR_MESSAGE=($(ErrorMessage "docs/checks.sh" "0118"))
    echo $ERROR_MESSAGE && exit 1
fi

validate_docs_config() {
    local metatitle=$(echo "$config" | jq -r '.docs_config.metatitle' > /dev/null)
    if [[ -z "$metatitle" ]]; then
        local ERROR_MESSAGE=($(ErrorMessage "docs/checks.sh" "0119"))
        echo $ERROR_MESSAGE && exit 1
    fi
    local domain=$(echo "$config" | jq -r '.docs_config.domain' > /dev/null)
    if [[ -z "$domain" ]]; then
        local ERROR_MESSAGE=($(ErrorMessage "docs/checks.sh" "0120"))
        echo $ERROR_MESSAGE && exit 1
    fi
}

validate_docs_config
