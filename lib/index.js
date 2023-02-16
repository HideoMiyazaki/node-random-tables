"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.randomMultiple = exports.generateTableByPercent = exports.generateTableByAmount = exports.createTableItem = exports.percentToAmount = exports.amountToPercent = exports.RandomTable = void 0;
const crypto_1 = __importDefault(require("crypto"));
const AMOUNT_UNIT = 1000000;
class RandomTable {
    constructor(items) {
        this.items = items === undefined ? new Array() : items;
    }
    add(item) {
        this.items.push(item);
    }
    append(other) {
        for (const item of other.items) {
            this.items.push(item);
        }
    }
    isValid() {
        let i = 0;
        for (const item of this.items) {
            i += item.amount;
        }
        return i == AMOUNT_UNIT;
    }
}
exports.RandomTable = RandomTable;
;
function amountToPercent(amount) {
    return Math.trunc(amount) / AMOUNT_UNIT;
}
exports.amountToPercent = amountToPercent;
function percentToAmount(percent) {
    return Math.trunc(percent * AMOUNT_UNIT);
}
exports.percentToAmount = percentToAmount;
function createTableItem(value, amount) {
    return {
        value: value,
        amount: Math.trunc(amount)
    };
}
exports.createTableItem = createTableItem;
function generateTableByAmount(arr, totalAmount) {
    let total = Math.trunc(totalAmount);
    let count = arr.length;
    let modulo = total % count;
    let one = Math.trunc((total - modulo) / count);
    let table = new RandomTable();
    for (const item of arr) {
        table.add(createTableItem(item, one));
    }
    if (table.items.length > 0) {
        table.items[table.items.length - 1].amount += modulo;
    }
    return table;
}
exports.generateTableByAmount = generateTableByAmount;
function generateTableByPercent(arr, totalPercent) {
    return generateTableByAmount(arr, percentToAmount(totalPercent));
}
exports.generateTableByPercent = generateTableByPercent;
function randomMultiple(table, times) {
    let res = new Array();
    for (let i = 0; i < times; ++i) {
        const currentResult = random(table);
        if (currentResult !== undefined) {
            res.push(currentResult);
        }
    }
    return res;
}
exports.randomMultiple = randomMultiple;
function random(table) {
    let r = crypto_1.default.randomInt(1, AMOUNT_UNIT + 1);
    let i = 0;
    let idx = 0;
    while (i < 1000000 && table.items.length > idx) {
        const item = table.items[idx++];
        i += item.amount;
        if (r <= i) {
            return item.value;
        }
    }
    return undefined;
}
exports.random = random;
