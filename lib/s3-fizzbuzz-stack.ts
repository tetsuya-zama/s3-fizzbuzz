import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3n from '@aws-cdk/aws-s3-notifications';

/**
 * S3式FizzBuzzのスタック
 **/
export class S3FizzbuzzStack extends cdk.Stack {
  /**
   * コンストラクタ
   * @param scope スコープ
   * @param id Constructのid
   * @param props 設定値
   */
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * fizzbuzz-func関数
     * ${スタックのソース名}.${関数のID(第２引数)}.tsが
     * exportするhandler関数をLambdaのハンドラと見做してデプロイしてくれる
     **/
    const fizzbuzzFunc = new lambda.NodejsFunction(this, "fizzbuzz-func");
    
    /**
     * 設定ファイルと結果を格納するバケット
     **/
    const fizzbuzzBucket = new s3.Bucket(this, "fizzbuzz-bucket");
    
    /**
     * fizzbuzz-bucketへの読み込み/書き込み権限をfizzbuzz-funcに付与する
     **/
    fizzbuzzBucket.grantReadWrite(fizzbuzzFunc);
    
    /**
     * fizzbuzz-bucketへの.json/.yaml/.ymlファイルのOBJECT_CREATEDを
     * fizzbuzz-funcへ通知する
     **/
    fizzbuzzBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED, 
      new s3n.LambdaDestination(fizzbuzzFunc), 
        {suffix: ".json"}
      );
    fizzbuzzBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED, 
      new s3n.LambdaDestination(fizzbuzzFunc), 
        {suffix: ".yaml"}
      );
    fizzbuzzBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED, 
      new s3n.LambdaDestination(fizzbuzzFunc), 
        {suffix: ".yml"}
      );
  }
}
