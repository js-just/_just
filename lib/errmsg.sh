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
ERRORS_FILE="$GITHUB_ACTION_PATH/data/codes.json"
source $GITHUB_ACTION_PATH/src/modules/color.sh
ERROR_PREFIX="_just"

ErrorMessage() {
    local ERROR_CODE=$2
    local ERROR_MESSAGE=${3:-$(jq -r ".[\"$1\"][] | select(.code==\"$ERROR_CODE\") | .message" "$ERRORS_FILE")}
    local ERROR_LINK=$(jq -r ".[\"$1\"][] | select(.code==\"$ERROR_CODE\") | .link" "$ERRORS_FILE")
    local ERROR_TYPE="Error"
    local ERROR_COLOR=$_RED
    local ERROR_PREFIX_COLOR=$_LIGHTRED
    if [[ $ERROR_CODE == 02* ]]; then
        ERROR_TYPE="Warning"
        ERROR_COLOR=$_YELLOW
        ERROR_PREFIX_COLOR=$_ORANGE
    fi
    echo -e "$_LIGHTPURPLE_BG$_DARKGRAY$ERROR_PREFIX$_RESET: $ERROR_PREFIX_COLOR$ERROR_TYPE $ERROR_COLOR$ERROR_CODE: $ERROR_MESSAGE $ERROR_LINK$_RESET"
}

_justMessage() {
    local MESSAGE=$1
    echo -e "$_LIGHTPURPLE_BG$_DARKGRAY$ERROR_PREFIX$_RESET:$_CYAN INFO:$_RESET$MESSAGE"
}

customErrorMessage() {
    echo -e "$_LIGHTPURPLE_BG$_DARKGRAY$ERROR_PREFIX$_RESET: $_RESET$1 $2: $3"
}

export -f ErrorMessage
export -f _justMessage
export -f customErrorMessage
