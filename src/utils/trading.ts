import BigNumber from 'bignumber.js';
import _pick from 'lodash/pick';

import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { Balance, MyexAsset } from '@myex/types/trading';

/**
 * `BTC` => `tBTCUSD`
 * @param currency
 */
export function currencyToSymbol(currency: string) {
  return `t${currency}${currency.length === 3 ? '' : ':'}USD`;
}

/**
 * `tBTCUSD` => `BTC`
 * @param symbol
 */
export function symbolToCurrency(symbol: string) {
  return symbol.slice(1, -3).replace(':', '');
}

/**
 * `tBTCUSD` => `BTCUSD`
 * @param symbol
 */
export function symbolToPair(symbol: string) {
  return symbol.slice(1);
}

/**
 * Get USD balance from wallets
 * @param wallets
 */
export function getUsdBalance(wallets: BfxWallet[]): Balance {
  const usdWallet = wallets.find((wallet) => wallet.currency === 'USD');
  const total = usdWallet?.balance || 0;
  const available = usdWallet?.availableBalance || 0;

  return {
    total,
    available,
  };
}

/**
 * Compose assets info from wallet and trading pairs
 * @param assets
 * @param tradingPairs
 */
export function composeAssetsInfo(
  assets: BfxWallet[],
  tradingPairs: BfxTradingPair[],
): MyexAsset[] {
  return assets
    .filter((asset: BfxWallet) => asset.currency !== 'USD')
    .map((asset: BfxWallet) => {
      const tradingPair = tradingPairs.find(
        (pair: BfxTradingPair) => pair._currency === asset.currency,
      );

      return {
        ...asset,
        ..._pick(tradingPair, ['dailyChangePerc', 'lastPrice']),
        _balanceUsd: BigNumber(asset.balance)
          .multipliedBy(tradingPair?.lastPrice || 0)
          .toNumber(),
      } as MyexAsset;
    });
}
