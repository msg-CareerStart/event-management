import React from 'react';
import { Typography, Button, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import GroupIcon from '@material-ui/icons/Group';
import { UserEventList } from '../../../model/userEventsPage/UserEventList';
import { useCardStyle } from '../../../styles/userEventsPage/UserEventCardStyle';
import { useStyles } from '../../../styles/CommonStyles';
import { TFunction } from 'i18next';

interface UserEventCardProps {
  event: UserEventList;
  translation: TFunction;
  goToEventDetails: (eventId: number) => void;
}

export const noImageAvailableSrc = 'https://www.thegreensheet.com/Public/build/images.min/nophoto.png';

function UserEventCard({ event, translation, goToEventDetails }: UserEventCardProps) {
  const classes = useCardStyle();
  const communStyles = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          onClick={(e) => goToEventDetails(event.id)}
          className={classes.imageWrapper}
          image={event.picture ? event.picture : noImageAvailableSrc}
        />

        <CardContent className={classes.eventInfo}>
          <Typography
            variant="h6"
            className={`${classes.eventTextInfo} ${classes.eventTitle}`}
            onClick={(e) => goToEventDetails(event.id)}
          >
            {event.title}
          </Typography>

          <div className={classes.eventDivInfo}>
            <LocationOnIcon className={classes.eventIconInfo} />
            <Typography variant="subtitle1" className={classes.eventTextInfo}>
              {event.location}
            </Typography>
          </div>

          <div className={classes.eventDivInfo}>
            <EventIcon className={classes.eventIconInfo} />
            <Typography variant="subtitle1" className={classes.eventTextInfo}>
              {event.startDate} {event.startDate === event.endDate ? '' : ' - ' + event.endDate}
            </Typography>
          </div>

          <div className={classes.eventDivInfo}>
            <QueryBuilderIcon className={classes.eventIconInfo} />
            <Typography variant="subtitle1" className={classes.eventTextInfo}>
              {event.startTime} - {event.endTime}
            </Typography>
          </div>

          <div className={classes.eventDivInfo}>
            <GroupIcon className={classes.eventIconInfo} />
            <Typography variant="subtitle1" className={classes.eventTextInfo}>
              {event.rate}%
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.cardActions}>
        <Button
          className={`${communStyles.mainButtonStyle} ${communStyles.pinkGradientButtonStyle} ${classes.detailsButton}`}
          onClick={(e) => goToEventDetails(event.id)}
        >
          {translation('userEventList.detailsButton')}
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserEventCard;
