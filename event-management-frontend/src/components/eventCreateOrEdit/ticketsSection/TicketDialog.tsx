import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  dialogTitle: string;
  dialogDescription: string;
  disableMessage: string;
  removalApproved: () => void;
  handleClose: () => void;
};

const TicketDialog: React.FC<Props> = ({
  open,
  dialogTitle,
  dialogDescription,
  disableMessage,
  removalApproved,
  handleClose,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialogDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={removalApproved} disabled={disableMessage.length > 0} color="primary">
          {t("categoryCard.remove")}
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          {t("categoryCard.nevermind")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;
