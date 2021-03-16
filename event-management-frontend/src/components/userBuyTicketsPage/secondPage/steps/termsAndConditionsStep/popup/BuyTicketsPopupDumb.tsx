import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from '../../../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../../../styles/UserBuyTicketsStyle';
import { Grid, FormControlLabel } from '@material-ui/core';
import { termsAndConditionsText } from '../TermsAndConditionsText';
import { useTranslation } from 'react-i18next';
import { YellowCheckbox } from '../../../../../../styles/YellowCheckbox';

interface BuyTicketsPopupDumbProps {
  open: boolean;
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  handleCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleProceed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleClose: () => void;
}

function BuyTicketsPopupDumb({
  open,
  checked,
  handleCheckboxChange,
  handleCancel,
  handleProceed,
  handleClose,
}: BuyTicketsPopupDumbProps) {

  const buttonClass = useStyles();
  const popupStyle = userBuyTicketsStyle();
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('buyTicketsSecondPage.termsAndConditions')}</DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description' component={'span'}>
          {termsAndConditionsText}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Grid container justify='center' direction='column' alignItems='center'>
          <FormControlLabel
            control={
              <YellowCheckbox
                checked={checked}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={t('buyTicketsSecondPage.agreement')}
          />

          <Grid item container direction='row'>
            <Grid item xs={4}>
              <Button onClick={handleCancel} color='primary' className={popupStyle.buttonPosition}>
                {t('welcome.headerCRUDCancel')}
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                onClick={handleProceed}
                className={`${buttonClass.mainButtonStyle} ${buttonClass.pinkGradientButtonStyle} ${popupStyle.buttonPosition}`}
              >
                {t('buyTicketsSecondPage.buyTickets')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default BuyTicketsPopupDumb;
