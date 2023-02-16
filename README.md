# node-random-tables
> node random tables project (for gacha server project)

[![NpmBadge](https://badgen.net/npm/v/node-random-tables)](https://www.npmjs.com/package/node-random-tables)

## How To use?

```typescript
import { RandomTable, generateTableByPercent, randomMultiple } from "node-random-tables";

type CharRank = 
	'Star3Non' |
	'Star3Pick' |
	'Star2' |
	'Star1';

//Star3Non 1.5%, Star3Pick 1.5%
let t1 = generateTableByPercent<CharRank>(['Star3Non', 'Star3Pick'], 0.03);
//Star2 9%
let t2 = generateTableByPercent<CharRank>(['Star2'], 0.09);
//Star1 88%
let t3 = generateTableByPercent<CharRank>(['Star1'], 0.88);

//Create new Table
const table = new RandomTable<CharRank>();
//Merge Tables
table.append(t1);
table.append(t2);
table.append(t3);

console.log('Start Simulating Gacha...');

let res = new Map<CharRank, number>();
const TEST_TIMES = 10000000;
const randomize = randomMultiple(table, TEST_TIMES);
for(const item of randomize) {
	res.set(item, (res.get(item) || 0) + 1);
}

console.log(`Simulated Gacha Times : ${TEST_TIMES}`)
console.log(res);
```

If you want, use other class or types instead of ```CharRank```. (example, below source)

```typescript
enum CharacterRank {
	Star3,
	Star2,
	Star1
};

type CharacterData = {
	id: number;
	rank: CharacterRank;
	base_stat: CharacterStat;
	is_limited: boolean;
}

const table = new RandomTable<CharacterData>();
...
```