import React from 'react';

import { faHandsHoldingDollar } from '@fortawesome/pro-duotone-svg-icons';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import Card from '@myex/components/Card';
import Money from '@myex/components/MyexFormatter/Money';
import { IGNORED_USD_THRESHOLD } from '@myex/config';
import { Balance } from '@myex/types/trading';

interface Props {
  label: string;
  balance: Balance;
}

export default function BalanceCard({ label, balance }: Props) {
  if (balance.total.isLessThan(IGNORED_USD_THRESHOLD)) return null;

  return (
    <Card label={label}>
      <div>
        <Money value={balance.available.toNumber()} flash nDecimals={3} />
        <div className='text-text-disabled text-base w-full m-1'>
          <MyexTooltip title='On hold: in order, or funding, or staking' placement='left'>
            <div>
              <AwesomeIcon icon={faHandsHoldingDollar} size='sm' />
              {` `}
              <Money
                value={balance.total.minus(balance.available || 0).toNumber()}
                flash
                nDecimals={3}
                currencySymbol=''
              />
            </div>
          </MyexTooltip>
        </div>
      </div>
    </Card>
  );
}
