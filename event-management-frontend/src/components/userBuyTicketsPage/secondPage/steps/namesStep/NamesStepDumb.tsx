import React from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { HtmlTooltip } from '../../../../../styles/BuyTicketsSecondPageStyle';
import HelpIcon from '@material-ui/icons/Help';
import { useTranslation } from 'react-i18next';
import { BuyTicketsSecondPageStyle } from '../../../../../styles/BuyTicketsSecondPageStyle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

interface NamesStepPropsDumb {
  noTicketsSelected: boolean;
  handleBuy: () => void;
  prevStep: () => void;
  inputs: JSX.Element[];
}

function NamesStepDumb({ noTicketsSelected, handleBuy, prevStep, inputs }: NamesStepPropsDumb) {
  const buttonStyles = BuyTicketsSecondPageStyle();
  const namesPageStyle = userBuyTicketsStyle();
  const { t } = useTranslation();

  return (
    <>
      <HtmlTooltip
        className={namesPageStyle.alignHelpIcon}
        title={
          <>
            {noTicketsSelected
              ? t('buyTicketsSecondPage.noTicketsSelectedHelp')
              : t('buyTicketsSecondPage.ticketsSelectedHelp')}
          </>
        }
      >
        <HelpIcon color='primary' fontSize='small' />
      </HtmlTooltip>

      {noTicketsSelected ? (
        <Typography className={namesPageStyle.typography} align='center'>
          {t('buyTicketsSecondPage.noTicketsSelected')}
        </Typography>
      ) : (
          <Typography className={namesPageStyle.typography} align='center'>
            {t('buyTicketsSecondPage.namesOnTickets')}
          </Typography>
        )}

      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} container justify='center' alignItems='center' className={namesPageStyle.gridStyle}>
          {inputs}
        </Grid>

        <Grid item container direction='row' justify='center' alignItems='center' className={`${namesPageStyle.button} buttonStyleResp`} >
          <Tooltip title={t('eventList.previous') as string}>
            <IconButton
              onClick={prevStep}
              className={`${buttonStyles.positionLeft} ${buttonStyles.prevButtonStyle} buttonStyleLeftSecond`}
            >
              <NavigateNextIcon color='secondary' />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('buyTicketsSecondPage.buyTickets') as string}>
            <IconButton
              onClick={handleBuy}
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

export default NamesStepDumb;
