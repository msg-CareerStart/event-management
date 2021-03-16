import React, { KeyboardEvent } from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography, TextField, Tooltip, IconButton } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { EmailStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';
import { useTranslation } from 'react-i18next';
import '../../../../../styles/ReservePageStyle.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { BuyTicketsSecondPageStyle } from '../../../../../styles/BuyTicketsSecondPageStyle';

interface EmailStepDumbProps {
  nextStep: () => void;
  prevStep: () => void;
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
  email: string;

  handleEmailStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailFormErrors: EmailStepFormErrors;
}

function EmailStepDumb({
  nextStep,
  prevStep,
  handleEnterKey,
  email,
  handleEmailStepChange,
  emailFormErrors,
}: EmailStepDumbProps) {
  const emailPageStyle = userBuyTicketsStyle();
  const buttonStyles = BuyTicketsSecondPageStyle();

  const { t } = useTranslation();

  return (
    <>
      <Typography className={emailPageStyle.typography} align='center'>
        {t('buyTicketsSecondPage.myEmailAddress')}
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12}>
          <TextField
            className={emailPageStyle.position}
            onKeyDown={handleEnterKey}
            name='Email'
            fullWidth
            defaultValue={email}
            label='Email'
            variant='outlined'
            onChange={handleEmailStepChange}
            error={emailFormErrors.error.length > 0}
            helperText={emailFormErrors.error}
          />
        </Grid>

        <Grid
          item
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={`${emailPageStyle.button} buttonStyleResp`}
        >
          <Tooltip title={t('eventList.previous') as string}>
            <IconButton
              onClick={prevStep}
              className={`${buttonStyles.positionLeft} ${buttonStyles.prevButtonStyle} buttonStyleLeftSecond`}
            >
              <NavigateNextIcon color='secondary' />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('eventList.next') as string}>
            <IconButton
              onClick={nextStep}
              className={`${buttonStyles.positionRight} ${buttonStyles.nextButtonStyle} buttonStyleRightSecond`}
            >
              <NavigateNextIcon color='secondary' />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default EmailStepDumb;
