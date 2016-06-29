export default class Storage<T> {
    private storage = window.localStorage;

    constructor(private name: string) {
    }

    public get() {
        const data = this.storage.getItem(this.name);
        const parsedData = data && JSON.parse(data);
        return <T>parsedData;
    }

    public save(data: T) {
        return new Promise((res, rej) => {
            try {
                this.setData(data);
                res();
            } catch (err) {
                rej(err);
            }
        });
    }

    private setData(data: T) {
        const stringifiedData = JSON.stringify(data);
        this.storage.setItem(this.name, stringifiedData);
    }
}
