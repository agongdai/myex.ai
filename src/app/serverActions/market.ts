'use server';

import { CoinGeokoApiBaseUrl } from '@myex/api/endpoints';
import { myexFetchCoins } from '@myex/app/serverActions/myexCoin';
import { CoinInMarket } from '@myex/types/coin';
import { Coin } from '@prisma/client';

export async function fetchMarketCoins(): Promise<CoinInMarket[]> {
  const coins = await myexFetchCoins();
  const coinGeokoIdsStr = coins.map((coin: Coin) => coin.coinGeckoId || '').join(',');
  try {
    const res = await fetch(
      `${CoinGeokoApiBaseUrl}/coins/markets?ids=${coinGeokoIdsStr}&vs_currency=usd&price_change_percentage=24h`,
      {
        // @ts-ignore
        headers: {
          'x-cg-api-key': process.env.COIN_GEOKO_API_KEY,
        },
      },
    );
    const data = await res.json();
    return data.map(
      (coin: any) =>
        ({
          geckoId: coin.id,
          currency: coin.symbol,
          image: coin.image,
          price: coin.current_price,
          priceChangePercentage24h: coin.price_change_percentage_24h,
          priceHigh24h: coin.high_24h,
          priceLow24h: coin.low_24h,
          marketCap: coin.market_cap,
          marketCapRank: coin.market_cap_rank,
          volume24h: coin.total_volume, // ??
          lastUpdated: coin.last_updated,
          circulatingSupply: coin.circulating_supply,
          totalSupply: coin.total_supply,
          maxSupply: coin.max_supply,
          rating: coins.find((c: Coin) => c.currency.toLowerCase() === coin.symbol)?.rating || 0,
          myexCoin: coins.find((c: Coin) => c.currency.toLowerCase() === coin.symbol),
        }) as CoinInMarket,
    );
  } catch (error) {
    console.error('Error fetching market coins:', error);
    return [];
  }
}
