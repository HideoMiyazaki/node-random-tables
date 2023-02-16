export type RandomTableItem<T> = {
    amount: number;
    value: T;
};
export declare class RandomTable<T> {
    items: Array<RandomTableItem<T>>;
    constructor(items?: Array<RandomTableItem<T>>);
    add(item: RandomTableItem<T>): void;
    append(other: RandomTable<T>): void;
    isValid(): boolean;
}
export declare function amountToPercent(amount: number): number;
export declare function percentToAmount(percent: number): number;
export declare function createTableItem<T>(value: T, amount: number): RandomTableItem<T>;
export declare function generateTableByAmount<T>(arr: Array<T>, totalAmount: number): RandomTable<T>;
export declare function generateTableByPercent<T>(arr: Array<T>, totalPercent: number): RandomTable<T>;
export declare function randomMultiple<T>(table: RandomTable<T>, times: number): Array<T>;
export declare function random<T>(table: RandomTable<T>): T | undefined;
