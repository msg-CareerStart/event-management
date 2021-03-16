import React from 'react';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';
import QrReader from 'react-qr-reader';
import '../../styles/Responsivity.css';

type Props = {
  handleScan: (data: string | null) => void;
  handleError: () => void;
};

export const ValidateTicketDumb: React.FC<Props> = ({ handleScan, handleError }: Props) => {
  const classes = useValidateTicketStyles();

  return (
    <div className={'qrReaderResponsive'}>
      <QrReader className={classes.qrReaderStyle} delay={800} onError={handleError} onScan={handleScan} />
    </div>
  );
};
