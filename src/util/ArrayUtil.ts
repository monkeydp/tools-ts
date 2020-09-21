import ierror from "../error/InnerError";

export default class ArrayUtil {
    static groupById<K, V>(arr: Array<V>, getId: (v: V) => K): Map<K, V> {
        const map = new Map<K, V>();
        arr.forEach(it => {
            map.set(getId(it), it)
        })
        return map
    }

    static first<T>(arr: Array<T>, predicate: (t: T) => boolean): T {
        const item = this.firstOrNull(arr, predicate)
        if (item == null)
            ierror("First item not found in array " + JSON.stringify(arr))
        return item
    }

    static firstOrNull<T>(arr: Array<T>, predicate: (t: T) => boolean): T | null {
        arr.forEach(it => {
            if (predicate(it))
                return it
        })
        return null
    }

    static single<T>(arr: Array<T>, predicate: (t: T) => boolean): T {
        const item = this.singleOrNull(arr, predicate)
        if (item == null)
            ierror(`Single item not found in array ${JSON.stringify(arr)}`)
        return item
    }

    static singleOrNull<T>(arr: Array<T>, predicate: (t: T) => boolean): T | null {
        const matched = new Array<T>()
        arr.forEach(it => {
            if (predicate(it))
                matched.push(it)
        })
        switch (matched.length) {
            case 0:
                return null
            case 1:
                return matched[0]
            default:
                ierror(`Expect single item in array, but found ${matched.length} items. Array: ${JSON.stringify(arr)}, matched: ${JSON.stringify(matched)}`)
        }
    }

    static has<T>(arr: Array<T>, predicate: (t: T) => boolean): boolean {
        return this.firstOrNull(arr, predicate) != null
    }

    static hasById<K, V>(arr: Array<V>, getId: (v: V) => K, value: K): boolean {
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
