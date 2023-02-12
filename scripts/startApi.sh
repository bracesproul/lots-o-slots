#!/bin/bash

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

npm install -g yarn

sudo apt-get install -y git

PAT="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"

git clone https://bracesproul:$PAT@github.com/bracesproul/lots-o-slots.git

cd ./lots-o-slots
yarn install
cd ./api
yarn start:api:prod
