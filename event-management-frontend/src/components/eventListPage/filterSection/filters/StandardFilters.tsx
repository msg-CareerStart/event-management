import React from 'react';
import { Grid } from '@material-ui/core';
import SimpleFilterCriteria from './SimpleFilterCriteria';
import { TFunction } from 'i18next';

interface StandardFiltersProps {
  t: TFunction;
  title: string;
  subtitle: string;
  location: string;
  handleChangeTitle: (value: string) => void;
  handleChangeSubtitle: (value: string) => void;
  handleChangeLocation: (value: string) => void;
}

function StandardFilters({
  t,
  title,
  subtitle,
  location,
  handleChangeTitle,
  handleChangeSubtitle,
  handleChangeLocation,
}: StandardFiltersProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <SimpleFilterCriteria label={t('eventList.title')} value={title} handleChange={handleChangeTitle} />
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <SimpleFilterCriteria label={t('eventList.subtitle')} value={subtitle} handleChange={handleChangeSubtitle} />
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <SimpleFilterCriteria label={t('eventList.location')} value={location} handleChange={handleChangeLocation} />
      </Grid>
    </Grid>
  );
}

export default StandardFilters;
