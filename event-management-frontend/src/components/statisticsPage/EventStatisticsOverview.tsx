import React, { useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@material-ui/core';
import { EventStatisticsPageState } from '../../reducers/EventStatisticsPageReducer';
import { AppState } from '../../store/store';
import { connect } from 'react-redux';
import { availableColor, occupancyRateColor, validatedColor } from '../../styles/ChartColors';

interface EventStatisticsProps {
  events: [];
  eventStatistics: EventStatisticsPageState;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function EventStatisticsOverview(props: EventStatisticsProps) {
  const options: { label: string; value: number }[] = [];

  props.events.map((e: any) => {
    const option = {
      label: e.title,
      value: e.id,
    };
    options.push(option);
  });

  const [selected, setSelected] = useState([]);

  const customRenderer = (selected: any, _options: any) => {
    return selected.length
      ? selected.map((sel: { value: number }) => options.find((elem) => elem.value == sel.value)?.label + '✔️  ')
      : '❌ No Items Selected';
  };

  return (
    <>
      <div>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          valueRenderer={customRenderer}
        />
      </div>
      <Grid container spacing={2}>
        {selected.map((select: any) => (
          <Grid item xs={12} sm={6} key={select.value}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                title: {
                  text: select.label,
                },

                series: [
                  {
                    type: 'pie',
                    showInLegend: true,
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
                    data: [
                      {
                        name: 'Available',
                        y: getPercentage(
                          props.eventStatistics.events.find((element) => element.id == select.value)?.availableTickets,
                          props.eventStatistics.events.find((element) => element.id == select.value)?.totalTickets
                        ),
                        color: availableColor,
                      },
                      {
                        name: 'Occupancy Rate',
                        y: getPercentage(
                          sum(
                            props.eventStatistics.events.find((element) => element.id == select.value)
                              ?.unvalidatedTickets,
                            props.eventStatistics.events.find((element) => element.id == select.value)?.validatedTickets
                          ),
                          props.eventStatistics.events.find((element) => element.id == select.value)?.totalTickets
                        ),
                        color: occupancyRateColor,
                      },
                    ],
                    dataLabels: {
                      enabled: true,
                    },
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
    eventStatistics: state.eventStatistics,
  };
};

export const sum = (unvalidated: number | undefined, validated: number | undefined) => {
  if (unvalidated != undefined && validated != undefined) {
    return parseFloat((unvalidated + validated).toFixed(2));
  } else {
    return 0;
  }
};

export const getPercentage = (value: number | undefined, total: number | undefined) => {
  if (value != undefined && total != undefined) {
    return parseFloat(((100 * value) / total).toFixed(2));
  } else {
    return 0;
  }
};

export default connect(mapStateToProps)(EventStatisticsOverview);
