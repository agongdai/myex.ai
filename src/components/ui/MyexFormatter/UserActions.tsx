import React from 'react';

import MyexFavorite from '@myex/components/operation/MyexFavorite';

export default function UserActions({ currency }: { currency: string }) {
  return (
    <div className='inline-flex'>
      <MyexFavorite currency={currency} />
    </div>
  );
}
