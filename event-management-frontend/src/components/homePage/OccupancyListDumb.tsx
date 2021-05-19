import React from 'react';
import { Typography, Divider, Box, CardMedia, Grid } from '@material-ui/core';
import useStylesCards from '../../styles/OccupancyCardsStyle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import OccupancyCardDate from './OccupancyCardDate';
import { OccupancyCardType } from '../../model/OcuupancyCardsType';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import logo from '../../../public/logo512.png';
import { useHistory } from 'react-router-dom';

interface Props {
  eventsList: OccupancyCardType[];
}

const OccupancyListDumb = (props: Props) => {
  const history = useHistory();

  const goToEventDetails = (eventId: number) => {
    history.push(`/admin/events/${eventId}`);
  };

  const classCardStyle = useStylesCards();
  const { t } = useTranslation();

  return (
    <div className={classCardStyle.list}>
      <Carousel useKeyboardArrows infiniteLoop autoPlay>
        {props.eventsList.map((event: OccupancyCardType) => (
          <div className={classCardStyle.block} key={event.id}>
            <Box component="div" display="inline">
              <div className={classCardStyle.content}>
                <div className={classCardStyle.listItem}>
                  <div>
                    <Typography
                      className={`${classCardStyle.title} ${classCardStyle.text}`}
                      onClick={(e) => goToEventDetails(event.id)}
                    >
                      {event.title}
                    </Typography>
                  </div>
                  <div>
                    <Typography component={'div'} className={`${classCardStyle.dateRange} ${classCardStyle.text}`}>
                      <DateRangeIcon className={classCardStyle.dateIcon} />
                      <OccupancyCardDate startDate={event.startDate} endDate={event.endDate} />
                    </Typography>
                  </div>

                  <div>
                    <Typography>
                      <LocationOnIcon className={classCardStyle.locationIcon} />
                      {event.location}
                    </Typography>
                  </div>
                  <div>
                    <Typography className={`${classCardStyle.occupancyRate} ${classCardStyle.text}`}>
                      {t('occupancyCards.occupancyRate')} {event.occupancyRate} %
                    </Typography>
                  </div>
                </div>

                <div className={classCardStyle.imageCover}>
                  <div>
                    <img className={classCardStyle.imageContent} src="/iuliusM.jpg" alt="logo" />
                  </div>
                </div>
              </div>

              <Divider variant={'middle'} />
            </Box>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default OccupancyListDumb;
