import React from 'react';
import Image from 'next/image';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyexLink from '@myex/components/ui/MyexLink';

export default function Error() {
  return (
    <div className='flex flex-col items-center justify-center p-6'>
      <Image src='/images/error.svg' width={800} height={591} alt='not found' />
      <Typography color='secondary' classes={{ root: 'my-10 text-center' }}>
        {`It's not your fault, it's ours. We are working on it.`}
      </Typography>
      <MyexLink href='/'>
        <Button variant='contained' color='primary' size='large'>
          Go Home
        </Button>
      </MyexLink>
    </div>
  );
}
