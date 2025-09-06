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

REQUIRED_VARS=(
    "CI"
    "GITHUB_ACTIONS"
    "GITHUB_ACTION_PATH"
    "GITHUB_REPOSITORY"
    "GITHUB_WORKSPACE"
    "GITHUB_SHA"
    "GITHUB_REF"
)

missing_vars=0
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "::error::Missing $_LIGHTRED$var$_RESET variable."
        ((missing_vars++))
    fi
done

if [ ! $missing_vars -eq 0 ]; then
    echo -e "Missing $missing_vars variables."
    ERROR_MESSAGE=$(ErrorMessage "index.sh" "0135")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi
