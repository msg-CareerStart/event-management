import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { stepperStyles } from '../../styles/StepperStyle';
import Overview from '@material-ui/icons/Assignment';
import Location from '@material-ui/icons/Room';
import { a11yProps } from '../../utils/CrudStepperUtils';
import { Grid, Tooltip, useMediaQuery } from '@material-ui/core';
import TabPanel from '../eventCreateOrEdit/TabPanel';

interface StatisticsProps {
  eventsComponent: React.ReactNode;
  locationComponent: React.ReactNode;
}

function StepperStatistics(props: StatisticsProps) {
  const stepperClasses = stepperStyles();

  const counter = useSelector<AppState, number>((state) => state.step.stepNumber);
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(counter);
    setValue(counter);
  }, [counter]);

  const iconTab = (
    <Tabs orientation="vertical" value={value} onChange={handleTabChange} className={stepperClasses.iconTabs} centered>
      <Tooltip title={t('welcome.eventStatistics') as string} placement="right" arrow>
        <Tab icon={<Overview />} {...a11yProps(0)} />
      </Tooltip>
      <Tooltip title={t('welcome.locationStatistics') as string} placement="right" arrow>
        <Tab icon={<Location />} {...a11yProps(1)} />
      </Tooltip>
    </Tabs>
  );

  const textTab = (
    <Tabs orientation="vertical" value={value} onChange={handleTabChange} className={stepperClasses.tabs} centered>
      <Tab label={t('welcome.eventStatisticTab')} {...a11yProps(0)} />
      <Tab label={t('welcome.locationStatisticTab')} {...a11yProps(1)} />
    </Tabs>
  );

  const tabPanel = (
    <>
      <TabPanel value={value} index={0}>
        {props.eventsComponent}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.locationComponent}
      </TabPanel>
    </>
  );

  const bigWindow = (
    <div className={stepperClasses.root}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xl={1} lg={2} md={2} sm={3} xs={3}>
          {textTab}
        </Grid>

        <Grid item xl={11} lg={10} md={10} sm={9} xs={9} style={{ minHeight: '93vh', backgroundColor: 'white' }}>
          {tabPanel}
        </Grid>
      </Grid>
    </div>
  );

  const smallWindow = (
    <div className={`${stepperClasses.root} ${stepperClasses.rootResponsive}`}>
      <Grid container direction="row" justify="flex-start">
        <Grid item xl={1} lg={2} md={2} sm={2} xs={1}>
          {iconTab}
        </Grid>

        <Grid
          item
          xl={11}
          lg={10}
          md={10}
          sm={9}
          xs={8}
          style={{ minHeight: '93vh', backgroundColor: 'white', minWidth: '91.6vw' }}
        >
          {tabPanel}
        </Grid>
      </Grid>
    </div>
  );
  const matches = useMediaQuery('(max-width:599px)');
  return <>{matches ? smallWindow : bigWindow}</>;
}

export default StepperStatistics;
