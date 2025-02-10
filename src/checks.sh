# Check for directories
if [ ! -d "_just" ]; then
  echo "_just Checks:"
  echo ""
  echo "  ✕ (root)/_just/"
  echo "  ✕ (root)/_just/js/"
  echo "  ✕ (root)/_just/style/"
  echo "  ✕ (root)/_just/404.html"
  echo ""
  echo "Error: The _just directory is missing in the root. Please create it to proceed." >&2
  exit 1
fi
if [ ! -d "_just/js" ]; then
  echo "_just Checks:"
  echo ""
  echo "  ✓ (root)/_just/"
  echo "  ✕ (root)/_just/js/"
  echo "  ? (root)/_just/style/"
  echo "  ? (root)/_just/404.html"
  echo ""
  echo "Error: The js directory is missing in the _just directory. Please create it to proceed." >&2
  exit 1
fi
if [ ! -d "_just/style" ]; then
  echo "_just Checks:"
  echo ""
  echo "  ✓ (root)/_just/"
  echo "  ✓ (root)/_just/js/"
  echo "  ✕ (root)/_just/style/"
  echo "  ? (root)/_just/404.html"
  echo ""
  echo "Error: The style directory is missing in the _just directory. Please create it to proceed." >&2
  exit 1
fi
if [ ! -f "_just/404.html" ]; then
  echo "_just Checks:"
  echo ""
  echo "  ✓ (root)/_just/"
  echo "  ✓ (root)/_just/js/"
  echo "  ✓ (root)/_just/style/"
  echo "  ✕ (root)/_just/404.html"
  echo ""
  echo "Error: The _just/404.html file is missing." >&2
  exit 1
fi
echo "_just Checks:"
echo ""
echo "  ✓ (root)/_just/"
echo "  ✓ (root)/_just/js/"
echo "  ✓ (root)/_just/style/"
echo "  ✓ (root)/_just/404.html"
echo ""
