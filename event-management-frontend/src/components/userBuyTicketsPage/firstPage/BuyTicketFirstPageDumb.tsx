import React from 'react';
import { EventReserveTicketType } from '../../../model/EventReserveTicketType';
import { Paper, IconButton, Tooltip, Grid, CircularProgress } from '@material-ui/core';
import useStylesbuyTicketFirstPage from '../../../styles/BuyTicketsFirstPageStyle';
import { Link, RouteComponentProps } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../../../styles/ReservePageStyle.css';
import ErrorIcon from '@material-ui/icons/Error';
import EventDetailBuyPageDumb from './EventDetailBuyPageDumb';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { buyTicketsSecondPageDumbStyle } from '../../../styles/BuyTicketsSecondPageStyle';

interface Props {
  event: EventReserveTicketType;
  isError: boolean;
  isLoading: boolean;
  radioButtonState: string;
  handleChangeRadioButtonState: (value: string) => void;
  matching: RouteComponentProps<any>;
}

const BuyTicketFirstPageDumb = (props: Props) => {
  const reserveTicketFirstPage = useStylesbuyTicketFirstPage();
  const { t } = useTranslation();
  const generalStyle = buyTicketsSecondPageDumbStyle();
  return (
    <div className={generalStyle.root}>
      <Grid container spacing={0} direction="column" justify="space-between">
        <Grid item xs={12}>
          <Paper className={`${generalStyle.paperStyle} buyPageResponsive `}>
            {props.isLoading ? (
              <Grid container alignItems={'center'} justify={'center'}>
                <CircularProgress />
              </Grid>
            ) : props.isError ? (
              <Grid container alignItems={'center'} justify={'center'}>
                <ErrorIcon color={'primary'} fontSize={'large'} />
                {t('buyTicketsFirstPage.errorMessage') as string}
              </Grid>
            ) : (
                  <Grid item xs={12}>
                    <EventDetailBuyPageDumb
                      event={props.event}
                      radionButtonState={props.radioButtonState}
                      handleChangeRadioButtonState={props.handleChangeRadioButtonState}
                    ></EventDetailBuyPageDumb>
                  </Grid>
                )}
          </Paper>

            <Link
              to={`/user/reserve-tickets/second-page/${props.matching.match.params.id}`}
              className={reserveTicketFirstPage.link}
            >
              <Tooltip title={<span>{t('buyTicketsFirstPage.nextPage') as string}</span>}>
                <IconButton
                  className={`${reserveTicketFirstPage.nextButton} buttonStyleRight`}
                  disabled={props.radioButtonState === 'seat'}
                >
                  <NavigateNextIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to={`/user/events`} className={reserveTicketFirstPage.link}>
              <Tooltip title={<span>{t('buyTicketsFirstPage.cancel') as string}</span>}>
                <IconButton className={`${reserveTicketFirstPage.cancelButton} buttonStyleLeft`}>
                  <CloseIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
        </Grid>
    </div>
  );
};
export default BuyTicketFirstPageDumb;
