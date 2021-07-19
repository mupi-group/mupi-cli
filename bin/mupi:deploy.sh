#!/bin/bash
set -e

if [ $1 ] && [ -d $2/env/$1 ]; then
  cd "$2/env/$1"
  terraform fmt
  terraform workspace select $1
  terraform validate
  terraform apply -var-file="$1".tfvars -auto-approve

else
  echo "\noops, mupi can't find the env you want to deploy: '$1'"
  echo "you may create env '$1' first"
  exit 1
fi
