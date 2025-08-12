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
CONFIG_FILE="just.config.js"
CONFIG_DATA="just.config.json"
source $GITHUB_ACTION_PATH/src/modules/errmsg.sh
source $GITHUB_ACTION_PATH/src/modules/color.sh
if [ "$INPUT_PATH" == ""]; then
  INPUT_PATH="."
elif [ -z "$INPUT_PATH" ]; then
  INPUT_PATH="."
fi

VERSION=$(echo "$GITHUB_ACTION_PATH" | grep -oP '(?<=/v)[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?' || echo "$GITHUB_SHA")
if [[ "$VERSION" != "$GITHUB_SHA" && "$VERSION" != v* ]]; then
  VERSION="v$VERSION"
fi
msg1=$(_justMessage "$_BLUE Running$_LIGHTPURPLE Just an Ultimate Site Tool$_RESET $VERSION")
msg2=$(_justMessage "$_BLUE Installing Node.js$_RESET...")
msg3=$(_justMessage "$_BLUE Installed Node.js$_RESET")
msg4=$(_justMessage "$_BLUE Redirecting...$_RESET")
msg5=$(_justMessage "$_GREEN Generating completed$_RESET")
msg6=$(_justMessage "$_GREEN Compressing completed$_RESET")
msg9=$(_justMessage "$_GREEN Generating completed$_RESET")
echo -e "$msg1"

chmod +x "$GITHUB_ACTION_PATH/src/time.py" # use python to get current time in ms cuz yes
TIME0=$(python3 "$GITHUB_ACTION_PATH/src/time.py")
installNodejs() {
    echo -e "$msg2"
    local TIME1=$(python3 "$GITHUB_ACTION_PATH/src/time.py")
    if ! command -v node > /dev/null; then # attempt 0: nodejs installed before running _just
        # attempt 1: install via curl
        sudo apt-get remove -y nodejs npm > /dev/null 2>&1 || true
        sudo apt-get update -qq > /dev/null 2>&1
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - > /dev/null 2>&1
        sudo apt-get install -y nodejs > /dev/null 2>&1
        if ! command -v node > /dev/null; then
            # attempt 2: install via curl with logs
            local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0207")
            echo -e "$ERROR_MESSAGE"
            sudo apt-get remove -y nodejs npm || true
            sudo apt-get update -qq
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
            if ! command -v node > /dev/null; then
                # attempt 3: install via sudo apt install
                local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0208")
                echo -e "$ERROR_MESSAGE"
                sudo apt update -qq && sudo apt install -y nodejs npm > /dev/null 2>&1
                if [ $? -ne 0 ]; then
                    # attempt 4: install via sudo apt install with logs
                    local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0205")
                    echo -e "::error::$ERROR_MESSAGE"
                    sudo apt update
                    sudo apt install -y nodejs npm
                fi
            fi
        fi
    fi
    local TIME2=$(python3 "$GITHUB_ACTION_PATH/src/time.py")
    NODEVERSION=$(node --version)
    NODESECONDS=$(node "$GITHUB_ACTION_PATH/src/time.js" "$TIME1" "$TIME2") # use js to get nodejs installing duration cuz yes
    echo -e "$msg3 $NODEVERSION ($NODESECONDS)"
}

if [ -f "$CONFIG_DATA" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0113")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0108")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

CONFIG_JSON=$(node -e "console.log(JSON.stringify(require('./just.config.js')));")
if [ $? -ne 0 ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0109")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi
echo "Parsed just.config.js module.exports: $CONFIG_JSON" # debug
echo "$CONFIG_JSON" > "$CONFIG_DATA"

if [ -z "$(echo "$CONFIG_JSON" | jq -r '.module.exports')" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0112")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

TYPE=$(echo "$CONFIG_JSON" | jq -r '.type')
if [ -z "$TYPE" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0110")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

if [[ "$TYPE" != "postprocessor" && "$TYPE" != "redirect" && "$TYPE" != "compress" && "$TYPE" != "docs" ]]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0111")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

_just_d="no" && \
if [[ "$TYPE" != "compress" && ! ( "$TYPE" == "docs" && "$INPUT_PATH" != "." ) ]]; then
    if [ -d "deploy" ]; then
        ERROR_MESSAGE=$(ErrorMessage "important_dirs" "0106")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
    if [ -d "_just_data" ]; then
        ERROR_MESSAGE=$(ErrorMessage "important_dirs" "0107")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
    mkdir -p deploy
    mkdir -p _just_data
elif [ "$TYPE" == "docs" ]; then
    JDD=$(echo "$INPUT_PATH/_just_data" | sed 's#//*#/#g')
    _just_dir=$(echo "$INPUT_PATH/_just" | sed 's#//*#/#g')
    if [ -d "$JDD" ]; then
        ERROR_MESSAGE=$(ErrorMessage "important_dirs" "0125")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
    if [ -d "$_just_dir" ]; then
        ERROR_MESSAGE=$(ErrorMessage "important_dirs" "0125")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
    mkdir -p "$JDD"
    mkdir -p "$_just_dir"
    _just_d="yes"
fi

jserr() {
    echo -e "::error::$(cat "_just_data/e.txt")" && exit 1
}
HLJSCSS="$GITHUB_ACTION_PATH/src/documentation/templates/hljs-themes"
hljsstyles() {
    echo "$(node $GITHUB_ACTION_PATH/src/documentation/hljscss.js "$(cat "$HLJSCSS/_just_default_light.css")")"
}

if [ "$TYPE" != "postprocessor" ]; then
    echo "postprocessor=0" >> "$GITHUB_OUTPUT"
fi

if [ "$TYPE" == "postprocessor" ]; then
    rm just.config.json && \
    echo "postprocessor=1" >> "$GITHUB_OUTPUT" && \
    echo -e "$msg4"
elif [ "$TYPE" == "redirect" ]; then
    mkdir -p deploy/_just && \
    installNodejs && \
    bash $GITHUB_ACTION_PATH/src/redirect/checks.sh && \
    node $GITHUB_ACTION_PATH/src/redirect/index.js && \
    TIME3=$(python3 "$GITHUB_ACTION_PATH/src/time.py") && \
    DONEIN=$(node "$GITHUB_ACTION_PATH/src/time.js" "$TIME0" "$TIME3") && \
    echo -e "$msg5 ($DONEIN)"
elif [ "$TYPE" == "compress" ]; then
    mkdir -p deploy && \
    installNodejs && \
    node $GITHUB_ACTION_PATH/src/compress.js "$INPUT_PATH" && \
    TIME3=$(python3 "$GITHUB_ACTION_PATH/src/time.py") && \
    DONEIN=$(node "$GITHUB_ACTION_PATH/src/time.js" "$TIME0" "$TIME3") && \
    echo -e "$msg6 ($DONEIN)"
elif [ "$TYPE" == "docs" ]; then
    HTML=$(cat "$GITHUB_ACTION_PATH/src/documentation/templates/page.html") && \
    CSS=$(cat "$GITHUB_ACTION_PATH/src/documentation/templates/base.css") && \
    JS=$(cat "$GITHUB_ACTION_PATH/src/documentation/templates/page.js") && \
    HIGHLIGHTCSS=$(cat "$HLJSCSS/_just_default_dark.css") && \
    HIGHLIGHTJSON=$(hljsstyles) && \
    BUTTONSCSS=$(cat "$GITHUB_ACTION_PATH/src/documentation/templates/buttons.css") && \
    SEARCHCSS=$(cat "$GITHUB_ACTION_PATH/src/documentation/templates/search.css") && \
    CUSTOMCSS=false && \
    CUSTOMCSSPATH="just.config.css" && \
    if [ -f "$CUSTOMCSSPATH" ]; then
        CUSTOMCSS=$(cat "$CUSTOMCSSPATH")
    fi && \
    if [[ -d "_just" && "$_just_d" == "no" ]]; then
        ERROR_MESSAGE=$(ErrorMessage "important_dirs" "0121")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi && \
    if [ -f "_just_error" ]; then 
        ERROR_MESSAGE=$(ErrorMessage "run.sh" "0127")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi && \
    mkdir -p _just && \
    mkdir -p deploy && \
    installNodejs && \
    bash $GITHUB_ACTION_PATH/src/documentation/checks.sh && \
    INDEXJS0="$GITHUB_ACTION_PATH/src/documentation/index.js"
    INDEXJS1=$(cat "$INDEXJS0") && \
    INDEXJS2=$(cat "$GITHUB_ACTION_PATH/src/line.js") && \
    echo "$INDEXJS2" > "$INDEXJS0" && \
    INDEXJS3=$(node "$INDEXJS0" "$INDEXJS1") && \
    echo "$INDEXJS3" > "$INDEXJS0" && \
    HLJSLANGS=$(cat "$GITHUB_ACTION_PATH/data/hljslangs.json") && \
    LANGS=$(cat "$GITHUB_ACTION_PATH/data/langs.json") && \
    LANGSTEXT=$(cat "$GITHUB_ACTION_PATH/data/langstext.json") && \
    node "$INDEXJS0" "$HTML" "$CSS" "$JS" "$INPUT_PATH" "$GITHUB_REPOSITORY" "$GITHUB_REPOSITORY_OWNER" "$CUSTOMCSS" "$HLJSLANGS" "$LANGS" "$HIGHLIGHTCSS" "$LANGSTEXT" "$VERSION" "$BUTTONSCSS" "$SEARCHCSS" "$HIGHLIGHTJSON" "$INPUT_FIXPATH" || jserr && \
    node $GITHUB_ACTION_PATH/src/compress.js "$INPUT_PATH" && \
    node "$GITHUB_ACTION_PATH/src/documentation/logs.js" "$INPUT_PATH" && \
    TIME3=$(python3 "$GITHUB_ACTION_PATH/src/time.py") && \
    DONEIN=$(node "$GITHUB_ACTION_PATH/src/time.js" "$TIME0" "$TIME3") && \
    echo -e "$msg9 ($DONEIN)"
fi
