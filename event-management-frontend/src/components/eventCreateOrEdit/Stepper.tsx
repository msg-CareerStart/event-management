import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Overview from '@material-ui/icons/Assignment';
import Location from '@material-ui/icons/Room';
import Tickets from '@material-ui/icons/ConfirmationNumber';
import Images from '@material-ui/icons/Image';
import { stepperStyles } from '../../styles/StepperStyle';
import TabPanel from './TabPanel';
import { a11yProps } from '../../utils/CrudStepperUtils';

interface EventProps {
  overviewComponent: React.ReactNode;
  locationComponent: React.ReactNode;
  ticketsComponent: React.ReactNode;
  imagesComponent: React.ReactNode;
}

function Stepper(props: EventProps) {
  const stepperClasses = stepperStyles();

  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const iconTab = (
    <Tabs orientation='vertical' value={value} onChange={handleTabChange} className={stepperClasses.iconTabs} centered>
      <Tab icon={<Overview />} {...a11yProps(0)} />
      <Tab icon={<Location />} {...a11yProps(1)} />
      <Tab icon={<Tickets />} {...a11yProps(2)} />
      <Tab icon={<Images />} {...a11yProps(3)} />
    </Tabs>
  );

  const textTab = (
    <Tabs orientation='vertical' value={value} onChange={handleTabChange} className={stepperClasses.tabs} centered>
      <Tab label={t('welcome.overviewTab')} {...a11yProps(0)} />
      <Tab label={t('welcome.locationTab')} {...a11yProps(1)} />
      <Tab label={t('welcome.ticketsTab')} {...a11yProps(2)} />
      <Tab label={t('welcome.imagesTab')} {...a11yProps(3)} />
    </Tabs>
  );

  const tabPanel = (
    <>
      <TabPanel value={value} index={0}>
        {props.overviewComponent}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.locationComponent}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.ticketsComponent}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {props.imagesComponent}
      </TabPanel>
    </>
  );

  const bigWindow = (
    <div className={stepperClasses.root}>
      <Grid container direction='row' justify='flex-start' alignItems='center'>
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
      <Grid container direction='row' justify='flex-start'>
        <Grid item xl={1} lg={2} md={2} sm={2} xs={1}>
          {iconTab}
        </Grid>

        <Grid item xl={11} lg={10} md={10} sm={9} xs={8} style={{ minHeight: '93vh', backgroundColor: 'white', minWidth: '91.6vw' }}>
          {tabPanel}
        </Grid>
      </Grid>
    </div>
  );

  const matches = useMediaQuery('(max-width:599px)');
  return <>{matches ? smallWindow : bigWindow}</>;
}

export default Stepper;
