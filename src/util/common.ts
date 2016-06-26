export interface IDictionary<T> {
    [name: string]: T;
}

export interface Point {
    x: number;
    y: number;
}

export type Segment = Point[];

export function extend(src: IDictionary<{}>, ...dest: IDictionary<{}>[]) {
    for (const d of dest) {
        for (const prop in d) {
            if (d.hasOwnProperty(prop)) {
                src[prop] = d[prop];
            }
        }
    }
}

// Fisher–Yates shuffle
export function shuffle(arr: any[]) {
    const result = arr.slice(0);
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.random() * counter | 0;
        counter--;

        const temp = result[counter];
        result[counter] = result[index];
        result[index] = temp;
    }

    return result;
}

export function log(base: number) {
    return (x: number) => Math.log(x) / Math.log(base);
}
