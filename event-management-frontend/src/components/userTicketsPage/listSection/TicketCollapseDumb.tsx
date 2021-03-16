import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { Ticket } from '../../../model/Ticket';
import { Button, TableCell } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import { useTranslation } from 'react-i18next';
import { serverURL } from '../../../api/Api';


interface Props {
  ticket: Ticket;
  open: any;
}

const TicketCollapseDumb = ({ ticket, open }: Props) => {
  const commonClasses = useStyles();
  const classes = useStylesTickets();
  const [t] = useTranslation();

  const styles = {
    none: {
      display: 'none',
    },
    fixed: {
      tableLayout: "fixed",
      display: 'table-row',
    }
  };
  const { none, fixed } = styles;
  const URL_PDF = serverURL + '/tickets/pdf/' + ticket.ticketId;

  const downloadTicketPdf = () => {
    window.open(URL_PDF, 'Download');
  };

  return (
    <TableRow style={open ? fixed : none}>
        <TableCell className={classes.tableCellPadding} />
        <TableCell className={classes.tableCellPadding} />
        <TableCell
          className={classes.tableCellPadding}
          key={'date'}
          align={'center'}
          padding={'default'}
          size={'small'}
        >
          {ticket.bookingDate}
        </TableCell>
        <TableCell
          className={classes.tableCellPadding}
          key={'eventName'}
          align={'center'}
          padding={'default'}
          size={'small'}
        >
          {ticket.eventName}
        </TableCell>
        <TableCell
          key={'category'}
          align={'center'}
          padding={'default'}
          size={'small'}
          className={`${classes.ticketColumnMobile} ${classes.tableCellPadding}`}
        >
          {ticket.ticketCategory}
        </TableCell>
        <TableCell
          key={'name'}
          align={'center'}
          padding={'default'}
          size={'small'}
          className={`${classes.ticketColumnMobile} ${classes.tableCellPadding}`}
        >
          {ticket.name}
        </TableCell>

        <TableCell
          key={'pdfUrl'}
          align={'center'}
          size={'medium'}
          className={`${classes.pdfButton} ${classes.tableCellPadding}`}
        >
          <div onClick={downloadTicketPdf}>
            <Button
              className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${commonClasses.mobileButton}`}
            >
              {t('eventList.open')}
            </Button>
          </div>
        </TableCell>
    </TableRow>
  );
};

export default TicketCollapseDumb;
