'use client';

import React from 'react';
import cx from 'classnames';
import _upperFirst from 'lodash/upperFirst';
import TradingViewWidget from 'react-tradingview-widget';

import useMyexTheme from '@myex/hooks/useMyexTheme';
import { useMyexSelector } from '@myex/store';
import { selectCurrentPair, selectShowTradingView } from '@myex/store/trading/selectors';

export default function TradingView() {
  const { theme } = useMyexTheme();
  const currentPair = useMyexSelector(selectCurrentPair);
  const showTradingView = useMyexSelector(selectShowTradingView);

  return (
    <div className={cx('h-[50rem] my-6', { hidden: !showTradingView })}>
      <TradingViewWidget
        theme={_upperFirst(theme || 'Dark')}
        autosize
        symbol={`Bitfinex:${currentPair}`}
      />
    </div>
  );
}