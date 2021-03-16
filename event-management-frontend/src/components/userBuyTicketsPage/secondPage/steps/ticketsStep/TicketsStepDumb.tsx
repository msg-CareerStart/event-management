import React from 'react';
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import HelpIcon from '@material-ui/icons/Help';
import { HtmlTooltip, BuyTicketsSecondPageStyle } from '../../../../../styles/BuyTicketsSecondPageStyle';
import { useTranslation } from 'react-i18next';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../../../../../styles/ReservePageStyle.css';

interface TicketsStepDumbProps {
  nextStep: () => void;
  inputs: JSX.Element[];
  gotoFirstPage: () => void,
}

function TicketsStepDumb({ nextStep, inputs, gotoFirstPage }: TicketsStepDumbProps) {
  const buttonStyles = BuyTicketsSecondPageStyle();
  const ticketsPageStyle = userBuyTicketsStyle();
  const { t } = useTranslation();

  return (
    <>
      <HtmlTooltip className={ticketsPageStyle.alignHelpIcon} title={<>{t('buyTicketsSecondPage.chooseDesiredTickets')}</>}>
        <HelpIcon color='primary' fontSize='small' />
      </HtmlTooltip>

      <Typography className={ticketsPageStyle.typography} align='center'>
        {t('buyTicketsSecondPage.numberOfTickets')}
      </Typography>

      <Grid container justify='center' alignItems='center'>
        {inputs}

        <Grid
          item
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={`${ticketsPageStyle.button} buttonStyleResp`}
        >
          <Tooltip title={t('buyTicketsSecondPage.gotoFirstPage') as string}>
            <IconButton
              onClick={gotoFirstPage}
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

export default TicketsStepDumb;
