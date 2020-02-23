import {S3Handler,S3Event, S3EventRecord} from 'aws-lambda';
import {S3} from 'aws-sdk';
import * as yaml from 'js-yaml';
import {Moment} from 'moment';
import {isFizzBuzzSetting, fizzbuzz} from './domain';


const s3 = new S3();

/**
 * 設定ファイルを読み込む
 * @param bucket 対象バケット
 * @param key 対象key
 * @return 読み込んだ結果
 **/
const loadSetting = async(bucket: string, key: string): Promise<Object> => {
    const response = await s3.getObject({
        Bucket: bucket,
        Key: key
    }).promise();
    
    if(response.Body){
        const body = response.Body.toString();
        if(key.endsWith(".json")){
            return JSON.parse(body);
        }else{
            return yaml.safeLoad(body);
        }
    }else{
        throw new Error(`Load setting file failure:${key} on ${bucket}`);
    }
}

/**
 * 実行結果を保存する
 * @param key 対象バケット
 * @param settingName 設定ファイル名
 * @param result 実行結果
 **/
const saveResult = async (bucket: string, settingName: string, result: string[]): Promise<void> => {
    const moment = require("moment");
    const now: Moment = moment().format("YYYYMMDDHHmmss");
    const resultKey = settingName.split(".").slice(0,-1).join(".") + `.${now}.log`;
    
    await s3.putObject({
        Bucket: bucket,
        Key: resultKey,
        Body: result.join("\n")
    }).promise();
}

/**
 * このLambdaの実行対象レコードかどうか
 * @param record チェックするrecord
 * @return 実行対象であればtrue
 **/
const isTargetEvent = (record: S3EventRecord): boolean => record.eventName.startsWith("ObjectCreated:") 
    && (record.s3.object.key.endsWith(".json") || record.s3.object.key.endsWith(".yaml") || record.s3.object.key.endsWith(".yml"));

/**
 * fizzbuzz-funcのhandler
 * @param event S3のイベント
 **/
export const handler:S3Handler = async(event:S3Event) => {
    for(const record of event.Records){
        if(isTargetEvent(record)){
            try{
                const bucketName = record.s3.bucket.name;
                const targetKey = record.s3.object.key;
                const setting = await loadSetting(bucketName, targetKey);
                
                if(isFizzBuzzSetting(setting)){
                    const result = fizzbuzz(setting);
                    await saveResult(bucketName, targetKey, result);
                }else{
                    throw new Error(`Invalid setting ${JSON.stringify(setting)}`);
                }
            }catch(e){
                console.error(e.message);
            }
            
        }
    }
}

