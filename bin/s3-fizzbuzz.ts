#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3FizzbuzzStack } from '../lib/s3-fizzbuzz-stack';

const app = new cdk.App();
new S3FizzbuzzStack(app, 'S3FizzbuzzStack');
