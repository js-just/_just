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
