import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface FilesDialogProps {
  open: boolean;
  handleCloseDecline: () => void;
  handleCloseConfirm: () => void;
}

const ImportDialogSuccess = (props: FilesDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={props.open} onClose={props.handleCloseDecline}>
      <DialogTitle>{t('files.success')}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t('files.successImport')}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleCloseDecline} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDialogSuccess;
