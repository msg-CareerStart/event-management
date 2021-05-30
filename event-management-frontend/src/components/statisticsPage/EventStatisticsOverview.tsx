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

  const sum = (unvalidated: number | undefined, validated: number | undefined) => {
    if (unvalidated != undefined && validated != undefined) {
      return unvalidated + validated;
    } else {
      return 0;
    }
  };
  return (
    <>
      <div>
        <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
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
                    data: [
                      {
                        name: 'Available',
                        y: props.eventStatistics.events.find((element) => element.id == select.value)?.availableTickets,
                        color: availableColor,
                      },

                      {
                        name: 'Validated',
                        y: props.eventStatistics.events.find((element) => element.id == select.value)?.validatedTickets,
                        color: validatedColor,
                      },

                      {
                        name: 'Occupancy Rate',
                        y: sum(
                          props.eventStatistics.events.find((element) => element.id == select.value)
                            ?.unvalidatedTickets,
                          props.eventStatistics.events.find((element) => element.id == select.value)?.validatedTickets
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

export default connect(mapStateToProps)(EventStatisticsOverview);
