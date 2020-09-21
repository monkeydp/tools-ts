export default class MacUtil {
    static random(): string {
        const number = 12
        const chars = []
        for (let i = 0; i < number; i++) {
            const char = "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
            chars.push(char)
        }
        return chars.join("")
    }
}
