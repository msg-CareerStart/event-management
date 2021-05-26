import React, { KeyboardEvent } from 'react';
import { useStylesOverviewDumb } from '../../../styles/OverviewStyles';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { createTextField } from '../../../utils/DetailsAccUtils';

interface DetailsDumbProps {
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErros: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

function DetailsDumb(props: DetailsDumbProps) {
  const detailsClasses = useStylesOverviewDumb();
  const { t } = useTranslation();
  return (
    <div className={detailsClasses.fundal}>
      {/* <Grid container direction="row" justify="center" alignItems="center">
        {createTextField(
          detailsClasses.root,
          props.handleEnterKey,
          'title',
          t('accountDetails.firstName'),
          props.handleChange,
          props.event.title,
          props.formErrors.title,
          'string',
          null
        )}
      </Grid> */}
    </div>
  );
}

export default DetailsDumb;
