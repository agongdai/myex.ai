import React from 'react';

import MyexImage from '@myex/components/ui/MyexImage';
import { Value, ValueFormat } from '@myex/types/common';

import DateTime from './DateTime';
import Exchange from './Exchange';
import Link from './Link';
import Money from './Money';
import Number from './Number';
import Percentage from './Percentage';
import Volume from './Volume';
import WalletAddress from './WalletAddress';

export default function MyexFormatter({
  value,
  format = ValueFormat.String,
}: {
  value: Value;
  format: ValueFormat;
}) {
  if (ValueFormat.Money === format) {
    return <Money value={value} flash />;
  }

  if (ValueFormat.Number === format) {
    return <Number value={value} />;
  }

  if (ValueFormat.Percentage === format) {
    return <Percentage value={value} />;
  }

  if (ValueFormat.Link === format) {
    return <Link href={String(value)} />;
  }

  if (ValueFormat.Volume === format) {
    return <Volume value={value} />;
  }

  if (ValueFormat.Image === format) {
    return <MyexImage src={String(value)} alt='' width={32} height={32} className='rounded-full' />;
  }

  if (ValueFormat.Exchange === format) {
    return <Exchange value={value} />;
  }

  if (ValueFormat.WalletAddress === format) {
    return <WalletAddress value={value} />;
  }

  if (ValueFormat.DateTime === format) {
    return <DateTime value={value} />;
  }

  return <div>{String(value)}</div>;
}
