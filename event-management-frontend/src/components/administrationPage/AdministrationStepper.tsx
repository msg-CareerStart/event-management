import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, FormControl, Grid, InputLabel, Paper, Select, Tooltip, useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import TabPanel from '../eventCreateOrEdit/TabPanel';
import { a11yProps } from '../../utils/CrudStepperUtils';
import { useAdministrationPageStyle } from '../../styles/administrationPage/AdministrationStepperStyle';
import { useStyles } from '../../styles/CommonStyles';
import { serverURL } from '../../api/Api';
import { dowloadCSV } from '../../api/AdministrationPageAPI';
import DialogExport from './DialogExport';
import FilesSectionSmart from './importSection/FilesSectionSmart';
import ExportSection from './exportSection/ExportSection';

interface EventProps {}

const AdministrationStepper = (props: EventProps) => {
  const buttonStyle = useStyles();
  const classes = useAdministrationPageStyle();
  const { t } = useTranslation();

  const [value, setValue] = useState(0);
  const [stateComboBox, setStateComboBox] = useState<string>('');
  const [showDialogExport, setShowDialogExport] = useState(false);
  const [doImport, setDoImport] = useState(false);

  const matches = useMediaQuery('(max-width:599px)');

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const valueComboBox = event.target.value as string;
    setStateComboBox(valueComboBox);
  };

  const handleClose = () => {
    setShowDialogExport(false);
  };

  useEffect(() => {
    setDoImport(false);
  }, []);

  const URL_EXPORT_TICKETS = serverURL + '/tickets/export';
  const URL_EXPORT_EVENTS = serverURL + '/events/export';

  const exportCSV = () => {
    if (stateComboBox === '10') {
      dowloadCSV(URL_EXPORT_EVENTS, 'exportedEvents.csv');
      setStateComboBox('0');
    } else if (stateComboBox === '20') {
      dowloadCSV(URL_EXPORT_TICKETS, 'exportedTickets.csv');
      setStateComboBox('0');
    } else {
      setShowDialogExport(true);
    }
  };

  const iconTab = (
    <Tabs orientation="vertical" value={value} className={classes.iconTabs} centered onChange={handleTabChange}>
      <Tooltip title={t('welcome.importTab') as string} placement="right" arrow>
        <Tab icon={<PublishIcon />} {...a11yProps(0)} />
      </Tooltip>
      <Tooltip title={t('welcome.exportTab') as string} placement="right" arrow>
        <Tab icon={<GetAppIcon />} {...a11yProps(1)} />
      </Tooltip>
    </Tabs>
  );

  const textTab = (
    <Tabs orientation="vertical" value={value} className={classes.tabs} centered onChange={handleTabChange}>
      <Tab label={t('welcome.importTab')} {...a11yProps(0)} />
      <Tab label={t('welcome.exportTab')} {...a11yProps(1)} />
    </Tabs>
  );

  const buttonSectionBig = (
    <Grid item xs={12} className={classes.buttonWrapperBig}>
      {value === 0 ? (
        <Button
          variant="contained"
          className={`${classes.button} ${buttonStyle.mainButtonStyle} ${buttonStyle.pinkGradientButtonStyle}`}
          onClick={() => setDoImport(true)}
        >
          {t('welcome.importTab')}
        </Button>
      ) : (
        <Button
          variant="contained"
          className={`${classes.button} ${buttonStyle.mainButtonStyle} ${buttonStyle.pinkGradientButtonStyle}`}
          onClick={() => exportCSV()}
        >
          {t('welcome.exportTab')}
        </Button>
      )}
    </Grid>
  );

  const buttonSectionSmall = (
    <Grid item xs={12} className={classes.buttonWrapperSmall}>
      {value === 0 ? (
        <Button
          variant="contained"
          className={`${classes.button} ${buttonStyle.mainButtonStyle} ${buttonStyle.pinkGradientButtonStyle}`}
          onClick={() => setDoImport(true)}
        >
          {t('welcome.importTab')}
        </Button>
      ) : (
        <Button
          variant="contained"
          className={`${classes.button} ${buttonStyle.mainButtonStyle} ${buttonStyle.pinkGradientButtonStyle}`}
          onClick={() => exportCSV()}
        >
          {t('welcome.exportTab')}
        </Button>
      )}
    </Grid>
  );

  const buttonSection = <>{matches ? buttonSectionSmall : buttonSectionBig}</>;

  const tabPanel = (
    <Grid container direction="column" justify="center" alignItems="center">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">{t('files.type')}</InputLabel>
        <Select
          native
          value={stateComboBox}
          onChange={handleChange}
          label="Type"
          inputProps={{
            name: 'type',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="0" />
          <option value={10}>{t('files.events')}</option>
          <option value={20}>{t('files.tickets')}</option>
        </Select>
      </FormControl>

      <div className={classes.component}>
        <TabPanel value={value} index={0}>
          <FilesSectionSmart
            doImport={doImport}
            state={stateComboBox}
            setStateComboBox={setStateComboBox}
            setShowDialogExport={setShowDialogExport}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ExportSection />
        </TabPanel>
      </div>

      <>{buttonSection}</>
    </Grid>
  );

  const bigWindow = (
    <Paper className={classes.paperBig}>
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item xl={1} lg={2} md={2} sm={3} xs={3}>
            {textTab}
          </Grid>

          <Grid item xl={11} lg={10} md={10} sm={9} xs={9} style={{ minHeight: '93vh', backgroundColor: 'white' }}>
            {tabPanel}
          </Grid>
        </Grid>

        <DialogExport handleClose={handleClose} open={showDialogExport} />
      </div>
    </Paper>
  );

  const smallWindow = (
    <Paper className={classes.paperSmall}>
      <div className={`${classes.root} ${classes.rootResponsive}`}>
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
    </Paper>
  );

  return <>{matches ? smallWindow : bigWindow}</>;
};

export default AdministrationStepper;
