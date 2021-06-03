import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { useDiscountBoxStyles } from '../../../../../styles/DiscountCodeBoxStyle';
import { useTranslation } from 'react-i18next';
import { checkDiscountCodeValidityAPI } from '../../../../../api/EventsServiceAPI';
import { connect } from 'react-redux';
import { loadAppliedDiscounts } from '../../../../../actions/DiscountForEventActions';
import { pair } from '../../../../../reducers/DiscountsForEventReducer';
import { Dispatch } from 'redux';

interface DiscountCodeBoxProps {
  categoryID: number;
  ticketCategory: string;
  ticketNumber: number;
  available: boolean;
  loadAppliedDiscounts: (discount: pair) => void;
}

function DiscountCodeBox(props: DiscountCodeBoxProps) {
  const ticketsPageStyle = userBuyTicketsStyle();
  const discountBoxStyle = useDiscountBoxStyles();
  const { t } = useTranslation();
  const [code, setCode] = useState('');

  function checkDiscountValidity(discountCode: string, categoryId: number): void {
    checkDiscountCodeValidityAPI(discountCode, categoryId).then((response) => {
      let discount: pair = { key: categoryId, value: response.discountIDs[0] };
      if (response.discountIDs.length === 0) console.log('discount code not valid');
      else {
        console.log('checkDiscountValidity');
        props.loadAppliedDiscounts(discount);
      }
    });
  }

  function updateDiscountCode(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value);
  }

  if (props.ticketNumber > 0 && props.available) {
    return (
      <Grid>
        <TextField
          className={ticketsPageStyle.position}
          type="text"
          name={'disc_code'}
          label={props.ticketCategory + ' ' + t('discountCodeBox.label')}
          variant="outlined"
          onChange={updateDiscountCode}
        />
        <Button
          variant="contained"
          title={t('discountCodeBox.tooltip')}
          className={discountBoxStyle.button}
          onClick={() => checkDiscountValidity(code, props.categoryID)}
        >
          {t('discountCodeBox.applyButton')}
        </Button>
      </Grid>
    );
  } else return <Grid></Grid>;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadAppliedDiscounts: (discount: pair) => dispatch(loadAppliedDiscounts(discount)),
  };
};

export default connect(null, mapDispatchToProps)(DiscountCodeBox);
