# s3-fizzbuzz(S3式FizzBuzz)
## 概要
[AWS CDK](https://aws.amazon.com/jp/cdk/)の[aws-lambda-nodejs](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html)を使ってみるためのダミープロジェクト

## 仕様
S3に置いた設定ファイルの設定値を元に[Fizz Buzz](https://ja.wikipedia.org/wiki/Fizz_Buzz)を実行した結果をS3に出力します。

### 設定ファイル例
*test.yaml*
```yaml
from: 1 #始点
to: 15 #終点
fizz: 3 #fizzに変換する値（任意）
buzz: 5 #buzzに変換する値（任意）
```

### 結果例
*test.20200223103211.log* 
```text
1
2
fizz
4
buzz
fizz
7
8
fizz
buzz
11
fizz
13
14
fizzbuzz
```

## 作成されるリソース

### fizzbuzz-bucket (AWS::S3::Bucket)

設定ファイルと結果を格納するバケット

ここに.json/.yaml/.ymlファイルをアップロードすると、その設定に応じたfizzbuzzの結果が${設定ファイル名（拡張子除外)}.${YYYYMMDDHHmmss}.logに出力される

### fizzbuzz-func (AWS::Lambda::Function)

fizzbuzzを実行するLambda Function

### その他

上記に伴うIAMやイベントなど

## Useful commands(CDKのテンプレからそのまま残しました)

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
