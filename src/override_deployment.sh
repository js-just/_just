# Override Deployment
for html_file in deploy/*.html; do
  for js_file in deploy/_just/*.js; do
    echo "<script src=\"_just/$(basename "$js_file")\"></script>" >> "$html_file"
  done
  for css_file in deploy/_just/*.css; do
    echo "<link href=\"_just/$(basename "$css_file")\" rel=\"stylesheet\">" >> "$html_file"
  done
  sed -i '/<\/head>/i\ '"$(cat "$html_file")" "$html_file"
done
cp _just/404.html deploy/404.html
