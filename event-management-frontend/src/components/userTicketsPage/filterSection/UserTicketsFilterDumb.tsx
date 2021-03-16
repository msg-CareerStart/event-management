import React, { FormEvent } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles';
import { useUserFilterStyles } from '../../../styles/userEventsPage/UserFilterStyle';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { TicketFilters } from '../../../model/TicketFilters';

interface Props {
  isExpanded: boolean;
  filters: TicketFilters;
  errorStartDate: string;
  errorEndDate: string;
  updateFilters: (filters: TicketFilters) => void;
  toggle: () => void;
  clear: () => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
  handleChangeTitle: (title: string) => void;
  handleChangeStartDate: (startDate: string) => void;
  handleChangeEndDate: (startDate: string) => void;
}

const UserTicketsFilterDumb = ({
  isExpanded,
  filters,
  errorStartDate,
  errorEndDate,
  updateFilters,
  toggle,
  clear,
  submitForm,
  handleChangeTitle,
  handleChangeStartDate,
  handleChangeEndDate,
}: Props) => {
  const commonClasses = useStyles();
  const filterStyle = useUserFilterStyles();
  const [t] = useTranslation();

  return (
    <Paper className={filterStyle.root}>
      <form onSubmit={(event) => submitForm(event)} className={filterStyle.filterArea}>
        <Grid container spacing={3} className={filterStyle.filterArea}>
          <Grid item xs={12} sm={10} md={12} xl={12} container spacing={3}>
            <Grid item xs={12} sm={4} md={4} xl={4}>
              <TextField
                name="title"
                value={filters.title}
                label={t('eventList.title')}
                variant="outlined"
                fullWidth
                onChange={(e) => handleChangeTitle(e.target.value)}
                className={filterStyle.textOverflow}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} xl={4}>
              <TextField
                name="date"
                type="date"
                error={errorStartDate !== ''}
                label={t('ticketList.startDate')}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                helperText={errorStartDate}
                value={filters.startDate === undefined ? '' : moment(filters.startDate).format('YYYY-MM-DD')}
                onChange={(e) => handleChangeStartDate(e.target.value)}
                className={filterStyle.textOverflow}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} xl={4}>
              <TextField
                name="date"
                type="date"
                error={errorEndDate !== ''}
                label={t('ticketList.endDate')}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                helperText={errorEndDate}
                value={filters.endDate === undefined ? '' : moment(filters.endDate).format('YYYY-MM-DD')}
                onChange={(e) => handleChangeEndDate(e.target.value)}
                className={filterStyle.textOverflow}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10} md={12} xl={12} container spacing={3}>
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <Button
                className={`${commonClasses.mainButtonStyle} 
                                ${commonClasses.pinkGradientButtonStyle} 
                                ${filterStyle.filterButtons}`}
                onClick={clear}
              >
                {t('eventList.clearButton')}
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={6} xl={6}>
              <Button
                type="submit"
                className={`${commonClasses.mainButtonStyle} 
                                ${commonClasses.pinkGradientButtonStyle} 
                                ${filterStyle.filterButtons}`}
                disabled={errorStartDate !== '' || errorEndDate !== ''}
              >
                {t('eventList.filterButton')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UserTicketsFilterDumb;
