#!/usr/bin/env bash

THEME_DIR=$(basename $(pwd))

rm $THEME_DIR.zip || true

git archive \
    --format=zip HEAD \
    -o $THEME_DIR.zip \
    --prefix $THEME_DIR/ \
    --verbose
