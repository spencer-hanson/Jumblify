#!/bin/bash
./docker-build.sh
echo Running...
docker run -d --name jumblify -p 8888:8888 spencerh3141/jumblify
docker logs -f jumblify
