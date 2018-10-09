#!/bin/bash

# Setup the current release version from AWS Codebuild into _error for sentry init
# This will need to be revisited when better fixes for sentry and next are discovered.
# https://github.com/zeit/next.js/issues/1852

SHORTHASH=${CODEBUILD_RESOLVED_SOURCE_VERSION:0:7}

sed -i -e "s/VERSION_PLACEHOLDER/$SHORTHASH/g" pages/_error.js
sed -i -e "s/VERSION_PLACEHOLDER/$SHORTHASH/g" server.js
