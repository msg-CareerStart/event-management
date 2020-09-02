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

  return (
    <div className={reserveTicketFirstPage.pagecontainer}>
      <Grid container spacing={0} direction="column" justify="space-between">
        <Grid item>
          <Paper className={`${reserveTicketFirstPage.paperStyle} buyPageResponsive `}>
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
              <EventDetailBuyPageDumb
                event={props.event}
                radionButtonState={props.radioButtonState}
                handleChangeRadioButtonState={props.handleChangeRadioButtonState}
              ></EventDetailBuyPageDumb>
            )}
          </Paper>

          <Link
            to={`/user/reserve-tickets/second-page/${props.matching.match.params.id}`}
            className={reserveTicketFirstPage.link}
          >
            <Tooltip title={t('buyTicketsFirstPage.nextPage') as string}>
              <IconButton
                className={`${reserveTicketFirstPage.nextButton} buttonStyleRight`}
                disabled={props.radioButtonState === 'seat'}
              >
                <NavigateNextIcon color="secondary" />
              </IconButton>
            </Tooltip>
          </Link>

          <Link to={`/user`} className={reserveTicketFirstPage.link}>
            <Tooltip title={t('buyTicketsFirstPage.cancel') as string}>
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
