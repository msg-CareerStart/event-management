import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Event } from '../../../model/Event';
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';
import { StyledTableRow } from '../../../styles/StyledTableRow';
import { StyledTableCell } from '../../../styles/StyledTableCell';

interface Props {
  event: Event;
}

const EventDetailsDumb = ({ event }: Props) => {
  const commonClasses = useStyles();
  const [t] = useTranslation();

  return (
    <StyledTableRow>
      <StyledTableCell>{event.title}</StyledTableCell>
      <StyledTableCell>{event.subtitle}</StyledTableCell>
      <StyledTableCell>{event.location}</StyledTableCell>
      <StyledTableCell>{event.startDate}</StyledTableCell>
      <StyledTableCell>{event.startHour}</StyledTableCell>
      <StyledTableCell>{event.occupancyRate}</StyledTableCell>

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

export default EventDetailsDumb;
