import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { TFunction } from 'i18next';

interface ImagesDialogProps {
  t: TFunction;
  open: boolean;
  handleCloseDecline: () => void;
  handleCloseConfirm: () => void;
}

function ImagesDialog({ t, open, handleCloseDecline, handleCloseConfirm }: ImagesDialogProps) {
  return (
    <Dialog open={open} onClose={handleCloseDecline}>
      <DialogTitle>{t('images.imageDialogTitle')}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t('images.imageDialogContent')}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDecline} color="primary">
          {t('images.imageDialogDisagree')}
        </Button>

        <Button onClick={handleCloseConfirm} color="primary" autoFocus>
          {t('images.imageDialogAgree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImagesDialog;
