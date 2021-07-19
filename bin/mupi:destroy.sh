#!/bin/bash
set -e

if [ $1 ] && [ -d $2/env/$1 ]; then
  cd "$2/env/$1"
  terraform apply -destroy -auto-approve -var-file="$1".tfvars

  else
  echo "\noops, mupi can't find the env you want to destroy: '$1'"
  echo "you may create env '$1' first"
  exit 1;
fi
