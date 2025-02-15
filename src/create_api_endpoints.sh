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

# (fake) API Endpoints

# Check
if [ -d "deploy/api" ]; then
  echo "Error: Your website have api directory in the root. Please remove it to proceed." >&2
  exit 1
fi

mkdir -p deploy/api/

# Get Next.js data and copy it to API Endpoints
BUILD_ID=$(cat .next/BUILD_ID)
echo "$BUILD_ID" > deploy/api/build-id
echo "$BUILD_ID" > deploy/api/build-id.txt
echo "{\"BUILD_ID\": \"$BUILD_ID\"}" > deploy/api/build-id.json
cp .next/build-manifest.json deploy/api/build-manifest
cp .next/build-manifest.json deploy/api/build-manifest.json
cp .next/build-manifest.json deploy/api/build-manifest.txt
