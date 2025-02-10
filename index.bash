# Prepare Deployment
mkdir -p deploy
cp -r .next/server/pages/* deploy/
mkdir -p deploy/_next/static/
cp -r .next/static/* deploy/_next/static/
cp .next/server/pages/en.html deploy/index.html
# (fake) API Endpoints
mkdir -p deploy/api/
BUILD_ID=$(cat .next/BUILD_ID)
echo "$BUILD_ID" > deploy/api/build-id
echo "$BUILD_ID" > deploy/api/build-id.txt
echo "{\"BUILD_ID\": \"$BUILD_ID\"}" > deploy/api/build-id.json
cp .next/build-manifest.json deploy/api/build-manifest
cp .next/build-manifest.json deploy/api/build-manifest.json
cp .next/build-manifest.json deploy/api/build-manifest.txt
# Modify Deployment
mkdir -p deploy/_just/
FILE_ID=1
echo ""
echo "----------------"
echo ""
echo "_just Chunks:"
echo ""
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
for file in _just/dangerously-insert-files/*; do
  cp "$file" "deploy/$(basename "$file")"
  echo "$(basename "$file")"
done
echo ""
echo "End _just Chunks"
echo ""
echo "----------------"
# Override Deployment
for html_file in deploy/*.html; do
  for js_file in deploy/_just/*.js; do
    echo "<script src=\"_just/$(basename "$js_file")\"></script>" >> "$html_file"
  done
  for css_file in deploy/_just/*.css; do
    echo "<link href=\"_just/$(basename "$css_file")\" rel=\"stylesheet\">" >> "$html_file"
  done
  sed -i '/<\/head>/i\ '"$(cat \"$html_file\")" "$html_file"
done
cp _just/404.html deploy/404.html
