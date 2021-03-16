import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';
import { Event } from '../../../model/Event';
import { StyledTableCell } from '../../../styles/StyledTableCell';
import { StyledTableRow } from '../../../styles/StyledTableRow';

interface Props {
  event: Event;
}

const EventDetailsMobileDumb = ({ event }: Props) => {
  const commonClasses = useStyles();
  const [t] = useTranslation();

  return (
    <StyledTableRow>
      <StyledTableCell>{event.title}</StyledTableCell>
      <StyledTableCell>{event.startDate}</StyledTableCell>

      <StyledTableCell>
        <Link to={`/admin/events/${event.id}`} style={{ textDecoration: 'none' }}>
          <Button className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle}`}>
            {t('eventList.details')}
          </Button>
        </Link>
        <br />
        <br />
        <Link to={`/admin/validate/${event.id}`} style={{ textDecoration: 'none' }}>
          <Button className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle}`}>
            {t('eventList.validate')}
          </Button>
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EventDetailsMobileDumb;
