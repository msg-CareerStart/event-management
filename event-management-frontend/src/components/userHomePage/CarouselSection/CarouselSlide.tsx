import React from 'react';
import { useStylesCarousel } from '../../../styles/CarouselSlideStyle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from '@material-ui/core';

type Props = {
  isLoading: boolean;
  id: number;
  title: string;
  description: string;
  startHour: string;
  startDate: string;
  endHour: string;
  endDate: string;
  location: string;
  picture: string;
  goToEventDetails: (id: number) => void;
};

const CarouselSlide = ({
  isLoading,
  id,
  title,
  description,
  startHour,
  startDate,
  endHour,
  endDate,
  location,
  picture,
  goToEventDetails,
}: Props) => {
  const classes = useStylesCarousel();

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress className={classes.loading} />
      </Container>
    );
  }

  return (
    <Card className={classes.cardStyle}>
      <CardActionArea>
        <div className={classes.imageWrapper}>
          <CardMedia className={classes.imageStyle} image={picture} onClick={(e) => goToEventDetails(id)} />
          <div className={classes.textOnImage}>
            <p className={classes.titleStyle}>&nbsp;{title}&nbsp;</p>
          </div>
        </div>
        <CardContent>
          <div className={classes.attributeStyle}>
            <DescriptionIcon className={classes.iconStyle} />
            <Typography variant="h6" className={classes.descriptionTextStyle}>
              {description}
            </Typography>
          </div>
          <Grid container>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className={classes.dateStyle}>
                <QueryBuilderIcon className={classes.iconStyle} />
                <Typography variant="body1" className={classes.textStyle}>
                  {startDate + '/' + startHour + ' - ' + endDate + '/' + endHour}
                </Typography>
              </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className={classes.locationStyle}>
                <LocationOnIcon className={classes.iconStyle} />
                <Typography variant="body1" className={classes.textStyle}>
                  {location}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarouselSlide;
