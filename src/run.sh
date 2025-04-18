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
ERRORS_FILE="$GITHUB_ACTION_PATH/data/codes.json"
CONFIG_FILE="just.config.js"

if [ ! -f "$CONFIG_FILE" ]; then
    ERROR_CODE="0108"
    ERROR_MESSAGE=$(jq -r ".[\"run.sh\"][] | select(.code==\"$ERROR_CODE\") | .message" "$ERRORS_FILE")
    ERROR_LINK=$(jq -r '.["run.sh"][] | select(.code=="0108") | .link' "$ERRORS_FILE")
    echo "Error $ERROR_CODE: $ERROR_MESSAGE $ERROR_LINK"
    exit 1
fi

CONFIG_CONTENT=$(cat "$CONFIG_FILE")
if ! CONFIG_JSON=$(echo "$CONFIG_CONTENT" | node -e "console.log(JSON.stringify(eval('(' + process.stdin.read() + ')')));"); then
    ERROR_MESSAGE=$(jq -r '.["run.sh"][] | select(.code=="0109") | .message' "$ERRORS_FILE")
    ERROR_CODE="0109"
    ERROR_LINK=$(jq -r '.["run.sh"][] | select(.code=="0109") | .link' "$ERRORS_FILE")
    echo "Error $ERROR_CODE: $ERROR_MESSAGE $ERROR_LINK"
    exit 1
fi

if [ -z "$(echo "$CONFIG_JSON" | jq -r '.module.exports')" ]; then
    ERROR_MESSAGE=$(jq -r '.["run.sh"][] | select(.code=="0112") | .message' "$ERRORS_FILE")
    ERROR_CODE="0112"
    ERROR_LINK=$(jq -r '.["run.sh"][] | select(.code=="0112") | .link' "$ERRORS_FILE")
    echo "Error $ERROR_CODE: $ERROR_MESSAGE $ERROR_LINK"
    exit 1
fi

TYPE=$(echo "$CONFIG_JSON" | jq -r '.module.exports.type')
if [ -z "$TYPE" ]; then
    ERROR_MESSAGE=$(jq -r '.["run.sh"][] | select(.code=="0110") | .message' "$ERRORS_FILE")
    ERROR_CODE="0110"
    ERROR_LINK=$(jq -r '.["run.sh"][] | select(.code=="0110") | .link' "$ERRORS_FILE")
    echo "Error $ERROR_CODE: $ERROR_MESSAGE $ERROR_LINK"
    exit 1
fi

if [[ "$TYPE" != "postprocessor" && "$TYPE" != "redirect" ]]; then
    ERROR_MESSAGE=$(jq -r '.["run.sh"][] | select(.code=="0111") | .message' "$ERRORS_FILE")
    ERROR_CODE="0111"
    ERROR_LINK=$(jq -r '.["run.sh"][] | select(.code=="0111") | .link' "$ERRORS_FILE")
    echo "Error $ERROR_CODE: $ERROR_MESSAGE $ERROR_LINK"
    exit 1
fi

if [ "$TYPE" == "postprocessor" ]; then
    bash "$GITHUB_ACTION_PATH/src/postprocessor.sh"
fi
