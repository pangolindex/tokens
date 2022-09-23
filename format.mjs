import {join} from 'node:path';
import {renameSync, readdirSync} from 'node:fs';
import {getAddress} from '@ethersproject/address';

const ASSETS = './assets';

const chainIds = readdirSync(ASSETS);
for (const chainId of chainIds) {
	const tokens = readdirSync(join(ASSETS, chainId)).filter(isBadToken);
	for (const token of tokens) {
		renameSync(join(ASSETS, chainId, token), join(ASSETS, chainId, correctAddress(token)));
	}
}

function isBadToken(name) {
	// Special ignore for non-evm tokens ie. "wrap.testnet"
	return name.toLowerCase().startsWith('0x') && name !== correctAddress(name);
}

function correctAddress(address) {
	return getAddress(address.toLowerCase());
}
