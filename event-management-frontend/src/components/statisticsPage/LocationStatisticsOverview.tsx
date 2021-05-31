import React, { useEffect, useState } from 'react';
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

interface LocationStatisticsProps {
  locations: LocationType[];
  locationsStatistics: LocationPageStatistics;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function LocationStatisticsOverview(props: LocationStatisticsProps) {
  const options: { label: string; value: number }[] = [];

  console.log(props.locationsStatistics);

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
    console.log(props.locationsStatistics);
  }, [selected]);

  return (
    <>
      <div>
        <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
      </div>
      <Grid container spacing={2}>
        {selected.map((select: any) => (
          <Grid item xs={12} sm={6} key={select.id}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                title: {
                  text: select.label,
                },
                xAxis: {
                  categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
                },
                yAxis: {
                  min: 0,
                  title: {
                    text: 'Total fruit consumption',
                  },
                },
                legend: {
                  reversed: true,
                },
                plotOptions: {
                  series: {
                    stacking: 'normal',
                  },
                },
                series: [
                  {
                    name: 'Occupied, unvalidated',
                    data: [5, 3, 4, 7, 2],
                  },
                  {
                    name: 'Occupied, validated',
                    data: [2, 2, 3, 2, 1],
                  },
                  {
                    name: 'Available',
                    data: [3, 4, 4, 2, 5],
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
