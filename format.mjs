import {join} from 'node:path';
import {renameSync, readdirSync} from 'node:fs';
import {getAddress} from '@ethersproject/address';

const ASSETS = './assets';

// Legacy top level tokens
const legacyTokenDirs = readdirSync(ASSETS).filter(isBadToken);
for (const token of legacyTokenDirs) {
	renameSync(join(ASSETS, token), join(ASSETS, correctAddress(token)));
}

// Tokens nested inside chainId directories
const chainIds = readdirSync(ASSETS).filter(isChainId);
for (const chainId of chainIds) {
	const tokens = readdirSync(join(ASSETS, chainId)).filter(isBadToken);
	for (const token of tokens) {
		renameSync(join(ASSETS, chainId, token), join(ASSETS, chainId, correctAddress(token)));
	}
}

function isChainId(name) {
	return !name.toLowerCase().startsWith('0x');
}

function isBadToken(name) {
	return name.toLowerCase().startsWith('0x') && name !== correctAddress(name);
}

function correctAddress(address) {
	return getAddress(address.toLowerCase());
}
