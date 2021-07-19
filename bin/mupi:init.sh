#!/bin/bash
set -e

if [ $1 ] && [ -d $2/env/$1 ]; then

  # checkin workspace
  cd "$2/env/$1"

  if [ ! -d $2/env/$1/.terraform ]; then
    # if the workspace hasn't been created
    terraform init
    terraform workspace new $1

  else
    # if already has its workspace
    terraform init
  fi

else
  echo "\noops, mupi can't find the env you want to init: '$1'"
  echo "you may create env '$1' first"
  exit 1

fi
