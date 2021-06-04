import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { BuyTicketsSecondPageStyle } from '../../../../../styles/BuyTicketsSecondPageStyle';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { useTranslation } from 'react-i18next';

interface SummaryStepDumbProps {
  nextStep: () => void;
  previousStep: () => void;
}

export function SummaryStepDumb({ nextStep, previousStep }: SummaryStepDumbProps) {
  let buttonStyles = BuyTicketsSecondPageStyle();
  let summaryStepStyles = userBuyTicketsStyle();
  const { t } = useTranslation();
  return (
    <Grid>
      <Typography className={summaryStepStyles.typography} align="center">
        Order Summary
      </Typography>

      <Tooltip title={t('eventList.previous') as string}>
        <IconButton
          onClick={previousStep}
          className={`${buttonStyles.positionLeft} ${buttonStyles.prevButtonStyle} buttonStyleLeftSecond`}
        >
          <NavigateNextIcon color="secondary" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('eventList.next') as string}>
        <IconButton
          onClick={nextStep}
          className={`${buttonStyles.positionRight} ${buttonStyles.nextButtonStyle} buttonStyleRightSecond`}
        >
          <NavigateNextIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </Grid>
  );
}
