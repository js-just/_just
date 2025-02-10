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

# Generate Build Map/Manifest

BUILD_ID=$(cat .next/BUILD_ID)
mkdir -p deploy/_just/static/
mkdir -p deploy/_just/static/$BUILD_ID/

echo "const _just_buildManifest = [];" > deploy/_just/static/$BUILD_ID/buildManifest.js

echo -e "\n----------------\n\nBuild Map:\n"
FILE_ID=1
TOTAL_FILES=$(find deploy -mindepth 1 -print | wc -l)
find deploy -mindepth 1 -print | while read -r path; do
    relative_path=${path#deploy/}

    if [ "$FILE_ID" -eq 1 ]; then
        echo "┌ $relative_path"
    elif [ "$FILE_ID" -eq "$TOTAL_FILES" ]; then
        echo -e "└ $relative_path\n"
    else
        echo "├ $relative_path"
    fi
    
    if [ -f "$path" ]; then
        case "${path##*.}" in
            html) type="HTML" ;;
            css) type="CSS" ;;
            js) type="JavaScript" ;;
            txt) type="Text" ;;
            png) type="Image/Png" ;;
            svg) type="Image/Svg" ;;
            jpeg|jpg) type="Image/Jpeg" ;;
            *) type="Other" ;;
        esac
        echo "    _just_buildManifest.push({\"type\": \"$type\", \"path\": \"$relative_path\"});" >> deploy/_just/static/$BUILD_ID/buildManifest.js
    fi
    
    FILE_ID=$((FILE_ID + 1))
done
echo -e "End Build Map\n"
echo -e "----------------\n"
echo "window._just_Manifest = _just_buildManifest;" >> deploy/_just/static/$BUILD_ID/buildManifest.js
# Override Deployment
for html_file in deploy/*.html; do
  echo "<script src=\"_just/static/$BUILD_ID/buildManifest.js\"></script>" >> "$html_file"
done
