import React from 'react';
import { Grid } from '@material-ui/core';
import OccupancyListSmart from './OccupancyListSmart';
import useStylesCards from '../../styles/OccupancyCardsStyle';

const Home = () => {
  const classHome = useStylesCards();

  return (
    <div className={classHome.adminHomeContainer}>
      <Grid container direction="row">
        <OccupancyListSmart />
      </Grid>
    </div>
  );
};

export default Home;
