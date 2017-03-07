#!/bin/bash


./build.sh
# echo "Deleting "
docker rm -f galaxy-map-react 
echo "Running galaxy-map-react..."

docker run --name galaxy-map-react  --link galaxy-map-server:api --link data-planet:mongo -v /${PWD}/../://root/app  -p 8107:8107 galaxy-map-react 

