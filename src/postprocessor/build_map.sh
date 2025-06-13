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

# Generate Build Map/Manifest

BUILD_ID=$(cat .next/BUILD_ID)
mkdir -p deploy/_just/static/
mkdir -p deploy/_just/static/$BUILD_ID/
mkdir -p deploy/_just/static/chunks/

source $GITHUB_ACTION_PATH/src/modules/string.sh

random_strings=($(generate_strings 1 16))
clearCache_name=${random_strings[0]}c

echo "[" > deploy/api/build-manifest
echo "" > deploy/api/build-manifest.txt
echo "[" > deploy/api/_just_build-manifest
echo "" > deploy/api/_just_build-manifest.txt

echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/buildManifest_start.js)" > deploy/_just/static/$BUILD_ID/buildManifest.js
echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/_justManifest_start.js)" > deploy/_just/static/$BUILD_ID/_justManifest.js
echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/clearCache.js)" > deploy/_just/static/chunks/$clearCache_name.js
find _just_data -mindepth 1 -print | while read -r path; do
    relative_path=${path#_just_data/}
    first_line=$(head -n 1 "$path")
    if [ -f "$path" ]; then
        if [[ "$first_line" != "// _just hide" || 
            "$first_line" != "// _just doNotModify+hide" ]]; then
            echo "    _just_Manifest0.push(\"$relative_path\");" >> deploy/_just/static/$BUILD_ID/_justManifest.js
            echo "\"$relative_path\"," >> deploy/api/_just_build-manifest
            echo "$relative_path" >> deploy/api/_just_build-manifest.txt
        fi
    fi
done

function human_readable_size {
    local size=$1
    if [ "$size" -ge 1073741824 ]; then
        echo "$(bc <<< "scale=2; $size/1073741824") GB"
    elif [ "$size" -ge 1048576 ]; then
        echo "$(bc <<< "scale=2; $size/1048576") MB"
    elif [ "$size" -ge 1024 ]; then
        echo "$(bc <<< "scale=2; $size/1024") KB"
    else
        echo "$size B"
    fi
}

echo -e "\n----------------\n\nBuild Map:\n"
FILE_ID=1
TOTAL_FILES=$(find deploy -mindepth 1 -print | wc -l)
TOTAL_SIZE=0
find deploy -mindepth 1 -print | while read -r path; do
    relative_path=${path#deploy/}
    first_line=$(head -n 1 "$path")
    if [ -f "$path" ]; then
        case "${path##*.}" in
            
            # Website files (idk how to name them) 
            html) type="HTML" ;;
            php) type="PHP" ;;
            css) type="CSS" ;;
            js) type="JavaScript" ;;
            json) type="JSON" ;;
            txt) type="Text" ;;
            xml) type="XML" ;;
            webmanifest) type="Webmanifest" ;;

            # Media
            png) type="Image/Png" ;;
            svg) type="Image/SVG" ;;
            jpeg|jpg) type="Image/Jpeg" ;;
            webp) type="Image/Webp" ;;
            bmp) type="Image/Bmp" ;;
            gif) type="Image/GIF" ;;
            heic) type="Image/HEIC" ;;
            ico) type="Favicon" ;;
            mp4) type="Video/MP4" ;;
            mov) type="Video/Mov" ;;
            webm) type="Video/Webm" ;;
            m4a) type="Audio/M4A" ;;
            mp2) type="Audio/MP2" ;;
            mp3) type="Audio/MP3" ;;
            ogg) type="Audio/OGG" ;;
            wav) type="Audio/WAV" ;;
            wma) type="Audio/WMA" ;;

            # Fonts
            otf) type="Font/OTF" ;;
            woff) type="Font/WOFF" ;;
            woff2) type="Font/WOFF2" ;;

            # Archive
            7z) type="Archive/7z" ;;
            tar) type="Archive/TAR" ;;
            rar) type="Archive/RAR" ;;
            zip) type="Archive/ZIP" ;;
            
            # Todo: more files support
            *) type="Other" ;;

        esac
        file_size=$(stat -c%s "$path")
        TOTAL_SIZE=$((TOTAL_SIZE + $((file_size))))

        if [ "$FILE_ID" -eq 1 ]; then
            printf "┌ %s | %s\n" "$(human_readable_size $file_size)" "$relative_path"
        elif [ "$FILE_ID" -eq "$TOTAL_FILES" ]; then
            printf "└ %s | %s\n" "$(human_readable_size $file_size)" "$relative_path"
        else
            printf "├ %s | %s\n" "$(human_readable_size $file_size)" "$relative_path"
        fi
        
        if [[ "$first_line" != "// _just hide" || 
            "$first_line" != "// _just doNotModify+hide" ]]; then
            buildManifestJSONString="{\"type\": \"$type\", \"path\": \"$relative_path\", \"size\": {\"bytes\": $file_size, \"string\": \"$(human_readable_size $file_size)\"}}"
            echo "    _just_buildManifest0.push($buildManifestJSONString);" >> deploy/_just/static/$BUILD_ID/buildManifest.js
            echo "$buildManifestJSONString," >> deploy/api/build-manifest
            echo "($type) $relative_path - $(human_readable_size $file_size)" >> deploy/api/build-manifest.txt
        fi
    fi
    
    FILE_ID=$((FILE_ID + 1))
done

manifest_size=$(stat -c%s "deploy/_just/static/$BUILD_ID/buildManifest.js")
echo -e "End Build Map\n\n"
echo -e "_just/static/$BUILD_ID/buildManifest.js size: $(human_readable_size $manifest_size)\n"
echo -e "                            Total build size: $(human_readable_size $TOTAL_SIZE)\n\n"
echo -e "----------------\n"
echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/buildManifest_end.js)" >> deploy/_just/static/$BUILD_ID/buildManifest.js
echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/_justManifest_end.js)" >> deploy/_just/static/$BUILD_ID/_justManifest.js

for html_file in deploy/*.html; do
    sed -i.bak '/^[[:space:]]*<\/body>[[:space:]]*$/d' "$html_file"
    sed -i.bak '/^[[:space:]]*<\/html>[[:space:]]*$/d' "$html_file"
    
    echo "<script src=\"_just/static/$BUILD_ID/buildManifest.js\"></script>" >> "$html_file"
    echo "<script src=\"_just/static/$BUILD_ID/_justManifest.js\"></script>" >> "$html_file"
    echo "<script src=\"_just/static/chunks/$clearCache_name.js\"></script>" >> "$html_file"
    
    echo "</body>" >> "$html_file"
    echo "</html>" >> "$html_file"
done

echo "{}]" >> deploy/api/build-manifest
echo "" >> deploy/api/build-manifest.txt
echo "\"\"]" >> deploy/api/_just_build-manifest
echo "" >> deploy/api/_just_build-manifest.txt
cp deploy/api/_just_build-manifest deploy/api/_just_build-manifest.json
cp deploy/api/build-manifest deploy/api/build-manifest.json