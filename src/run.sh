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

source $GITHUB_ACTION_PATH/lib/errmsg.sh
source $GITHUB_ACTION_PATH/lib/color.sh
source $GITHUB_ACTION_PATH/lib/runts.sh
source $GITHUB_ACTION_PATH/lib/time.sh
source $GITHUB_ACTION_PATH/lib/js.sh
source $GITHUB_ACTION_PATH/lib/cleanup.sh

if [ -z "$INPUT_PATH" ] || [ "$INPUT_PATH" == "" ]; then
    INPUT_PATH="."
fi

chmod +x "$GITHUB_ACTION_PATH/src/last-commit.py"
chmod +x "$GITHUB_ACTION_PATH/src/latest.py"
LAST_COMMIT=$(python3 "$GITHUB_ACTION_PATH/src/last-commit.py")
LATEST_VER=$(python3 "$GITHUB_ACTION_PATH/src/latest.py")
COMMIT_SHA=$(cat "$GITHUB_ACTION_PATH/data/generated/sha.txt")
VERSION=$(echo "$GITHUB_ACTION_PATH" | grep -oP '(?<=/v)[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?' || echo "$COMMIT_SHA")
checkPermissions() {
    chmod +x "$GITHUB_ACTION_PATH/src/current-commit.py" && \
    local ACCESS=$(python3 "$GITHUB_ACTION_PATH/src/current-commit.py" "$COMMIT_SHA") && \
    if [ "$ACCESS" != "Y" ]; then
        local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0129")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
}
if [[ "$VERSION" != "$COMMIT_SHA" && "$VERSION" != v* ]]; then
    VERSION="v$VERSION"
elif [[ "$VERSION" == "$COMMIT_SHA" && "$COMMIT_SHA" == "$LAST_COMMIT" ]]; then
    VERSION="@main $VERSION"
    chmod +x "$GITHUB_ACTION_PATH/src/check-last-commit.py" && \
    CLC_OUTPUT=$(python3 "$GITHUB_ACTION_PATH/src/check-last-commit.py") && \
    if [ "$CLC_OUTPUT" != "Y" ]; then
        checkPermissions
    fi
elif [[ "$VERSION" == "$COMMIT_SHA" ]]; then
    checkPermissions
fi
if [[ "$VERSION" == v* && "$VERSION" == "$LATEST_VER" ]]; then
    VERSION="/latest $VERSION"
fi
msg1=$(_justMessage "$_BLUE Running$_LIGHTPURPLE Just an Ultimate Site Tool$_RESET $VERSION")
msg2=$(_justMessage "$_BLUE Installing Node.js$_RESET...")
msg3=$(_justMessage "$_BLUE Installed Node.js$_RESET")
msg4=$(_justMessage "$_BLUE Redirecting...$_RESET")
msg5=$(_justMessage "$_GREEN Generating completed$_RESET")
msg6=$(_justMessage "$_GREEN Compressing completed$_RESET")
msg9=$(_justMessage "$_GREEN Generating completed$_RESET")
msg10=$(_justMessage "$_BLUE Installing TypeScript compiler$_RESET...")
msg11=$(_justMessage "$_BLUE Installed TypeScript compiler$_RESET")
msg12=$(_justMessage "$_BLUE Installing Homebrew$_RESET...")
msg13=$(_justMessage "$_BLUE Installed$_RESET")
msg14=$(_justMessage "$_BLUE Installing Dart Sass$_RESET...")
msg15=$(_justMessage "$_BLUE Installed Dart Sass$_RESET")
msg16=$(_justMessage "$_BLUE Preprocessed in$_RESET")
msg17=$(_justMessage "$_BLUE Postprocessed in$_RESET")
msg18=$(_justMessage "$_BLUE Installing UglifyJS$_RESET...")
msg19=$(_justMessage "$_BLUE Installed UglifyJS$_RESET...")
echo -e "$msg1"

NODEJSINSTALLED="n"
installNodejs() {
    if [ "$NODEJSINSTALLED" != "y" ]; then
        echo -e "$msg2"
        local TIME1=$(current_time_ms)
        if ! command -v node > /dev/null; then # attempt 0: nodejs installed before running _just
            # attempt 1: install via curl
            sudo apt-get remove -y nodejs npm > /dev/null 2>&1 || true
            sudo apt-get update -qq > /dev/null 2>&1
            curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash - > /dev/null 2>&1
            sudo apt-get install -y nodejs > /dev/null 2>&1
            if ! command -v node > /dev/null; then
                # attempt 2: install via curl with logs
                local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0207")
                echo -e "$ERROR_MESSAGE"
                sudo apt-get remove -y nodejs npm || true
                sudo apt-get update -qq
                curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
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
        NODEJSINSTALLED="y"
        local TIME2=$(current_time_ms)
        NODEVERSION=$(node --version)
        NODESECONDS=$(calculate_duration "$TIME1" "$TIME2")
        echo -e "$msg3 $NODEVERSION ($NODESECONDS)"
    fi
}
installTypeScriptCompiler() {
    echo -e "$msg10"
    local TIME1=$(current_time_ms)
    if ! command -v tsc > /dev/null; then # attempt 0: tsc installed before running _just
        # attempt 1: install without logs
        sudo apt remove -y typescript > /dev/null 2>&1 || true
        sudo apt update -qq > /dev/null 2>&1 || true
        sudo apt install -y typescript > /dev/null 2>&1
        if ! command -v tsc > /dev/null; then
            # attempt 2: install with logs
            local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0210")
            echo -e "$ERROR_MESSAGE"
            sudo apt remove -y typescript || true
            sudo apt update -qq || true
            sudo apt install -y typescript
        fi
    fi
    local TIME2=$(current_time_ms)
    TSCVERSION=$(tsc --version 2>/dev/null)
    TSCSECONDS=$(calculate_duration "$TIME1" "$TIME2")
    echo -e "$msg11 $TSCVERSION ($TSCSECONDS)"
}
installHomebrew() {
    installNodejs
    echo -e "$msg12"
    local TIME1=$(current_time_ms)
    if ! command -v brew &> /dev/null; then # attempt 0: homebrew installed before running _just
        # attempt 1: install without logs
        NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" > /dev/null 2>&1
        if [ -f "/home/linuxbrew/.linuxbrew/bin/brew" ]; then
            echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc 2>/dev/null
            eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" 2>/dev/null
        fi
        if ! command -v brew &> /dev/null; then
            # attempt 2: install with logs
            local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0211")
            echo -e "$ERROR_MESSAGE"
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
            eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
        fi
    fi
    local TIME2=$(current_time_ms)
    HBVERSION=$(brew --version)
    HBSECONDS=$(calculate_duration "$TIME1" "$TIME2")
    echo -e "$msg13 $HBVERSION ($HBSECONDS)"
}
installDartSass() {
    echo -e "$msg14"
    local TIME1=$(current_time_ms)
    if ! command -v sass &> /dev/null; then # attempt 0: dart sass installed before running _just
        # attempt 1: install without logs
        brew install sass/sass/sass > /dev/null 2>&1
        if ! command -v sass &> /dev/null; then
            # attempt 2: install with logs
            local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0212")
            echo -e "$ERROR_MESSAGE"
            brew install sass/sass/sass
        fi
    fi
    local TIME2=$(current_time_ms)
    DSSECONDS=$(calculate_duration "$TIME1" "$TIME2")
    echo -e "$msg15 ($DSSECONDS)"
}

if [ -f "$CONFIG_DATA" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0113")
    echo -e "::error file=just.config.json::$ERROR_MESSAGE" && exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0108")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

installNodejs && \
CONFIG_JSON=$(javascript -e "console.log(JSON.stringify(require('./just.config.js')));")
if [ $? -ne 0 ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0109")
    echo -e "::error file=just.config.js::$ERROR_MESSAGE" && exit 1
fi
echo "::debug::Parsed just.config.js module.exports: $CONFIG_JSON"
echo "$CONFIG_JSON" > "$CONFIG_DATA"

if [ -z "$(echo "$CONFIG_JSON" | jq -r '.module.exports')" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0112")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

CONFIG_VALUES=$(echo "$CONFIG_JSON" | jq -r '
.mode,
.install.typescript_compiler,
.install.dart_sass,
.compile.ts,
.compile.sass,
.compile.scss,
.install.uglifyjs,
.uglifyjs.reserve // [],
.uglifyjs.unsafe,
.uglifyjs.source_map,
.uglifyjs.disable.dead_code,
.uglifyjs.disable.sequences
')

{
    read -r TYPE
    read -r USE_TSC
    read -r USE_SASS  
    read -r COMPILE_TS
    read -r COMPILE_SASS
    read -r COMPILE_SCSS
    read -r USE_UGLIFYJS
    read -r UGLIFYJS_R
    read -r UGLIFYJS_U
    read -r UGLIFYJS_SM
    read -r UGLIFYJS_DC
    read -r UGLIFYJS_S
} <<< "$CONFIG_VALUES"

TIME4=$(current_time_ms)
PREPROCESSED="n"
checkForDartSass() {
    if ! command -v sass &> /dev/null; then
        local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0134")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
}

Y="true"
if [ -z "$TYPE" ]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0110")
    echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

if [[ "${USE_TSC,,}" == "$Y" ]]; then
    installTypeScriptCompiler
fi && \
if [[ "${USE_SASS,,}" == "$Y" ]]; then
    if [ -d "_just_temp" ]; then
        ERROR_MESSAGE=$(ErrorMessage "important_dirs" "0130")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
    installHomebrew && installDartSass
fi && \
if [[ "${COMPILE_TS,,}" == "$Y" ]]; then
    PREPROCESSED="y"
    if ! command -v tsc > /dev/null; then
        ERROR_MESSAGE=$(ErrorMessage "run.sh" "0133")
        echo -e "::error::$ERROR_MESSAGE" && exit 1
    fi
    source $GITHUB_ACTION_PATH/lib/compile.sh
    tojs "$INPUT_PATH" && \
    DOCLEANUP=$(javascript $GITHUB_ACTION_PATH/src/check-cleanup.js "") && \
    if [[ "$DOCLEANUP" == 'y' ]]; then
        clearall "$INPUT_PATH" "ts"
    fi
fi && \
if [[ "${COMPILE_SASS,,}" == "$Y" ]]; then
    PREPROCESSED="y"
    checkForDartSass
    source $GITHUB_ACTION_PATH/lib/compile.sh
    tocss "$INPUT_PATH" "sass" && \
    DOCLEANUP=$(javascript $GITHUB_ACTION_PATH/src/check-cleanup.js "") && \
    if [[ "$DOCLEANUP" == 'y' ]]; then
        clearall "$INPUT_PATH" "sass"
    fi
fi && \
if [[ "${COMPILE_SCSS,,}" == "$Y" ]]; then
    PREPROCESSED="y"
    checkForDartSass
    source $GITHUB_ACTION_PATH/lib/compile.sh
    tocss "$INPUT_PATH" "scss" && \
    DOCLEANUP=$(javascript $GITHUB_ACTION_PATH/src/check-cleanup.js "") && \
    if [[ "$DOCLEANUP" == 'y' ]]; then
        clearall "$INPUT_PATH" "scss"
    fi
fi && \
if [[ "$PREPROCESSED" == "y" ]]; then
    TIME5=$(current_time_ms) && \
    PRESECONDS=$(calculate_duration "$TIME4" "$TIME5") && \
    echo -e "$msg16 $_BLUE$PRESECONDS$_RESET"
fi

if [[ "$TYPE" != "postprocessor" && "$TYPE" != "redirector" && "$TYPE" != "compressor" && "$TYPE" != "generator" && "$TYPE" != "void" ]]; then
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0111")
    echo -e "::error file=just.config.js::$ERROR_MESSAGE" && exit 1
fi

_just_d="no" && \
if [[ "$TYPE" != "compressor" && ! ( "$TYPE" == "generator" && "$INPUT_PATH" != "." ) ]]; then
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
elif [ "$TYPE" == "generator" ]; then
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
HLJSCSS="$GITHUB_ACTION_PATH/src/generator/templates/hljs-themes"
hljsstyles() {
    echo "$(javascript $GITHUB_ACTION_PATH/src/generator/hljscss.js "$(cat "$HLJSCSS/_just_default_light.css")")"
}

if [ "$TYPE" != "postprocessor" ]; then
    echo "postprocessor=0" >> "$GITHUB_OUTPUT"
fi

TIME0=$(current_time_ms)

mode_postprocessor() {
    rm -f just.config.json && \
    rm -rf deploy _just_data && \
    echo "postprocessor=1" >> "$GITHUB_OUTPUT" && \
    ERROR_MESSAGE=$(ErrorMessage "run.sh" "0213") && \
    echo -e "::warning file=just.config.js::$ERROR_MESSAGE" && \
    echo -e "$msg4"
}
mode_redirector() {
    mkdir -p deploy/_just && \
    echo "::group::Redirector mode" && \
    bash $GITHUB_ACTION_PATH/src/redirect/checks.sh && \
    javascript $GITHUB_ACTION_PATH/src/redirect/index.js "$VERSION" && \
    TIME3=$(current_time_ms) && \
    DONEIN=$(calculate_duration "$TIME0" "$TIME3") && \
    echo "::endgroup::" && \
    echo -e "$msg5 ($DONEIN)"
}
mode_compressor() {
    mkdir -p deploy && \
    echo "::debug::Running Just an Ultimate Site Tool Compressor Mode" && \
    echo "::group::Compressor mode" && \
    javascript $GITHUB_ACTION_PATH/src/compress.js "$INPUT_PATH" && \
    if [[ "${USE_UGLIFYJS,,}" == "$Y" ]]; then
        installNodejs && \
        while IFS= read -r -d '' js_file; do
            local args=("$js_file")
            local compress_opts=()
            if [ "$UGLIFYJS_R" != "[]" ]; then
                local UGLIFYJS_R_ARG=$(echo "$UGLIFYJS_R" | tr -d '[]' | tr ',' ' ' || echo "")
                args+=(-m "reserved=[$UGLIFYJS_R_ARG]")
            else
                args+=(-m)
            fi
            args+=(-o "$js_file" --comments)
            if [[ "${UGLIFYJS_U,,}" == "$Y" ]]; then
                compress_opts+=("unsafe")
            fi
            if [[ "${UGLIFYJS_DC,,}" == "$Y" ]]; then
                compress_opts+=("dead_code=false")
            fi
            if [[ "${UGLIFYJS_S,,}" == "$Y" ]]; then
                compress_opts+=("sequences=false")
            fi
            if [ ${#compress_opts[@]} -gt 0 ]; then
                args+=(-c "$(IFS=,; echo "${compress_opts[*]}")")
            fi
            if [[ "${UGLIFYJS_SM,,}" == "$Y" ]]; then 
                args+=(--source-map)
            fi

            echo "$args"

            local UGLIFYJS_OUTPUT=$(npx uglify-js@3 "${args[@]}") # 2>&1 >/dev/null)
            if [ $? -ne 0 ]; then
                local ERROR_MESSAGE=$(ErrorMessage "run.sh" "0139") && \
                echo -e "$ERROR_MESSAGE Failed to compress $js_file" && echo -e "::error::$UGLIFYJS_OUTPUT" && exit 1
            fi
        done < <(find "$INPUT_PATH" -type f -name "*.js" -print0)
    fi && \
    TIME3=$(current_time_ms) && \
    DONEIN=$(calculate_duration "$TIME0" "$TIME3") && \
    echo "::endgroup::" && \
    echo -e "$msg6 ($DONEIN)"
}
mode_generator() {
    HTML=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/page.html") && \
    CSS=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/base.css") && \
    JS=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/page.js") && \
    JST=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/themePart.js") && \
    JSIT=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/theme.js") && \
    JSIN=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/navbar.js") && \
    JSTC=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/themeClass.js") && \
    HIGHLIGHTCSS=$(cat "$HLJSCSS/_just_default_dark.css") && \
    HIGHLIGHTJSON=$(hljsstyles) && \
    BUTTONSCSS=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/buttons.css") && \
    SEARCHCSS=$(cat "$GITHUB_ACTION_PATH/src/generator/templates/search.css") && \
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
        echo -e "::error file=_just_error::$ERROR_MESSAGE" && exit 1
    fi && \
    mkdir -p _just && \
    mkdir -p deploy && \
    echo "::group::Generator mode" && \
    bash $GITHUB_ACTION_PATH/src/generator/checks.sh && \
    INDEXJS0="$GITHUB_ACTION_PATH/src/generator/index.js"
    INDEXJS1=$(cat "$INDEXJS0") && \
    INDEXJS2=$(cat "$GITHUB_ACTION_PATH/src/line.js") && \
    echo "$INDEXJS2" > "$INDEXJS0" && \
    INDEXJS3=$(javascript "$INDEXJS0" "$INDEXJS1") && \
    echo "$INDEXJS3" > "$INDEXJS0" && \
    HLJSLANGS=$(cat "$GITHUB_ACTION_PATH/data/hljslangs.json") && \
    LANGS=$(cat "$GITHUB_ACTION_PATH/data/langs.json") && \
    LANGSTEXT=$(cat "$GITHUB_ACTION_PATH/data/langstext.json") && \
    EMBEDJS=$(cat "$GITHUB_ACTION_PATH/src/generator/elements/embed.js") && \
    javascript "$INDEXJS0" "$HTML" "$CSS" "$JS" "$INPUT_PATH" "$GITHUB_REPOSITORY" "$GITHUB_REPOSITORY_OWNER" "$CUSTOMCSS" "$HLJSLANGS" "$LANGS" "$HIGHLIGHTCSS" "$LANGSTEXT" "$VERSION" "$BUTTONSCSS" "$SEARCHCSS" "$HIGHLIGHTJSON" "$INPUT_FIXPATH" "$JST" "$JSIT" "$JSIN" "$JSTC" "$EMBEDJS" || jserr && \
    javascript $GITHUB_ACTION_PATH/src/compress.js "$INPUT_PATH" && \
    javascript "$GITHUB_ACTION_PATH/src/generator/logs.js" "$INPUT_PATH" && \
    local DOCLEANUP=$(javascript $GITHUB_ACTION_PATH/src/check-cleanup.js "generator") && \
    if [[ "$DOCLEANUP" == 'y' ]]; then
        clearall "$INPUT_PATH" "md,markdown"
    fi && \
    TIME3=$(current_time_ms) && \
    DONEIN=$(calculate_duration "$TIME0" "$TIME3") && \
    echo "::endgroup::" && \
    echo -e "$msg9 ($DONEIN)"
}

case "$TYPE" in
    "postprocessor")
        mode_postprocessor
        ;;
    "redirector") 
        mode_redirector
        ;;
    "compressor")
        mode_compressor
        ;;
    "generator")
        mode_generator
        ;;
    "void")
        echo "::debug::Running Just an Ultimate Site Tool Void Mode"
        ;;
    *)
        ERROR_MESSAGE=$(ErrorMessage "run.sh" "0111")
        echo -e "::error file=just.config.js::$ERROR_MESSAGE" >&2
        exit 1
        ;;
esac && \
TIME6=$(current_time_ms) && \
javascript $GITHUB_ACTION_PATH/src/postprocessor.js "$INPUT_PATH" "$INPUT_FIXPATH" "$VERSION" && \
TIME7=$(current_time_ms) && \
POSTSECONDS=$(calculate_duration "$TIME6" "$TIME7") && \
echo -e "$msg17 $_BLUE$POSTSECONDS$_RESET"
