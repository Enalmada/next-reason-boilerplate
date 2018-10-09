#!/bin/bash

SHORTHASH=${CODEBUILD_RESOLVED_SOURCE_VERSION:0:7}


if [ "$CODEBUILD_INITIATOR" == "codepipeline/<PROD_BUILD>" ]; then
    ENVIRONMENT=prod
else
    ENVIRONMENT=test
fi


VERSION=$SHORTHASH-$ENVIRONMENT

# Must have env specific files for sumologic to have different category for prod/test.
# TODO: make sumologic not part of build file (so we can use same build for test/prod)
sed -i -e "s/ENV_REPLACE/$ENVIRONMENT/g" .ebextensions/sumo_logic.config

if [ "$?" = "0" ]; then

    aws s3 cp <MYDIST>.zip s3://<MY_BUCKET>/MYDIST-$VERSION.zip
    aws elasticbeanstalk create-application-version --application-name <APP_NAME> --version-label $VERSION --source-bundle S3Bucket=<MY_BUCKET_IN_REGION>,S3Key=<MYDIST>-$VERSION.zip --region us-west-1
    aws elasticbeanstalk update-environment --environment-name <ENV_PREFIX>-${ENVIRONMENT}-client --version-label $VERSION --region us-west-1

	aws sns publish --topic-arn $SNS_TOPIC_ARN --subject "${CODEBUILD_INITIATOR} build ${SHORTHASH} success" --message "The build ${SHORTHASH} has completed."

else
	aws sns publish --topic-arn $SNS_TOPIC_ARN --subject "${CODEBUILD_INITIATOR} build ${SHORTHASH} failed" --message "The build ${SHORTHASH} has failed."
	exit 1
fi
