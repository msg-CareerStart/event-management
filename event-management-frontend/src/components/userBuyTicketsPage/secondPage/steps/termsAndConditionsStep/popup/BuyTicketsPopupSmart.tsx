import React from 'react';
import BuyTicketsPopupDumb from './BuyTicketsPopupDumb';

interface BuyTicketsPopupSmartProps {
  prevStep: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProceedToBuy: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function BuyTicketsPopupSmart({
  prevStep,
  open,
  setOpen,
  checked,
  handleCheckboxChange,
  handleProceedToBuy,
}: BuyTicketsPopupSmartProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setOpen(false);
    handleProceedToBuy(e);
  };

  const handleCancel = (): void => {
    setOpen(false);
    prevStep();
  };

  return (
    <BuyTicketsPopupDumb
      open={open}
      checked={checked}
      handleCheckboxChange={handleCheckboxChange}
      handleClose={handleClose}
      handleCancel={handleCancel}
      handleProceed={handleProceed}
    />
  );
}

export default BuyTicketsPopupSmart;
