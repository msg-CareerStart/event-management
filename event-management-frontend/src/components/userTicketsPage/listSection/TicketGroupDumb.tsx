import React from 'react';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { serverURL } from '../../../api/Api';
import { Ticket } from '../../../model/Ticket';
import { useStyles } from '../../../styles/CommonStyles';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TicketCollapseDumb from './TicketCollapseDumb';


interface Props {
  handleChange: (index: number) => void;
  tickets: any;
  open: Array<boolean>;
  index: number;
}

const TicketGroupDumb = ({ handleChange, tickets, open, index }: Props) => {
  const commonClasses = useStyles();
  const classes = useStylesTickets();
  const [t] = useTranslation();

  const firstElement: Ticket = tickets[0];
  tickets.shift();

  const id = firstElement.bookingId;
  const date = firstElement.bookingDate;
  const eventName = firstElement.eventName;
  const category = firstElement.ticketCategory;
  const name = firstElement.name;
  const URL_PDF = serverURL + '/tickets/pdf/' + firstElement.ticketId;

  const downloadTicketPdf = () => {
    window.open(URL_PDF, 'Download');
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton type="button" size="small" onClick={() => handleChange(index)}>
            {tickets.length === 0 ? (
              <></>
            ) : open[index] === undefined || !open[index] ? (
              <KeyboardArrowUpIcon /> ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>

        <TableCell key={'id'} align={'center'} padding={'default'} size={'small'}>
          {id}
        </TableCell>
        <TableCell key={'date'} align={'center'} padding={'default'} size={'small'}>
          {date}
        </TableCell>
        <TableCell key={'eventName'} align={'center'} padding={'default'} size={'small'}>
          {eventName}
        </TableCell>
        <TableCell
          key={'category'}
          align={'center'}
          padding={'default'}
          size={'small'}
          className={classes.ticketColumnMobile}
        >
          {category}
        </TableCell>
        <TableCell
          key={'name'}
          align={'center'}
          padding={'default'}
          size={'small'}
          className={classes.ticketColumnMobile}
        >
          {name}
        </TableCell>

        <TableCell key={'pdfUrl'} align={'center'} size={'medium'} className={classes.pdfButton}>
          <div onClick={downloadTicketPdf}>
            <Button
              className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${commonClasses.mobileButton}`}
            >
              {t('eventList.open')}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {tickets.map((ticket: Ticket) => {
        return <TicketCollapseDumb ticket={ticket} key={ticket.ticketId} open={open[index]} />;
      })}
    </>
  );
};

export default TicketGroupDumb;
