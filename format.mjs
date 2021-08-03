import {join} from 'node:path';
import {renameSync, readdirSync} from 'node:fs';
import {getAddress} from '@ethersproject/address';

const ASSETS = './assets';

const dirs = readdirSync(ASSETS).filter(name => name !== getAddress(name));

for (const name of dirs) {
	renameSync(join(ASSETS, name), join(ASSETS, getAddress(name)));
}
