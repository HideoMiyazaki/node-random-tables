import { RandomTable } from "../lib/index";
import { generateTableByPercent, randomMultiple } from "../src/index";

type CharRank = 
	'Star3Non' |
	'Star3Pick' |
	'Star2' |
	'Star1';

let t1 = generateTableByPercent<CharRank>(['Star3Non', 'Star3Pick'], 0.03);
let t2 = generateTableByPercent<CharRank>(['Star2'], 0.09);
let t3 = generateTableByPercent<CharRank>(['Star1'], 0.88);

const table = new RandomTable<CharRank>();
table.append(t1);
table.append(t2);
table.append(t3);

console.log(table.items);

if (!table.isValid()) {
	throw new Error('table amount is totally 1_000_000! (100%)');
}

console.log('Start Simulating Gacha...');

let res = new Map<CharRank, number>();
const TEST_TIMES = 10000000;
const randomize = randomMultiple(table, TEST_TIMES);
for(const item of randomize) {
	res.set(item, (res.get(item) || 0) + 1);
}

console.log(`Simulated Gacha Times : ${TEST_TIMES}`)
console.log(res);