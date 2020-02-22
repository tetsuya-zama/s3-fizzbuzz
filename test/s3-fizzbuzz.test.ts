import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import S3Fizzbuzz = require('../lib/s3-fizzbuzz-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new S3Fizzbuzz.S3FizzbuzzStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
