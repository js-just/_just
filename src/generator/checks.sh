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
source "$GITHUB_ACTION_PATH/lib/errmsg.sh"

if [ ! -f "just.config.json" ]; then
    ERROR_MESSAGE=$(ErrorMessage "docs/checks.sh" "0108")
    echo -e "::error::$ERROR_MESSAGE" >&2
    exit 1
fi

config=$(cat just.config.json)
if ! jq -e . >/dev/null 2>&1 <<< "$config"; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0112")
    echo -e "::error::$ERROR_MESSAGE" >&2
    exit 1
fi

if ! echo "$config" | jq -e '.docs_config' > /dev/null 2>&1; then
    ERROR_MESSAGE=$(ErrorMessage "docs/checks.sh" "0118")
    echo -e "::error::$ERROR_MESSAGE" >&2
    exit 1
fi

validation_result=$(echo "$config" | jq -r '
    if (. | type != "object") then
        "invalid_json"
    elif (.domain | type != "string" or .domain == "") then
        "domain_error"
    elif (.docs_config | type != "object") then
        "docs_config_error" 
    elif ((.docs_config.title | type != "string" or .docs_config.title == "") and 
          (.docs_config.metatitle | type != "string" or .docs_config.metatitle == "")) then
        "title_error"
    else
        "success"
    end
')

case "$validation_result" in
    "invalid_json")
        ERROR_MESSAGE=$(ErrorMessage "run.sh" "0112")
        echo -e "::error::$ERROR_MESSAGE" >&2
        exit 1
        ;;
    "domain_error")
        ERROR_MESSAGE=$(ErrorMessage "docs/checks.sh" "0120")
        echo -e "::error::$ERROR_MESSAGE" >&2
        exit 1
        ;;
    "docs_config_error")
        ERROR_MESSAGE=$(ErrorMessage "docs/checks.sh" "0118")
        echo -e "::error::$ERROR_MESSAGE" >&2
        exit 1
        ;;
    "title_error")
        ERROR_MESSAGE=$(ErrorMessage "docs/checks.sh" "0119")
        echo -e "::error::$ERROR_MESSAGE" >&2
        exit 1
        ;;
    *)
        echo "::debug::Running Just an Ultimate Site Tool Generator Mode"
        exit 0
        ;;
esac
