# DO NOT USE THIS. READ THE DOCS (coming soon). USE ACTION.YML.
echo "Warning: Attempt to use _just in a wrond way. This may not work right. Pleace read the docs (coming soon)."
bash $GITHUB_ACTION_PATH/src/checks.sh
bash $GITHUB_ACTION_PATH/src/prepare_deployment.sh
bash $GITHUB_ACTION_PATH/src/create_api_endpoints.sh
bash $GITHUB_ACTION_PATH/src/modify_deployment.sh
bash $GITHUB_ACTION_PATH/src/override_deployment.sh
bash $GITHUB_ACTION_PATH/src/build_map.sh