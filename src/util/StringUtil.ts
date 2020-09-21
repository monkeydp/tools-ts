export default class StringUtil {

    static readonly az = "abcdefghijklmnopqrstuvwxyz";
    static readonly AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static readonly azAZ = StringUtil.az + StringUtil.AZ

    static random(length: number, template = StringUtil.azAZ): string {
        let result = '';
        for (let i = length; i > 0; --i)
            result += template[Math.floor(Math.random() * template.length)];
        return result;
    }
}
