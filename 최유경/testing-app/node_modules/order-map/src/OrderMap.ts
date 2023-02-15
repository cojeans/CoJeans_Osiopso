import { IObject } from "@daybrush/utils";

/**
 *
 */
class OrderMap<T = number | string> {
    public orderMap: IObject<T[]> = {};

    /**
     *
     */
    constructor(private separator: string) { }

    /**
     *
     */
    public getFullName(names: T[]) {
        return names.join(this.separator);
    }

    /**
     *
     */
    public get(names: T[]): T[] | undefined {
        return this.orderMap[this.getFullName(names)];
    }

    /**
     *
     */
    public gets(names: T[], isFull = true): T[][] {
        const fullOrders: T[][] = [];
        const self = this;
        function pushOrders(nextNames: T[], stack: T[]) {
            const orders = self.get(nextNames);

            if (!orders) {
                return;
            }
            orders.forEach(name => {
                const nextStack = [...stack, name];
                const nextOrders = pushOrders([...nextNames, name], nextStack);

                if (!nextOrders || !nextOrders.length) {
                    fullOrders.push([...stack, name]);
                }
            });
            return orders;
        }

        pushOrders(names, isFull ? names : []);

        return fullOrders;
    }

    /**
     *
     */
    public set(names: T[], orders: T[]): T[] {
        names.forEach((name, i) => {
            this.addName(names.slice(0, i), name);
        });
        this.orderMap[this.getFullName(names)] = orders;

        return orders;
    }

    /**
     *
     */
    public add(names: T[]): T[] {
        const length = names.length;

        if (!length) {
            return [];
        }
        return this.addName(names.slice(0, -1), names[length - 1]);
    }

    /**
     *
     */
    public addName(names: T[], name: T): T[] {
        const orders = this.get(names) || this.set(names, []);

        if (orders.indexOf(name) === -1) {
            orders.push(name);
        }
        return orders;
    }

    /**
     *
     */
    public findIndex(names: T[], orderName: T): number {
        const orders = this.orderMap[this.getFullName(names)];

        if (!orders) {
            return -1;
        }
        return orders.indexOf(orderName);
    }

    /**
     *
     */
    public remove(names: T[]): this {
        const fullName = this.getFullName(names);
        const orderMap = this.orderMap;

        for (const name in orderMap) {
            if (name.indexOf(fullName) === 0) {
                delete orderMap[name];
            }
        }
        const length = names.length;

        if (length) {
            const prevNames = names.slice(0, -1);
            const lastName = names[length - 1];

            this.splice(prevNames, this.findIndex(prevNames, lastName), 1);
        }
        return this;
    }

    /**
     *
     */
    public filter(
        names: T[],
        callback: (value: T[], index: number, arr: T[][]) => boolean,
        isFull = true,
    ) {
        const result = this.gets(names, isFull).filter(callback);
        const map = new OrderMap<T>(this.separator);
        const stack = isFull ? [] : names;

        result.forEach(nextNames => {
            map.add([...stack, ...nextNames]);
        });

        return map;
    }

    /**
     *
     */
    public splice(names: T[], index: number, deleteCount: number, ...orders: T[]) {
        const currentOrders = this.get(names) || this.set(names, []);

        currentOrders.splice(index, deleteCount, ...orders);

        return this;
    }

    /**
     *
     */
    public clear() {
        this.orderMap = {};
    }

    /**
     *
     */
    public setObject(obj: IObject<T[]>) {
        const orderMap = this.orderMap;

        for (const name in obj) {
            orderMap[name] = obj[name].slice();
        }
    }
    /**
     *
     */
    public getObject(): IObject<T[]> {
        const nextMap = {};

        const orderMap = this.orderMap;
        for (const name in orderMap) {
            nextMap[name] = orderMap[name].slice();
        }
        return nextMap;
    }
    /**
     *
     */
    public clone() {
        const map = new OrderMap<T>(this.separator);

        map.setObject(map.orderMap);
        return map;
    }
}

export default OrderMap;
