export interface IDictionary<T> {
    [name: string]: T;
}

export function extend(src: IDictionary<{}>, ...dest: IDictionary<{}>[]) {
    for (const d of dest) {
        for (const prop in d) {
            if (d.hasOwnProperty(prop)) {
                src[prop] = d[prop];
            }
        }
    }
}
