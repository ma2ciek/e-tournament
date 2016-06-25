export default class Storage {
    private storage = window.localStorage;

    constructor(private name: string) {
    }

    public fetch() {
        return new Promise((res, rej) => {
            const data = this.storage.getItem(this.name);
            const parsedData = (data ? JSON.parse(data) : {});
            res(parsedData);
        });
    }

    public save(data: {}) {
        return new Promise((res, rej) => {
            try {
                this.setData(data);
                res();
            } catch (err) {
                rej(err);
            }
        });
    }

    private setData(data: {}) {
        const stringifiedData = JSON.stringify(data);
        this.storage.setItem(this.name, stringifiedData);
    }
}
