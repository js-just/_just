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

# Modify Deployment

source $GITHUB_ACTION_PATH/src/modules/errmsg.sh
if [ -d "deploy/_just" ]; then
  local ERROR_MESSAGE=$(ErrorMessage "postprocessor/modify_deployment.sh" "0103")
  echo -e "::error::$ERROR_MESSAGE" && exit 1
fi
mkdir -p deploy/_just/

if [ -d "_just/dangerously-insert-files/_just" ]; then
  local ERROR_MESSAGE=$(ErrorMessage "postprocessor/modify_deployment.sh" "0104")
  echo -e "::error::$ERROR_MESSAGE" && exit 1
fi
if [ -d "_just/dangerously-insert-files/_next" ]; then
  local ERROR_MESSAGE=$(ErrorMessage "postprocessor/modify_deployment.sh" "0105")
  echo -e "::error::$ERROR_MESSAGE" && exit 1
fi

echo -e "\n----------------\n\n_just Chunks:\n"

source $GITHUB_ACTION_PATH/src/modules/string.sh

mkdir -p _just/dangerously-insert-files/_just/
merged_data=($(generate_strings 1 16))
merged_name=${merged_data[0]}
mkdir -p _just/dangerously-insert-files/_just/$merged_name/
merged_file="_just/dangerously-insert-files/_just/$merged_name/merged.js"
> "$merged_file"
for file in _just/js/*; do
  file_size=$(stat -c%s "$file")
  if [[ $file_size -gt 51200 ]]; then
    cat "$file" >> "$merged_file"
    echo -e "\n" >> "$merged_file"
  fi
done

while [[ $(stat -c%s "$merged_file") -lt 131072 ]]; do
  largest_file=$(ls -S _just/js/* | head -n 1)
  if [[ -z "$largest_file" ]]; then
    break
  fi
  if grep -q "$(basename "$largest_file")" "$merged_file"; then
    sed -i "/$(basename "$largest_file")/d" "$merged_file"
  else
    break
  fi
done

for file in _just/js/*; do
  first_line=$(head -n 1 "$file")
  if [[ $first_line == "// _just ignore"* ]]; then
    continue
  fi
  if [[ ! -f "$merged_file" || $(stat -c%s "$merged_file") -lt 131072 ]]; then
    cp "$file" "_just/js/$(basename "$file")"
  fi
done

mkdir -p _just_data/_just/

TOTAL_FILES_JS=0
for file in _just/js/*; do
  TOTAL_FILES_JS=$((TOTAL_FILES_JS + 1))
done
random_strings_js=($(generate_strings $TOTAL_FILES_JS 14))
FILE_ID=1
for file in _just/js/*; do
  first_line=$(head -n 1 "$file")
  if [[ $first_line == "// _just ignore"* ]]; then
    continue
  fi
  FILE_ID_M1=$((FILE_ID - 1))
  FILE_NAME=${random_strings_js[$FILE_ID_M1]}
  cp "$file" "deploy/_just/${FILE_NAME}${FILE_ID}.js"
  cp "$file" "_just_data/_just/${FILE_NAME}${FILE_ID}.js"
  echo "_just/${FILE_NAME}${FILE_ID}.js"
  FILE_ID=$((FILE_ID + 1))
done

TOTAL_FILES_CSS=0
for file in _just/style/*; do
  TOTAL_FILES_CSS=$((TOTAL_FILES_CSS + 1))
done
random_strings_css=($(generate_strings $TOTAL_FILES_CSS 14))
FILE_ID=1
for file in _just/style/*; do
  FILE_ID_M1=$((FILE_ID - 1))
  FILE_NAME=${random_strings_css[$FILE_ID_M1]}
  cp "$file" "deploy/_just/${FILE_NAME}${FILE_ID}.css"
  cp "$file" "_just_data/_just/${FILE_NAME}${FILE_ID}.css"
  echo "_just/${FILE_NAME}${FILE_ID}.css"
  FILE_ID=$((FILE_ID + 1))
done

echo -e "\nEnd _just Chunks\n"
echo -e "----------------\n"
echo -e "\n----------------\n\nDangerously Inserted Files:\n"

find _just/dangerously-insert-files/ -type f | while read -r file; do
  relative_path="${file#_just/dangerously-insert-files/}"
  target_dir="deploy/$(dirname "$relative_path")"
  target_dir2="_just_data/$(dirname "$relative_path")"
  mkdir -p "$target_dir"
  mkdir -p "$target_dir2"
  if [ -f "$target_dir/$(basename "$file")" ]; then
    echo "Warning: Failed to insert file \"$target_dir/$(basename "$file")\"."
  fi
  if [ ! -f "$target_dir/$(basename "$file")" ]; then
    cp "$file" "$target_dir/$(basename "$file")"
    cp "$file" "$target_dir2/$(basename "$file")"
    echo "$target_dir/$(basename "$file")"
  fi
done

echo -e "\nEnd Dangerously Inserted Files\n"
echo -e "----------------\n"
