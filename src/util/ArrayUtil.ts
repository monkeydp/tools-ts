export default class ArrayUtil {
    static groupById<K, V>(arr: Array<V>, getId: (v: V) => K): Map<K, V> {
        const map = new Map<K, V>();
        arr.forEach(it => {
            map.set(getId(it), it)
        })
        return map
    }

    static containsById<K, V>(arr: Array<V>, getId: (v: V) => K, value: K): boolean {
        const map = this.groupById(arr, getId)
        return map.has(value)
    }

    static findById<K, V>(arr: Array<V>, getId: (v: V) => K, id: K): V {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.findByIdOrNull(arr, getId, id)!
    }

    static findByIdOrNull<K, V>(arr: Array<V>, getId: (v: V) => K, id: K): V | undefined {
        const map: Map<K, V> = this.groupById(arr, getId)
        return map.get(id)
    }

    static mergeById<K, V>(arr: Array<V>, getId: (v: V) => K, it: V): Array<V> {
        const map: Map<K, V> = this.groupById(arr, getId)
        map.set(getId(it), it)
        return this.fromMap(map)
    }

    static fromMap<V>(map: Map<unknown, V>): Array<V> {
        return Array.from(map).map(item => item[1])
    }
}
