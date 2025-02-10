# Directory & File Checks
for dir in "_just" "_just/js" "_just/style"; do
  if [ ! -d "$dir" ]; then
    echo -e "\n----------------\n\n_just Checks:\n"
    echo "  $( [ -d "_just" ] && echo "✓" || echo "✕" ) (root)/_just/"
    echo "  $( [ -d "_just/js" ] && echo "✓" || echo "✕" ) (root)/_just/js/"
    echo "  $( [ -d "_just/style" ] && echo "✓" || echo "✕" ) (root)/_just/style/"
    echo "  ? (root)/_just/404.html\n"
    echo "End _just Checks\n"
    echo "----------------\n"
    echo "Error: The $dir directory is missing. Please create it to proceed." >&2
    exit 1
  fi
done

if [ ! -f "_just/404.html" ]; then
  echo -e "\n----------------\n\n_just Checks:\n"
  echo "  ✓ (root)/_just/"
  echo "  ✓ (root)/_just/js/"
  echo "  ✓ (root)/_just/style/"
  echo "  ✕ (root)/_just/404.html\n"
  echo "End _just Checks\n"
  echo "----------------\n"
  echo "Error: The _just/404.html file is missing." >&2
  exit 1
fi

echo -e "\n----------------\n\n_just Checks:\n"
echo "  ✓ (root)/_just/"
echo "  ✓ (root)/_just/js/"
echo "  ✓ (root)/_just/style/"
echo "  ✓ (root)/_just/404.html\n"
echo "End _just Checks\n"
echo "----------------\n"
