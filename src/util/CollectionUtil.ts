export default class CollectionUtil {
    static groupById<K, V extends unknown>(arr: Array<V>, idName: string): Map<K, V> {
        const map = new Map<K, V>();
        arr.forEach(it => {
            map.set((it as KeyStringToSpecific<K>)[idName], it)
        })
        return map
    }

    static containsById(arr: Array<unknown>, idName: string, value: string): boolean {
        const map = this.groupById(arr, idName)
        return map.get(value) != undefined
    }

    static mergeById<K, V extends unknown>(arr: Array<V>, idName: string, it: V): Array<V> {
        const map: Map<K, V> = this.groupById(arr, idName)
        map.set((it as KeyStringToSpecific<K>)[idName], it)
        return Array.from(map).map(item => item[1])
    }
}

interface KeyStringToSpecific<T> {
    [key: string]: T;
}
