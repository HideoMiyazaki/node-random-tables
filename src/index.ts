import crypto from 'crypto';

const AMOUNT_UNIT = 1000000;

export type RandomTableItem<T> = {
	amount: number;
	value: T;
};

export class RandomTable<T> {
	header: any;
	items: Array<RandomTableItem<T>>;

	constructor(items?: Array<RandomTableItem<T>>) {
		this.header = undefined;
		this.items = items === undefined ? new Array<RandomTableItem<T>>() : items;
	}

	add(item: RandomTableItem<T>): void {
		this.items.push(item);
	}

	append(other: RandomTable<T>): void {
		for(const item of other.items) {
			this.items.push(item);
		}
	}

	isValid(): boolean {
		let i = 0;
		for(const item of this.items) {
			i += item.amount;
		}
		return i == AMOUNT_UNIT;
	}
};

export function amountToPercent(amount: number): number {
	return Math.trunc(amount) / AMOUNT_UNIT;
}

export function percentToAmount(percent: number): number {
	return Math.trunc(percent * AMOUNT_UNIT);
}

export function createTableItem<T>(value: T, amount: number): RandomTableItem<T> {
	return {
		value: value,
		amount: Math.trunc(amount)
	};
}

export function generateTableByAmount<T>(arr: Array<T>, totalAmount: number): RandomTable<T> {
	let total = Math.trunc(totalAmount);
	let count = arr.length;
	let modulo = total % count;
	let one = Math.trunc((total - modulo) / count);

	let table = new RandomTable<T>();

	for(const item of arr) {
		table.add(createTableItem(item, one));
	}

	if (table.items.length > 0) {
		table.items[table.items.length - 1].amount += modulo;
	}

	return table;
}

export function generateTableByPercent<T>(arr: Array<T>, totalPercent: number): RandomTable<T> {
	return generateTableByAmount(arr, percentToAmount(totalPercent));
}

export function randomMultiple<T>(table: RandomTable<T>, times: number): Array<T> {
	let res = new Array<T>();
	for(let i = 0; i < times; ++i) {
		const currentResult = random(table);
		if (currentResult !== undefined) {
			res.push(currentResult);
		}
	}
	return res;
}

export function random<T>(table: RandomTable<T>): T | undefined {
	let r = crypto.randomInt(1, AMOUNT_UNIT + 1);
	let i = 0;
	let idx = 0;

	while(i < 1000000 && table.items.length > idx) {
		const item = table.items[idx++];
		i += item.amount;
		if (r <= i) {
			return item.value;
		}
	}
	return undefined;
}