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

# Override Deployment

source $GITHUB_ACTION_PATH/src/modules/errmsg.sh

find deploy -type f -name "*.html" | while read -r html_file; do
  for js_file in deploy/_just/*.js; do
    first_line=$(head -n 1 "$js_file")
    if [[ "$first_line" == "// _just doNotInsert" || 
          "$first_line" == "// _just hide" || 
          "$first_line" == "// _just doNotModify+doNotInsert" || 
          "$first_line" == "// _just doNotModify+hide" ]]; then
      continue
    fi
    echo "<script src=\"/_just/$(basename "$js_file")\"></script>" >> "$html_file" # Insert js files as <script src="PATH TO FILE" />
  done
  for css_file in deploy/_just/*.css; do
    echo "<link href=\"/_just/$(basename "$css_file")\" rel=\"stylesheet\">" >> "$html_file" # Insert css files as <link href="PATH TO FILE" rel="stylesheet" />
  done
  echo "<link href=\"/_just/e.css\" rel=\"stylesheet\">" >> "$html_file"
  echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/comment.html)" >> "$html_file"
  sed -i '/<\/head>/i\ '"$(cat "$html_file")" "$html_file"
done

if [ -f "deploy/404.html" ]; then
  local ERROR_MESSAGE=($(ErrorMessage "postprocessor/override_deployment.sh" "0202"))
  echo $ERROR_MESSAGE
fi
if [ ! -f "deploy/404.html" ]; then
  cp _just/404.html deploy/404.html
fi

echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/error.html)" > deploy/_just/e.html
echo "$(cat $GITHUB_ACTION_PATH/src/postprocessor/insert/error.css)" > deploy/_just/e.css
