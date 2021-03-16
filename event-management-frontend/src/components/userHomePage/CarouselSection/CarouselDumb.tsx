import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useStylesCarousel } from '../../../styles/CarouselSlideStyle';
import '../../../styles/CarouselStyle.css';
import { HighlightedEvent } from '../../../reducers/UserHomePageReducer';
import CarouselSlide from './CarouselSlide';


type Props = {
  events: HighlightedEvent[];
  isLoading: boolean;
  goToEventDetails: (id: number) => void;
};

const CarouselDumb = ({ events, isLoading, goToEventDetails }: Props) => {
  const classes = useStylesCarousel();

  return (
    <div>
      <Carousel infiniteLoop useKeyboardArrows autoPlay className={classes.carouselStyle}>
        {events.map((current) => (
          <CarouselSlide
            key={current.id}
            isLoading={isLoading}
            id={current.id}
            title={current.title}
            description={current.description}
            startHour={current.startTime.substring(0, 5)}
            startDate={current.startDate}
            endHour={current.endTime.substring(0, 5)}
            endDate={current.endDate}
            location={current.location}
            picture={current.picture}
            goToEventDetails={goToEventDetails}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselDumb;
