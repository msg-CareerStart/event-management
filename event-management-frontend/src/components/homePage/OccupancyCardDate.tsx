import React from 'react';
import useStylesCards from '../../styles/OccupancyCardsStyle';

interface Props {
  startDate: string;
  endDate: string;
}

const OccupancyCardDate = (props: Props) => {
  const classCardStyle = useStylesCards();
  if (props.startDate !== props.endDate) {
    return (
      <span>
        {props.startDate}

        <span className={classCardStyle.spacing}>-</span>
        {props.endDate}
      </span>
    );
  } else {
    return <span>{props.startDate}</span>;
  }
};

export default OccupancyCardDate;
