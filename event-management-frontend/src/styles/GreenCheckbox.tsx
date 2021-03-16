import { withStyles, CheckboxProps, Checkbox } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React from "react";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
export default GreenCheckbox;
