import React from 'react';
import { EventReserveTicketType } from '../../../model/EventReserveTicketType';
import useStylesbuyTicketFirstPage from '../../../styles/BuyTicketsFirstPageStyle';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import DateDisplayDumb from './DateDisplayDumb';
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';

interface Props {
  event: EventReserveTicketType;
  radionButtonState: string;
  handleChangeRadioButtonState: any;
}
const EventDetailBuyPageDumb = (props: Props) => {
  const reserveTicketFirstPage = useStylesbuyTicketFirstPage();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <h1 className={`${reserveTicketFirstPage.title} titleResponsive`}>{props.event.title}</h1>

      <div className={reserveTicketFirstPage.styleblock}>
        <LocationOnIcon className={reserveTicketFirstPage.iconStyleLocation} />
        <div className={reserveTicketFirstPage.styleInline}>
          <span className={reserveTicketFirstPage.locationName}>{props.event.locationName}</span>
          <Typography className={`${reserveTicketFirstPage.newLineSpan} ${classes.typography}`}>
            {props.event.locationAddress}
          </Typography>
        </div>
      </div>

      <p className={` ${reserveTicketFirstPage.textStyle}`}>
        <span>
          <DateRangeRoundedIcon className={reserveTicketFirstPage.iconStyle} />
        </span>
        <DateDisplayDumb startDate={props.event.startDate} endDate={props.event.endDate}></DateDisplayDumb>
      </p>
      <p className={` ${reserveTicketFirstPage.textStyle}`}>
        <ScheduleRoundedIcon className={reserveTicketFirstPage.iconStyle} />
        {props.event.startHour.replace(/:\d\d([ ap]|$)/, '$1')}

        <span className={reserveTicketFirstPage.spacing}>{t('buyTicketsFirstPage.toTime')}</span>
        {props.event.endHour.replace(/:\d\d([ ap]|$)/, '$1')}
      </p>

      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue={props.radionButtonState}
        className={reserveTicketFirstPage.radioGroup}
      >
        <FormControlLabel
          className={reserveTicketFirstPage.textStyle}
          value="noSeat"
          control={
            <Radio
              color="primary"
              value="noSeat"
              onChange={(e) => props.handleChangeRadioButtonState(e.target.value)}
            />
          }
          label={<span className={reserveTicketFirstPage.textStyle}>{t('buyTicketsFirstPage.radioButtonNoSeat')}</span>}
          labelPlacement="start"
        />
        <FormControlLabel
          className={reserveTicketFirstPage.textStyle}
          value="seat"
          control={
            <Radio color="primary" value="seat" onChange={(e) => props.handleChangeRadioButtonState(e.target.value)} />
          }
          label={<span className={reserveTicketFirstPage.textStyle}>{t('buyTicketsFirstPage.radioButtonSeat')}</span>}
          labelPlacement="start"
        />
      </RadioGroup>
      <div className={`${reserveTicketFirstPage.tag} tagResponsive`}>
        <Typography className={reserveTicketFirstPage.tagText}>{t('buyTicketsFirstPage.generalTicketInfo')}</Typography>
      </div>

      <div className={`${reserveTicketFirstPage.generalInfoContainer} ${reserveTicketFirstPage.textStyle}`}>
        {props.event.ticketInfo}
      </div>
    </div>
  );
};

export default EventDetailBuyPageDumb;
