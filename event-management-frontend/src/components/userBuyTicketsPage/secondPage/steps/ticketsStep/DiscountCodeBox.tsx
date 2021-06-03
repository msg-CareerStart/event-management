import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { useDiscountBoxStyles } from '../../../../../styles/DiscountCodeBoxStyle';

interface DiscountCodeBoxProps {
  ticketCategory: string;
  ticketNumber: number;
  available: boolean;
}

export default function DiscountCodeBox(props: DiscountCodeBoxProps) {
  const ticketsPageStyle = userBuyTicketsStyle();
  const discountBoxStyle = useDiscountBoxStyles();
  if (props.ticketNumber > 0 && props.available) {
    return (
      <Grid>
        <TextField
          className={ticketsPageStyle.position}
          type="text"
          name={props.ticketCategory + 'disc_code'}
          label={props.ticketCategory + ' discount code'}
          variant="outlined"
        />
        <Button variant="contained" title="Apply discount code" className={discountBoxStyle.button}>
          Apply
        </Button>
      </Grid>
    );
  } else return <Grid></Grid>;
}
