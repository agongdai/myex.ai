'use client';
import React from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Fab, Zoom } from '@mui/material';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setScrollTop } from '@myex/store/dom/actions';
import { selectScrollTop } from '@myex/store/dom/selectors';

export default function MyexScrollToTop() {
  const dispatch = useMyexDispatch();
  const scrollTop = useMyexSelector(selectScrollTop);
  const scrollToTop = () => {
    dispatch(setScrollTop(0));
  };

  return (
    <MyexTooltip title='Scroll to Top' placement='top'>
      <div className='fixed right-8 bottom-8'>
        <Zoom in={scrollTop > 600} unmountOnExit onClick={scrollToTop}>
          <Fab color='primary'>
            <ArrowUpwardIcon />
          </Fab>
        </Zoom>
      </div>
    </MyexTooltip>
  );
}
