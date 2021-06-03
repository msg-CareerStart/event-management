import { makeStyles } from '@material-ui/core';

export const tableStyle = makeStyles((theme) => ({
  root: {
    border: '1px',
    borderColor: '#d3d3d3',
    borderStyle: 'solid',
  },
  thStyle: {
    borderBottomWidth: '1px',
    borderBottomColor: '#d3d3d3',
    borderBottomStyle: 'solid',
  },
  tdStyle: {
    border: '1px',
    borderColor: '#d3d3d3',
    borderStyle: 'solid',
  },
  rightBorder: {
    borderRightWidth: '1px',
    borderRightColor: '#d3d3d3',
    borderRightStyle: 'solid',
  },
  table: {
    tableLayout: 'fixed',
  },
}));
