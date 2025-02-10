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
mkdir -p deploy/_just/
FILE_ID=1
echo -e "\n----------------\n\n_just Chunks:\n"
for file in _just/js/*; do
  cp "$file" "deploy/_just/${FILE_ID}.js"
  echo "_just/${FILE_ID}.js"
  FILE_ID=$((FILE_ID + 1))
done
FILE_ID=1
for file in _just/style/*; do
  cp "$file" "deploy/_just/${FILE_ID}.css"
  echo "_just/${FILE_ID}.css"
  FILE_ID=$((FILE_ID + 1))
done
echo -e "\nEnd _just Chunks\n"
echo -e "----------------\n"
echo -e "\n----------------\n\nDangerously Inserted Files:\n"
for file in _just/dangerously-insert-files/*; do
  cp "$file" "deploy/$(basename "$file")"
  echo "$(basename "$file")"
done
echo -e "\nEnd Dangerously Inserted Files\n"
echo -e "----------------\n"
