import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  LinearProgress,
  Typography,
  Button,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { EventCard } from '../../../model/userHome/EventCard';
import EventRow from './EventRow';
import { useEventCardStyle } from '../../../styles/userHomePage/EventCardStyle';
import { TFunction } from 'i18next';

interface UserHomePageProps {
  past?: boolean;
  events: EventCard[];
  page: number;
  noPages: number;
  isError: boolean;
  isLoading: boolean;
  translation: TFunction;
  handleOnClick: (id: number) => void;
  updatePageNumber: (page: number) => void;
}

function EventsSectionDumb({
  past,
  events,
  page,
  noPages,
  isError,
  isLoading,
  translation,
  handleOnClick,
  updatePageNumber,
}: UserHomePageProps) {
  const classes = useEventCardStyle();

  return (
    <Card>
      <CardHeader
        className={classes.header}
        title={past ? translation('userHomePage.pastEvents') : translation('userHomePage.upcomingEvents')}
      />

      <CardContent className={classes.cardContent}>
        {isError ? (
          <Typography variant="subtitle1"> {translation('userHomePage.errorMessage')}</Typography>
        ) : isLoading ? (
          <LinearProgress />
        ) : noPages ? (
          <Grid container spacing={1}>
            {events.map((e) => (
              <Grid item xs={12} key={e.id}>
                <EventRow
                  id={e.id}
                  title={e.title}
                  startDate={e.startDate}
                  endDate={e.endDate}
                  occupancyRate={e.occupancyRate}
                  handleOnClick={() => handleOnClick(e.id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="subtitle1"> {translation('userHomePage.noEvents')} </Typography>
        )}
      </CardContent>

      <CardActions className={classes.pagination}>
        {!noPages ? (
          <></>
        ) : (
          <>
            {page === 0 ? (
              <Button className={`${classes.icon} ${classes.invisibleIcon}`}>
                <NavigateBeforeIcon />
              </Button>
            ) : (
              <Button className={`${classes.icon} ${classes.visibleIcon}`} onClick={() => updatePageNumber(page - 1)}>
                <NavigateBeforeIcon />
              </Button>
            )}

            <Typography variant="body2">
              {' '}
              {page + 1}/{noPages}{' '}
            </Typography>

            {page + 1 === noPages ? (
              <Button className={`${classes.icon} ${classes.invisibleIcon}`}>
                <NavigateNextIcon />
              </Button>
            ) : (
              <Button className={`${classes.icon} ${classes.visibleIcon}`} onClick={() => updatePageNumber(page + 1)}>
                <NavigateNextIcon />
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default EventsSectionDumb;
