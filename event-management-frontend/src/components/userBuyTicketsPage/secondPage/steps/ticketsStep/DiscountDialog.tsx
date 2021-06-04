import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

type Props = {
  open: boolean;
  dialogTitle: string;
  dialogDescription: string;
  error: boolean;
  closeDialog: () => void;
};

const DiscountDialog: React.FC<Props> = ({ open, dialogTitle, dialogDescription, closeDialog, error }: Props) => {
  const { t } = useTranslation();

  let icon;
  if (error) icon = <ErrorOutlineIcon />;
  else icon = <CheckCircleOutlineIcon />;

  return (
    <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <Grid container>
          {icon}
          <DialogContentText id="alert-dialog-description">{dialogDescription}</DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          {t('discountCodeBox.discountDialogButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountDialog;
