/**
 * FizzBuzzの設定
 **/
export interface FizzBuzzSetting{
    /**始点*/
    from: number
    /**終点*/
    to: number
    /**fizzに変換する数*/
    fizz?: number
    /**buzzに変換する数*/
    buzz?: number
}

/**
 * [[FizzBuzzSetting]]のtype guard
 * @param obj チェックしたいオブジェクト
 * @return objがFizzBuzzSettingであればtrue
 **/
export const isFizzBuzzSetting = (obj: any): obj is FizzBuzzSetting =>{
    return typeof obj.from === "number"
        && typeof obj.to === "number"
        && (!obj.fizz || typeof obj.fizz === "number")
        && (!obj.buzz || typeof obj.buzz === "number");
}

/**
 * 引数が正の整数かどうか
 * @param n チェックしたい数
 * @return nが正の整数であればtrue
 **/
const isPositiveInt = (n:number): boolean => n > 0 && Math.floor(n) === n;

/**
 * [[FizzBuzzSetting]]のバリデーション
 * @param from 始点（正の整数）
 * @param to 終点(正の整数)
 * @param fizz "fizz"に変換する数(正の整数/デフォルト3)
 * @param buzz "buzz"に変換する数(負の整数/デフォルト5)
 * @return デフォルト値割り当て済みのFizzBuzzSetting
 **/
const validate = ({from, to, fizz=3, buzz=5}: FizzBuzzSetting):Required<FizzBuzzSetting> => {
    if(!isPositiveInt(from)) throw new Error(`from:${from}は正の整数である必要があります`);
    if(!isPositiveInt(to)) throw new Error(`to:${to}は正の整数である必要があります`);
    if(to <= from) throw new Error(`to:${to}はfrom:${from}よりも大きい数値である必要があります`);
    if(!isPositiveInt(fizz)) throw new Error(`fizz:${fizz}は正の整数である必要があります`);
    if(!isPositiveInt(buzz)) throw new Error(`fizz:${buzz}は正の整数である必要があります`);
    if(fizz === buzz) throw new Error(`fizz:${fizz}とbuzz:${buzz}は異なる数値である必要があります`);
    
    return {from,to,fizz,buzz};
}

/**
 * fizzbuzzを実行する
 * @param setting 設定値
 * @return 結果が格納された配列
 **/
export const fizzbuzz = (setting: FizzBuzzSetting): string[] => {
    const {from, to, fizz, buzz} = validate(setting);
    
    return Array.from({length: (to - from + 1)}, (_,i) => i + from).map((n):string =>{
        if(n % (fizz * buzz) === 0) return "fizzbuzz";
        if(n % fizz === 0) return "fizz";
        if(n % buzz === 0) return "buzz";
        return n.toString();
    });
}