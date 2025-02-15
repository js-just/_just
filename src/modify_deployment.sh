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

# Modify Deployment

if [ -d "deploy/_just" ]; then
  echo "Error: Your website has a _just directory in the root. Please remove it to proceed." >&2
  exit 1
fi

mkdir -p deploy/_just/
echo -e "\n----------------\n\n_just Chunks:\n"

# Merging logic
merged_file="deploy/_just/merged.js"
> "$merged_file"
for file in _just/js/*; do
  file_size=$(stat -c%s "$file")
  if [[ $file_size -gt 51200 ]]; then  # Check if file is greater than 50KB
    cat "$file" >> "$merged_file"
    echo -e "\n" >> "$merged_file"  # Add new line after each file
  fi
done

echo "t1"

# Check if merged file is less than 128KB
while [[ $(stat -c%s "$merged_file") -lt 131072 ]]; do
  largest_file=$(ls -S _just/js/* | head -n 1)  # Get the largest original file
  if [[ -z "$largest_file" ]]; then
    break  # Exit the loop if no largest file is found
  fi
  if grep -q "$(basename "$largest_file")" "$merged_file"; then
    sed -i "/$(basename "$largest_file")/d" "$merged_file"  # Remove the largest file from merged file
  else
    break  # Exit the loop if the largest file is not found in the merged file
  fi
done

echo "t2"

# Move unmerged files to _just/js/
for file in _just/js/*; do
  first_line=$(head -n 1 "$file")
  if [[ $first_line == "// _just ignore"* ]]; then
    continue
  fi
  if [[ ! -f "$merged_file" || $(stat -c%s "$merged_file") -lt 131072 ]]; then
    cp "$file" "_just/js/$(basename "$file")"  # Keep unmerged files
  fi
done

echo "t3"

# Move js files to deploy/_just/
FILE_ID=1
for file in _just/js/*; do
  first_line=$(head -n 1 "$file")
  if [[ $first_line == "// _just ignore"* ]]; then
    continue
  fi
  cp "$file" "deploy/_just/${FILE_ID}.js"
  echo "_just/${FILE_ID}.js"
  FILE_ID=$((FILE_ID + 1))
done

# Move css files to deploy/_just/
FILE_ID=1
for file in _just/style/*; do
  cp "$file" "deploy/_just/${FILE_ID}.css"
  echo "_just/${FILE_ID}.css"
  FILE_ID=$((FILE_ID + 1))
done

echo -e "\nEnd _just Chunks\n"
echo -e "----------------\n"
echo -e "\n----------------\n\nDangerously Inserted Files:\n"

# Dangerously insert files
find _just/dangerously-insert-files/ -type f | while read -r file; do
  relative_path="${file#_just/dangerously-insert-files/}"
  target_dir="deploy/$(dirname "$relative_path")"
  mkdir -p "$target_dir"
  if [ -f "$target_dir/$(basename "$file")" ]; then
    echo "Warning: Failed to insert file \"$target_dir/$(basename "$file")\"."
  fi
  if [ ! -f "$target_dir/$(basename "$file")" ]; then
    cp "$file" "$target_dir/$(basename "$file")"
    echo "$target_dir/$(basename "$file")"
  fi
done

echo -e "\nEnd Dangerously Inserted Files\n"
echo -e "----------------\n"
