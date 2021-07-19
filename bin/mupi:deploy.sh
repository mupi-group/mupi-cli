#!/bin/bash
set -e

if [ $1 ] && [ -d $(dirname "$0")/../env/$1 ]; then
  # checkin workspace
  cd "$(dirname "$0")/../env/$1"
  if [ ! -d $(dirname "$0")/../env/$1/.terraform ]; then

    # publish
    terraform fmt
    terraform workspace select $1
    terraform validate

    # check if auto approve
    #    if [ "$2" == 'auto-approve' ]; then
    terraform apply -var-file="$1".tfvars -auto-approve
    #    else
    #      terraform apply -var-file="$1".tfvars
  fi
fi
