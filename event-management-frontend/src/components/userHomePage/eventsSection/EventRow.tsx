import React from 'react';
import { Typography } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { useEventRowStyle } from '../../../styles/userHomePage/EventRowStyle';

interface EventRowProps {
  id: number;
  title: string;
  occupancyRate: number;
  startDate: string;
  endDate: string;
  handleOnClick: (id: number) => void;
}

function EventRow({ id, title, startDate, endDate, handleOnClick }: EventRowProps) {
  const classes = useEventRowStyle();

  return (
    <div onClick={() => handleOnClick(id)}>
      <Typography variant="h6" className={classes.eventTitle}>
        {title}
      </Typography>

      <div className={classes.eventDivInfo}>
        <EventIcon className={classes.eventIconInfo} />
        <Typography>
          {startDate} {startDate === endDate ? '' : ' - ' + endDate}
        </Typography>
      </div>
    </div>
  );
}

export default EventRow;
