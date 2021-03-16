import { withStyles, Checkbox } from '@material-ui/core';

export const YellowCheckbox = withStyles({
  root: {
    color: '#f2ac0a',
    '&$checked': {
      color: '#f2ac0a',
    },
  },
  checked: {},
})(Checkbox);
