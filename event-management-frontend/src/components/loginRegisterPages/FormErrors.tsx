import React from 'react';
import useStylesError from '../../styles/FormErrorsStyle';
import { Alert } from '@material-ui/lab';

interface FromErrorProps {
  error: string;
}
export const FormErrors = (props: FromErrorProps) => {
  const classes = useStylesError();

  return (
    <Alert severity="error" className={classes.error}>
      Error: {props.error}
    </Alert>
  );
};
