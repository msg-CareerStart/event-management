import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface FilesDialogProps {
  open: boolean;
  handleCloseDecline: () => void;
  handleCloseConfirm: () => void;
}

const FilesDialog = (props: FilesDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={props.open} onClose={props.handleCloseDecline}>
      <DialogTitle>{t('files.fileDialogTitle')}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t('files.fileDialogContent')}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleCloseDecline} color="primary">
          {t('files.fileDialogDisagree')}
        </Button>

        <Button onClick={props.handleCloseConfirm} color="primary" autoFocus>
          {t('files.fileDialogAgree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilesDialog;
