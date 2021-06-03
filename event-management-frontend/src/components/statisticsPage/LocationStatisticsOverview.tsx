import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@material-ui/core';
import { LocationType } from '../../model/LocationType';
import { LocationPageStatistics } from '../../reducers/LocationStatisticsReducer';
import { AppState } from '../../store/store';
import { connect } from 'react-redux';
import { EventStatistics } from '../../model/EventStatistics';
import { getPercentage, sum } from './EventStatisticsOverview';
import { availableColor, occupancyRateColor } from '../../styles/ChartColors';

interface LocationStatisticsProps {
  events: [];
  locations: LocationType[];
  locationsStatistics: LocationPageStatistics;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function LocationStatisticsOverview(props: LocationStatisticsProps) {
  const locationOptions: { label: string; value: number }[] = [];
  props.locations.map((loc: any) => {
    const option = {
      label: loc.name,
      value: loc.id,
    };
    locationOptions.push(option);
  });

  const eventOptions: { label: string; value: number }[] = [];
  props.events.map((e: any) => {
    const event = {
      label: e.title,
      value: e.id,
    };
    eventOptions.push(event);
  });

  const { t } = useTranslation();
  const [selected, setSelected] = useState<any[]>([]);

  const customRenderer = (selected: any, _options: any) => {
    return selected.length
      ? selected.map(
          (sel: { value: number }) => locationOptions.find((elem) => elem.value == sel.value)?.label + '✔️  '
        )
      : '❌ ' + t('welcome.noItemsSelected');
  };

  const getNamesOfEventsById = (eventIds: number[] | undefined) => {
    if (eventIds != undefined) {
      const searchedEvents = eventOptions.filter((eventOption) => eventIds.includes(eventOption.value));
      return searchedEvents.map((searchedEvent) => searchedEvent.label);
    } else {
      return undefined;
    }
  };

  const getAvailableTickets = (eventStatistics: EventStatistics[] | undefined) => {
    if (eventStatistics != undefined) {
      return eventStatistics.map((event) => getPercentage(event.availableTickets, event.totalTickets));
    } else {
      return 0;
    }
  };

  const getOccupancyRate = (eventStatistics: EventStatistics[] | undefined) => {
    if (eventStatistics != undefined) {
      return eventStatistics.map((event) =>
        getPercentage(sum(event.unvalidatedTickets, event.validatedTickets), event.totalTickets)
      );
    } else {
      return 0;
    }
  };

  return (
    <>
      <div>
        <MultiSelect
          options={locationOptions}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          valueRenderer={customRenderer}
        />
      </div>
      <Grid container spacing={2}>
        {selected.map((select: any) => (
          <Grid item xs={12} sm={6} key={select.id}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'bar',
                },
                title: {
                  text: select.label,
                },
                xAxis: {
                  title: {
                    text: 'Events',
                  },
                  categories: getNamesOfEventsById(
                    props.locationsStatistics.locations
                      .find((location) => location.idLocation == select.value)
                      ?.eventStatistics.map((event) => event.id)
                  ),
                },
                yAxis: {
                  min: 0,
                  title: {
                    text: "Percentage of tickets' distribution / event",
                  },
                },
                legend: {
                  reversed: true,
                },
                tooltip: {
                  pointFormat:
                    '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                  shared: false,
                },
                plotOptions: {
                  series: {
                    stacking: 'percent',
                  },
                },
                series: [
                  {
                    name: 'Available',
                    data: getAvailableTickets(
                      props.locationsStatistics.locations.find((location) => location.idLocation == select.value)
                        ?.eventStatistics
                    ),
                    color: availableColor,
                  },
                  {
                    name: 'Occupancy Rate',
                    data: getOccupancyRate(
                      props.locationsStatistics.locations.find((location) => location.idLocation == select.value)
                        ?.eventStatistics
                    ),
                    color: occupancyRateColor,
                  },
                ],
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    locationsStatistics: state.locationsStatistics,
  };
};

export default connect(mapStateToProps)(LocationStatisticsOverview);
