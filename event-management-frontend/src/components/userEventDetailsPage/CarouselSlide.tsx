import React, { useState } from 'react';
import { Grid, CardMedia } from '@material-ui/core';
import Arrow from './Arrow';
import { EventImage } from '../../model/EventImage';
import { carouselSlideStyle } from '../../styles/CarouselSlideStyles';
import { testImages } from '../../utils/CarouselSlideUtils';

interface Props {
  images: EventImage[];
}

function CarouselSlide({ images }: Props) {
  const [index, setIndex] = useState(0);

  let content: EventImage | { url: string };
  let numSlides: number;

  if (images.length > 0) {
    content = images[index];
    numSlides = images.length;
  } else {
    content = testImages[index];
    numSlides = testImages.length;
  }

  const onArrowClick = (direction: string) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    setIndex(newIndex);
  };

  const style = carouselSlideStyle();
  return (
    <Grid item container direction="row" justify="center" alignItems="center" className={style.position}>
      {images.length > 1 && <Arrow direction="left" clickFunction={() => onArrowClick('left')} />}

      <Grid item xs={7} xl={6}>
        <CardMedia className={style.card} image={content.url} />
      </Grid>

      {images.length > 1 && <Arrow direction="right" clickFunction={() => onArrowClick('right')} />}
    </Grid>
  );
}

export default CarouselSlide;
