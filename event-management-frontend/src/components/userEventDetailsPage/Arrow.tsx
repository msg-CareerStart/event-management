import React from 'react';
import { IconButton } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

interface ArrowProps {
  direction: string;
  clickFunction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Arrow({ direction, clickFunction }: ArrowProps) {
  const icon =
    direction === 'left' ? (
      <IconButton onClick={clickFunction}>
        <ArrowLeft fontSize="large" />
      </IconButton>
    ) : (
        <IconButton onClick={clickFunction}>
          <ArrowRight fontSize="large" />
        </IconButton>
      );

  return icon;
}

export default Arrow;
