#!/bin/bash

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

npm install -g yarn

sudo apt-get install -y git

PAT=

git clone https://bracesproul:$PAT@github.com/bracesproul/lots-o-slots.git

cd ./lots-o-slots
yarn install
cd ./api
yarn start:api:prod
