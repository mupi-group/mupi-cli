#!/bin/bash
set -e

if [ $1 ] && [ -d $2/env/$1 ]; then
  # checkin workspace
  cd "$2/env/$1"
  if [ ! -d $2/env/$1/.terraform ]; then

    # publish
    terraform fmt
    terraform workspace select $1
    terraform validate
    terraform apply -var-file="$1".tfvars -auto-approve
  fi

  else
  echo "\noops, mupi can't find the env you want to deploy: '$1'"
  echo "you may create env '$1' first"
  exit 1;

fi
