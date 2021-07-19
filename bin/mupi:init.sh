#!/bin/bash
set -e

if [ $1 ] && [ -d $(dirname "$0")/../env/$1 ]; then

  # checkin workspace
  cd "$(dirname "$0")/../env/$1"

  if [ ! -d $(dirname "$0")/../env/$1/.terraform ]; then
    # if the workspace hasn't been created
    terraform init
    terraform workspace new $1

  else
    # if already has its workspace
    terraform init
  fi

fi
