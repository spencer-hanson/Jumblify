#!/bin/bash
./docker-build.sh
echo Pushing...
docker login
docker push spencerh3141/jumblify:latest
