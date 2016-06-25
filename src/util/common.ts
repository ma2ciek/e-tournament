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

export interface Point {
    x: number;
    y: number;
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
