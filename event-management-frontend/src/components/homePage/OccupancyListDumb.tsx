import React from 'react';
import { Typography, Divider, Box } from '@material-ui/core';
import useStylesCards from '../../styles/OccupancyCardsStyle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import OccupancyCardDate from './OccupancyCardDate';
import { OccupancyCardType } from '../../model/OcuupancyCardsType';

interface Props {
  eventsList: OccupancyCardType[];
}

const OccupancyListDumb = (props: Props) => {
  const classCardStyle = useStylesCards();
  const { t } = useTranslation();
  return (
    <div className={classCardStyle.list}>
      <Carousel>
        {props.eventsList.map((event: OccupancyCardType) => (
          <div className={classCardStyle.block} key={event.id}>
            <Box component="div" display="inline">
              <div className={classCardStyle.listItem}>
                <Typography className={`${classCardStyle.title} ${classCardStyle.text}`}>{event.title}</Typography>
                <Typography className={`${classCardStyle.occupancyRate} ${classCardStyle.text}`}>
                  {t('occupancyCards.occupancyRate')} {event.occupancyRate} %
                </Typography>

                <Typography component={'div'} className={`${classCardStyle.dateRange} ${classCardStyle.text}`}>
                  <DateRangeIcon className={classCardStyle.dateIcon} />
                  <OccupancyCardDate startDate={event.startDate} endDate={event.endDate} />
                </Typography>
              </div>
            </Box>

            <Divider variant={'middle'} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default OccupancyListDumb;
