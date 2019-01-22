#!/bin/bash
docker stop jumblify
docker rm jumblify
npm run tsc
echo Building...
docker build --label jumblify:latest -t spencerh3141/jumblify:latest .
