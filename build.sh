#!/bin/bash

if [ "$#" -ne 1 ]
then
  echo "Usage: ./build.sh v0.0.0"
  exit 1
fi

uglifyjs --compress --mangle --comments --output ./dist/clipnship.min.js --source-map "filename='./dist/clipnship.js.map'" ./src/clipnship.js

git add dist/clipnship.min.js dist/clipnship.min.js.map
git commit -m $1