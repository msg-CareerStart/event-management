import React, { useEffect } from 'react';
import { stepperStyles } from '../../styles/StepperStyle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import { a11yProps } from '../../utils/CrudStepperUtils';
import TabPanel from '../eventCreateOrEdit/TabPanel';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

interface EventProps {
  userDetailComponent: React.ReactNode;
  appSettingsComponent: React.ReactNode;
}

function StepperAccount(props: EventProps) {
  const stepperClasses = stepperStyles();
  const counter = useSelector<AppState, number>((state) => state.step.stepNumber);

  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(counter);
  }, [counter]);

  const iconTab = (
    <Tabs orientation="vertical" value={value} onChange={handleTabChange} className={stepperClasses.iconTabs} centered>
      <Tab icon={<AccountCircleIcon />} {...a11yProps(0)} />
      <Tab icon={<SettingsIcon />} {...a11yProps(1)} />
    </Tabs>
  );

  const textTab = (
    <Tabs orientation="vertical" value={value} onChange={handleTabChange} className={stepperClasses.tabs} centered>
      <Tab label={t('welcome.userDetails')} {...a11yProps(0)} />
      <Tab label={t('welcome.appSettingsTab')} {...a11yProps(1)} />
    </Tabs>
  );

  const tabPanel = (
    <>
      <TabPanel value={value} index={0}>
        {props.userDetailComponent}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.appSettingsComponent}
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

export default StepperAccount;
