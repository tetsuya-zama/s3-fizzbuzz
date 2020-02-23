import '@aws-cdk/assert/jest';
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import S3Fizzbuzz = require('../lib/s3-fizzbuzz-stack');

/**
 * スナップショットテスト
 **/ 
test('snapshot testing', () => {
  const app = new cdk.App();
  const stack = new S3Fizzbuzz.S3FizzbuzzStack(app, 'MyTestStack');
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

/**
 * リソーステスト
 **/ 
test('resource testing', ()=> {
  const app = new cdk.App();
  const stack = new S3Fizzbuzz.S3FizzbuzzStack(app, 'MyTestStack');
  /**
   * XXX: CDKのテストは勉強中です。。誰か教えてください。 
   **/ 
  expect(stack).toHaveResource("AWS::Lambda::Function");
  expect(stack).toHaveResource("AWS::S3::Bucket");
  expect(stack).toHaveResource("Custom::S3BucketNotifications");
});
