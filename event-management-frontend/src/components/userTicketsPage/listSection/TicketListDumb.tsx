import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress, Grid } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import ErrorIcon from '@material-ui/icons/Error';
import { Ticket } from '../../../model/Ticket';
import TicketGroupDumb from './TicketGroupDumb';
import Typography from '@material-ui/core/Typography';

interface Props {
  isError: boolean;
  isLoading: boolean;
  ticketsDetails: Ticket[];
}

const TicketListDumb = ({ isError, isLoading, ticketsDetails }: Props) => {
  const classes = useStylesTickets();
  const [t] = useTranslation();

  const groupBy = (array: Ticket[]) => {
    return array.reduce((result: any, currentValue: Ticket) => {
      (result[currentValue.bookingId] = result[currentValue.bookingId] || []).push(currentValue);
      return result;
    }, {});
  };

  const ticketsGroupedById = groupBy(ticketsDetails);
  const ticketDictionary = [];
  for (let [key, value] of Object.entries(ticketsGroupedById)) {
    ticketDictionary.push([key, value]);
  }
  const numberOfArrows = ticketDictionary.length;
  const openInitialState: Array<boolean> = [];
  for (let i = 0; i < numberOfArrows; i++) {
    openInitialState.push(false);
  }
  const [open, setOpen] = React.useState(openInitialState);

  const handleChange = (index: number) => {
    const newStateForOpen = open;
    if (newStateForOpen[index] === undefined) {
      newStateForOpen[index] = true;
    } else {
      newStateForOpen[index] = !newStateForOpen[index];
    }

    const finalState: Array<boolean> = [];
    for (let i = 0; i < newStateForOpen.length; i++) {
      finalState.push(newStateForOpen[i]);
    }
    setOpen(finalState);
  };

  return (
    <div className={`${classes.pageContainer} ticketResponsive`}>
      <Typography className={classes.ticketsTitle}>{t('ticketList.myTickets')}</Typography>
      <TableContainer component={Paper} className={classes.pageContainer}>
        {isError ? (
          <Grid container alignItems={'center'} justify={'center'}>
            <ErrorIcon color={'primary'} fontSize={'large'} />
            Oops, there was an error
          </Grid>
        ) : isLoading ? (
          <Grid container alignItems={'center'} justify={'center'}>
            <CircularProgress />
          </Grid>
        ) : (
          <Table className={classes.ticketTableLayout}>
            <TableHead className={classes.grayBackground}>
              <TableRow>
                <TableCell/>
                <TableCell key={'id'} align={'center'} padding={'default'} size={'medium'}>
                  {t('ticketList.id')}
                </TableCell>

                <TableCell key={'date'} align={'center'} padding={'default'} size={'medium'}>
                  {t('ticketList.date')}
                </TableCell>

                <TableCell key={'eventName'} align={'center'} padding={'default'} size={'medium'}>
                  {t('ticketList.eventName')}
                </TableCell>

                <TableCell
                  key={'category'}
                  align={'center'}
                  padding={'default'}
                  size={'medium'}
                  className={classes.ticketColumnMobile}
                >
                  {t('ticketList.category')}
                </TableCell>

                <TableCell
                  key={'name'}
                  align={'center'}
                  padding={'default'}
                  size={'medium'}
                  className={classes.ticketColumnMobile}
                >
                  {t('ticketList.buyer')}
                </TableCell>

                <TableCell key={'pdf'} align={'center'} padding={'default'} size={'medium'}>
                  {t('ticketList.pdf')}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ticketDictionary.map((groupTicket, index) => {
                return (
                  <TicketGroupDumb
                    key={index}
                    tickets={groupTicket[1]}
                    open={open}
                    index={index}
                    handleChange={handleChange}
                  />
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default TicketListDumb;
