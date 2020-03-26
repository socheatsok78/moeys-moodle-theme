#!/usr/bin/env bash

THEME_DIR=$(basename $(pwd))

cd ..

remove_existing() {
    rm $THEME_DIR/$THEME_DIR.zip
}

zip_theme() {
    zip -r $THEME_DIR/$THEME_DIR.zip $THEME_DIR --exclude=*.git*
}

remove_existing
zip_theme
