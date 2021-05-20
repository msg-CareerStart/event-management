import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Grid } from '@material-ui/core';
import OccupancyListDumb from './OccupancyListDumb';
import { useStyles } from '../../styles/CommonStyles';
import useStylesCards from '../../styles/OccupancyCardsStyle';
import '../../styles/OccupancyCards.css';
import ErrorIcon from '@material-ui/icons/Error';
import { useTranslation } from 'react-i18next';
import HomeEventListSmart from './HomeEventListSmart';
import { OccupancyCardType } from '../../model/OcuupancyCardsType';

interface Props {
  upcomingEvents: OccupancyCardType[];
  historyEvents: OccupancyCardType[];
  isError: boolean;
  isLoading: boolean;
}

const CardsOccupancyDumb = (props: Props) => {
  const commonClasses = useStyles();
  const occupancyClasses = useStylesCards();
  const { t } = useTranslation();
  return (
    <Grid container spacing={3} direction="row">
      <Grid item container sm={12} xl={9} md={8} direction="column">
        <Grid>
          <Card className={`${commonClasses.cardRoot} ${occupancyClasses.occupancyCard}`} variant="outlined">
            <CardContent>
              <Typography className={occupancyClasses.cardTitle}>{t('occupancyCards.upcomingEvents')}</Typography>
              {props.isLoading ? (
                <Grid container alignItems={'center'} justify={'center'}>
                  <CircularProgress />
                </Grid>
              ) : props.isError ? (
                <Grid container alignItems={'center'} justify={'center'}>
                  <ErrorIcon color={'primary'} fontSize={'large'} />
                  Oops, there was an error
                </Grid>
              ) : (
                <OccupancyListDumb eventsList={props.upcomingEvents} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card className={`${commonClasses.cardRoot} ${occupancyClasses.occupancyCard} `} variant="outlined">
            <CardContent>
              <Typography className={occupancyClasses.cardTitle}>{t('occupancyCards.historyEvents')}</Typography>
              {props.isLoading ? (
                <Grid container alignItems={'center'} justify={'center'}>
                  <CircularProgress />
                </Grid>
              ) : props.isError ? (
                <Grid container alignItems={'center'} justify={'center'}>
                  <ErrorIcon color={'primary'} fontSize={'large'} />
                  Oops, there was an error
                </Grid>
              ) : (
                <OccupancyListDumb eventsList={props.historyEvents} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item sm={12} xl={3} md={4}>
        <HomeEventListSmart />
      </Grid>
    </Grid>
  );
};

export default CardsOccupancyDumb;
