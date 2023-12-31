import React from 'react';

import JsesImage from '@jses/components/JsesImage';
import JsesLink from '@jses/components/JsesLink';
import coins from '@jses/data/coins.json';
import { Value } from '@jses/types/common';
import Typography from '@mui/material/Typography';

export default function Coin({ value }: { value: Value }) {
  const strValue = String(value);
  const symbol = strValue.slice(1, strValue.includes(':') ? -4 : -3);
  const name = coins.find((coin) => coin.symbol === symbol)?.name || '';

  return (
    <JsesLink
      href={`https://coinmarketcap.com/currencies/${name.toLowerCase().replaceAll(/[ .]/g, '-')}`}
      className='inline-flex hover:no-underline'
    >
      <JsesImage
        src={`https://static.bitfinex.com/images/icons/${symbol}.svg`}
        alt=''
        width={28}
        height={28}
      />
      <div className='flex flex-col ml-4 justify-center text-left'>
        <span className='text-lg font-semibold'>{symbol}</span>
        <Typography color='secondary' variant='caption' classes={{ root: 'leading-none' }}>
          {name}
        </Typography>
      </div>
    </JsesLink>
  );
}
