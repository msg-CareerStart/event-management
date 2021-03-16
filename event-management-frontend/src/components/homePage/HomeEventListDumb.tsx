import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import ErrorIcon from '@material-ui/icons/Error';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStylesCards from '../../styles/OccupancyCardsStyle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
  page: number;
  lastPage: number;

  eventsDetails: any[];
  goToPrevPage: () => void;
  goToNextPage: () => void;

  isLoading: boolean;
  isError: boolean;
}

const HomeEventListDumb = ({
  page,
  lastPage,
  eventsDetails,
  goToPrevPage,
  goToNextPage,
  isLoading,
  isError,
}: Props) => {
  const commonClasses = useStyles();
  const occupancyClasses = useStylesCards();

  const [t] = useTranslation();

  return (
    <>
      <Card
        className={`${commonClasses.cardRoot} ${occupancyClasses.occupancyCard} cardsResponsive`}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h4" component="h4" className={occupancyClasses.text}>
            {t('eventList.events')}

            <Link to={`/admin/newEvent`} style={{ textDecoration: 'none' }}>
              <AddCircleIcon className={commonClasses.addEventIconButton} />
            </Link>
          </Typography>
        </CardContent>
      </Card>

      {isLoading ? (
        <Grid container alignItems={'center'} justify={'center'} className={commonClasses.marginTop}>
          <CircularProgress />
        </Grid>
      ) : isError ? (
        <Grid container alignItems={'center'} justify={'center'} className={commonClasses.marginTop}>
          <ErrorIcon color={'primary'} fontSize={'large'} />
          {t('eventList.error')}
        </Grid>
      ) : (
        eventsDetails
      )}

      <Box justifyContent="center" display="flex" className={commonClasses.marginTop}>
        {page > 1 ? (
          <Button onClick={goToPrevPage}>
            <ArrowBackIosIcon fontSize={'default'} />
          </Button>
        ) : (
          <Button disabled={true} />
        )}

        <Typography variant="h5">
          &nbsp;&nbsp;{page}/{lastPage}&nbsp;&nbsp;
        </Typography>

        {page < lastPage ? (
          <Button onClick={goToNextPage}>
            <ArrowForwardIosIcon fontSize={'default'} />
          </Button>
        ) : (
          <Button disabled={true} />
        )}
      </Box>
    </>
  );
};

export default HomeEventListDumb;
