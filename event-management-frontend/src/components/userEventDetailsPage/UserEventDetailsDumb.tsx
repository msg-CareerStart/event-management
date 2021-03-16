import React from 'react';
import { EventCrud } from '../../model/EventCrud';
import { EventImage } from '../../model/EventImage';
import { Button, Grid, Typography, TableContainer, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useStyles } from '../../styles/CommonStyles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CarouselSlide from './CarouselSlide';
import { userEventDetailsStyles } from '../../styles/UserEventDetailsStyles';

interface UserEventDetailsDumbProps {
  event: EventCrud;
  images: EventImage[];
  locationAddress: string;
  locationName: string;
}

function UserEventDetailsDumb(props: UserEventDetailsDumbProps) {
  const today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
  const dateAndTime = today.split('T');
  const currDate = dateAndTime[0];
  const currTime = dateAndTime[1];

  const commonStyles = useStyles();
  const userEventDetailsStyle = userEventDetailsStyles();
  const history = useHistory();
  const { t } = useTranslation();

  let handleBackButton = (): void => {
    history.push('/user/events');
  };

  let handleJoinButton = (): void => {
    history.push(`/user/reserve-tickets/first-page/${props.event.id}`);
  };

  return (
    <Grid container spacing={0} direction="column" justify="space-between" alignItems="center">
      <CarouselSlide images={props.images} />

      <Grid item container justify="center">
        <Grid item>
          <Typography className={userEventDetailsStyle.typographyTitle}>{props.event.title}</Typography>
        </Grid>
      </Grid>

      <Grid item container justify="center">
        <Grid item>
          <Typography className={userEventDetailsStyle.typographySubtitle}>{props.event.subtitle}</Typography>
        </Grid>
      </Grid>

      <Grid item container justify="center">
        <Grid item xs={9} sm={6} md={5} lg={4} xl={4}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.overviewStartDate')}
                  </TableCell>
                  <TableCell align="right">{props.event.startDate}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.overviewEndDate')}
                  </TableCell>
                  <TableCell align="right">{props.event.endDate}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.overviewStartTime')}
                  </TableCell>
                  <TableCell align="right">{props.event.startHour.replace(/:\d\d([ ap]|$)/, '$1')}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.overviewEndTime')}
                  </TableCell>
                  <TableCell align="right">{props.event.endHour.replace(/:\d\d([ ap]|$)/, '$1')}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.locationName')}
                  </TableCell>
                  <TableCell align="right">{props.locationName}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.locationAddress')}
                  </TableCell>
                  <TableCell align="right">{props.locationAddress}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.overviewMaxPpl')}
                  </TableCell>
                  <TableCell align="right">{props.event.maxPeople}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    {t('welcome.overviewStatus')}
                  </TableCell>
                  {props.event.status ? (
                    <TableCell align="right"> {t('welcome.overviewStatusActive')}</TableCell>
                  ) : (
                      <TableCell align="right">{t('welcome.overviewStatusInactive')}</TableCell>
                    )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid item container justify="center" alignItems="flex-end" direction="row" className={userEventDetailsStyle.position}>
        <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
          <Button className={`${commonStyles.mainButtonStyle} ${commonStyles.pinkGradientButtonStyle}`} onClick={handleBackButton}>
            {t('welcome.backButton')}
          </Button>
        </Grid>

        <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
          <Button
            className={`${commonStyles.mainButtonStyle} ${commonStyles.pinkGradientButtonStyle} ${userEventDetailsStyle.disabled}`}
            disabled={props.event.endDate < currDate || (props.event.endDate === currDate && props.event.endHour < currTime)}
            onClick={handleJoinButton}>
            {t('welcome.joinButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserEventDetailsDumb;
