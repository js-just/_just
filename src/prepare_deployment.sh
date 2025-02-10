# Prepare Deployment
mkdir -p deploy
cp -r .next/server/pages/* deploy/
mkdir -p deploy/_next/static/
cp -r .next/static/* deploy/_next/static/
cp .next/server/pages/en.html deploy/index.html
