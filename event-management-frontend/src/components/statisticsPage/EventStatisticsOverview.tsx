import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { EventCrud } from '../../model/EventCrud';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@material-ui/core';

interface EventStatisticsProps {
  events: [];
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

  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log(selected);
    selected.map((s: any) => {
      console.log(s.label);
    });
  }, [selected]);

  const chartOption = {
    title: {
      text: 'My event',
    },
    chart: {
      type: 'pie',
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <>
      <div>
        <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
      </div>
      <Grid container spacing={2}>
        {selected.map((select: any) => (
          <Grid item xs={12} sm={6} key={select.id}>
            <HighchartsReact highcharts={Highcharts} options={chartOption} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default EventStatisticsOverview;
