import React from "react";
import useStylesSuccess from "../../styles/FormSuccessStyle";
import { Alert } from "@material-ui/lab";

interface SuccessMessageProps {
  success: string;
}
export const SuccessMessage = (props: SuccessMessageProps) => {
  const classes = useStylesSuccess();

  return props.success ? (
    <Alert severity="success" className={classes.success}>
      {props.success}
    </Alert>
  ) : null;
};
