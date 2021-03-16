import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { Tooltip, CardHeader, CardContent, Card, LinearProgress, Typography } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Booking } from '../../../model/userHome/Booking';
import { useEventCardStyle } from '../../../styles/userHomePage/EventCardStyle';
import { TFunction } from 'i18next';
import '../../../styles/userHomePage/PickerStyle.css';

interface UserHomePageProps {
  bookings: Booking[];
  isError: boolean;
  isLoading: boolean;
  translation: TFunction;
  handleOnClick: () => void;
}

function CheckInSectionDumb({ bookings, isError, isLoading, translation, handleOnClick }: UserHomePageProps) {
  const classes = useEventCardStyle();

  const onDateChange = () => {};

  const tooltipTitle = (titles: string[]) => {
    return titles?.length ? (
      <>
        {' '}
        {titles.map((t) => (
          <p key={t}>
            <b>{t}</b>
          </p>
        ))}{' '}
      </>
    ) : (
      ''
    );
  };

  function renderDay(
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: any,
    dayComponent: any
  ) {
    const clickedDate = day?.format('YYYY-MM-DD');
    const titles = bookings?.filter((b) => b.date === clickedDate).map((b) => b.title);
    const isEvents = titles?.length > 0;
    const isCurrentDate = clickedDate === moment().format('YYYY-MM-DD');
    const isPastEvent = day ? moment() > day : false;

    return (
      <Tooltip arrow title={tooltipTitle(titles)}>
        <div>
          {React.cloneElement(dayComponent, {
            style: {
              marginBottom: '5px',
              backgroundColor: `${isCurrentDate ? '#f2ac0a' : isEvents ? isPastEvent? 'rgb(107, 183, 208, 0.4)' : '#6BB7D0' : 'none'}`,
              color: `${isEvents ? 'white' : ''}`,
            },
            onClick: () => {
              isEvents && handleOnClick();
            },
          })}
        </div>
      </Tooltip>
    );
  }

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <Card>
        <CardHeader className={classes.header} title={translation('userHomePage.calendar')} />

        <CardContent className={classes.cardContent}>
          {isError ? (
            <Typography variant="subtitle1"> {translation('userHomePage.errorMessage')}</Typography>
          ) : isLoading ? (
            <LinearProgress />
          ) : (
            <KeyboardDatePicker
              disableToolbar
              showTodayButton={true}
              value={moment()}
              format="YYYY-MM-DD"
              variant="static"
              onChange={onDateChange}
              renderDay={renderDay}
            />
          )}
        </CardContent>
      </Card>
    </MuiPickersUtilsProvider>
  );
}

export default CheckInSectionDumb;
