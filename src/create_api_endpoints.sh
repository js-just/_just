# (fake) API Endpoints
mkdir -p deploy/api/
BUILD_ID=$(cat .next/BUILD_ID)
echo "$BUILD_ID" > deploy/api/build-id
echo "$BUILD_ID" > deploy/api/build-id.txt
echo "{\"BUILD_ID\": \"$BUILD_ID\"}" > deploy/api/build-id.json
cp .next/build-manifest.json deploy/api/build-manifest
cp .next/build-manifest.json deploy/api/build-manifest.json
cp .next/build-manifest.json deploy/api/build-manifest.txt
