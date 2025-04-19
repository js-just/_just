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

# Directory & File Checks

for dir in "_just" "_just/js" "_just/style"; do
  if [ ! -d "$dir" ]; then
    echo -e "\n----------------\n\n_just Checks:\n"
    echo "  $( [ -d "_just" ] && echo "✓" || echo "✕" ) (root)/_just/"
    echo "  $( [ -d "_just/js" ] && echo "✓" || echo "✕" ) (root)/_just/js/"
    echo "  $( [ -d "_just/style" ] && echo "✓" || echo "✕" ) (root)/_just/style/"
    echo -e "  ? (root)/_just/404.html\n"
    echo -e "End _just Checks\n"
    echo -e "----------------\n"
    echo "The $dir directory is missing." >&2
    exit 1
  fi
done

if [ ! -f "_just/404.html" ]; then
  echo -e "\n----------------\n\n_just Checks:\n"
  echo "  ✓ (root)/_just/"
  echo "  ✓ (root)/_just/js/"
  echo "  ✓ (root)/_just/style/"
  echo -e "  ✕ (root)/_just/404.html\n"
  echo -e "End _just Checks\n"
  echo -e "----------------\n"
  echo "0101" >&2
  exit 1
fi

echo -e "\n----------------\n\n_just Checks:\n"
echo "  ✓ (root)/_just/"
echo "  ✓ (root)/_just/js/"
echo "  ✓ (root)/_just/style/"
echo -e "  ✓ (root)/_just/404.html\n"
echo -e "End _just Checks\n"
echo -e "----------------\n"
