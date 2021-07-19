#!/bin/bash
set -e

if [ $1 ] && [ -d $(dirname "$0")/../env/$1 ]; then
  cd "$(dirname "$0")/../env/$1"
  terraform destroy -var-file="$1".tfvars
fi
