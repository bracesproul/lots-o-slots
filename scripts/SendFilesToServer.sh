#!/bin/bash

echo "Sending token.json to server..."
gcloud compute scp /Users/bracesproul/personal/lots-o-slots/api/token.json lots-o-slots-api:./lots-o-slots/api
echo "token.json sent."

echo "Sending .env to server..."
gcloud compute scp /Users/bracesproul/personal/lots-o-slots/api/.env lots-o-slots-api:./lots-o-slots/api
echo ".env sent."

echo "Sending service_account.json to server..."
gcloud compute scp /Users/bracesproul/personal/lots-o-slots/api/service_account.json lots-o-slots-api:./lots-o-slots/api
echo "service_account.json sent."

echo "Sending credentials.json to server..."
gcloud compute scp /Users/bracesproul/personal/lots-o-slots/api/credentials.json lots-o-slots-api:./lots-o-slots/api
echo "credentials.json sent."
