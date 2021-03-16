import React from 'react';
import useStylesbuyTicketFirstPage from '../../../styles/BuyTicketsFirstPageStyle';
import { useTranslation } from 'react-i18next';

interface Props {
  startDate: string;
  endDate: string;
}

const DateDisplayDumb = (props: Props) => {
  const reserveTicketFirstPage = useStylesbuyTicketFirstPage();
  const { t } = useTranslation();

  if (props.startDate !== props.endDate) {
    return (
      <span>
        {props.startDate}

        <span className={reserveTicketFirstPage.spacing}>{t('buyTicketsFirstPage.toDate')}</span>
        {props.endDate}
      </span>
    );
  } else {
    return <span>{props.startDate}</span>;
  }
};

export default DateDisplayDumb;
