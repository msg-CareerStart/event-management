import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@material-ui/core';
import { LocationType } from '../../model/LocationType';

interface LocationStatisticsProps {
  locations: LocationType[];
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function LocationStatisticsOverview(props: LocationStatisticsProps) {
  const options: { label: string; value: number }[] = [];

  props.locations.map((loc: any) => {
    const option = {
      label: loc.name,
      value: loc.address,
    };
    options.push(option);
  });

  const { t } = useTranslation();
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    selected.map((s: any) => {
      console.log(s.label);
    });
  }, [selected]);

  const chartOption = {
    title: {
      text: 'My location',
    },
    chart: {
      type: 'bar',
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

export default LocationStatisticsOverview;
