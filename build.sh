#!/bin/bash

if [ "$#" -ne 1 ]
then
  echo "Usage: ./build.sh v0.0.0"
  exit 1
fi

# Minify code and generate a sourcemap
uglifyjs --compress --mangle --comments --output ./dist/clipnship.min.js --source-map "filename='./dist/clipnship.js.map'" ./src/clipnship.js

# Generate the API doc
jsdoc2md src/clipnship.js > doc/api.md

git add dist/clipnship.min.js dist/clipnship.min.js.map doc/api.md
git commit -m $1