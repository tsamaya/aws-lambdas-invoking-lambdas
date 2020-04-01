#!/usr/bin/env bash

set -e
# set -x
ENV=.env
MASTER='master'
STAGING='release-*'
DEVELOP='develop'

echo "Setup"

echo "--Prepare environement"


if [ ! -f ${ENV} ]; then echo "$ENV file does not exist"; exit 1;  fi

export $(grep "^[^#;]" $ENV | xargs)

echo "--Prepare stage"
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ $BRANCH == $MASTER ]]; then
  STAGE="production"
elif [[ $BRANCH == $INTEGRATION ]]; then
  STAGE="staging"
elif [[ $BRANCH == $DEVELOP ]]; then
  STAGE="dev"
fi

# here is an option to deploy only on dedicated branches
if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

echo "--AWS credentials"
if [ -z ${AWS_PROFILE+x} ]; then echo "AWS_PROFILE is unset"; exit 1; else echo "AWS_PROFILE is set to '$AWS_PROFILE'"; fi

echo "--Prepare dependencies"
yarn # or npm i

echo "--Prepare environment"
if [[ $BRANCH == $MASTER ]]; then
  # check variables for production
  if [ -z ${AWS_REGION_PROD+x} ]; then echo "AWS_REGION_PROD is unset"; exit 1; else echo "AWS_REGION_PROD is set to '$AWS_REGION_PROD'"; fi
  REGION=$AWS_REGION_PROD
elif [[ $BRANCH == $INTEGRATION ]]; then
  # check variables for staging
  if [ -z ${AWS_REGION_INT+x} ]; then echo "AWS_REGION_INT is unset"; exit 1; else echo "AWS_REGION_INT is set to '$AWS_REGION_INT'"; fi
  REGION=$AWS_REGION_INT
elif [[ $BRANCH == $DEVELOP ]]; then
  # check variables for staging
  if [ -z ${AWS_REGION_DEV+x} ]; then echo "AWS_REGION_DEV is unset"; exit 1; else echo "AWS_REGION_DEV is set to '$AWS_REGION_DEV'"; fi
  REGION=$AWS_REGION_DEV
fi

echo "Deploying from branch $BRANCH to stage $STAGE in region $REGION"
npx serverless deploy  --aws-profile $AWS_PROFILE --stage $STAGE --region $REGION 
