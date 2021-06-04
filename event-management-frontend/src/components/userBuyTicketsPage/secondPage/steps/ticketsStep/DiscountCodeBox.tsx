import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { useDiscountBoxStyles } from '../../../../../styles/DiscountCodeBoxStyle';
import { useTranslation } from 'react-i18next';
import { checkDiscountCodeValidityAPI } from '../../../../../api/EventsServiceAPI';
import { connect } from 'react-redux';
import { loadAppliedDiscounts } from '../../../../../actions/DiscountForEventActions';
import { ReturnedDiscount } from '../../../../../reducers/DiscountsForEventReducer';
import { Dispatch } from 'redux';
import DiscountDialog from './DiscountDialog';

interface DiscountCodeBoxProps {
  categoryID: number;
  categoryTitle: string;
  ticketCategory: string;
  ticketNumber: number;
  available: boolean;
  loadAppliedDiscounts: (discount: ReturnedDiscount) => void;
}

function DiscountCodeBox(props: DiscountCodeBoxProps) {
  const ticketsPageStyle = userBuyTicketsStyle();
  const discountBoxStyle = useDiscountBoxStyles();
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [error, setError] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  function checkDiscountValidity(discountCode: string, categoryId: number): void {
    checkDiscountCodeValidityAPI(discountCode, categoryId).then((response) => {
      let discount: ReturnedDiscount = {
        CategoryId: categoryId,
        DiscountId: response.discountIDs[0],
        DiscountCode: response.discountCodes[0],
        percentage: response.percentages[0],
        CategoryTitle: props.categoryTitle,
      };
      if (response.discountIDs.length === 0) {
        setDialogTitle(t('discountCodeBox.discountErrorTitle'));
        setDialogDescription(t('discountCodeBox.discountErrorDescription'));
        setOpen(true);
        setError(true);
      } else {
        props.loadAppliedDiscounts(discount);
        setDialogTitle(t('discountCodeBox.discountAppliedTitle'));
        setDialogDescription(t('discountCodeBox.discountAppliedDescription'));
        setOpen(true);
        setError(false);
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
        <DiscountDialog
          open={open}
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
          closeDialog={closeDialog}
          error={error}
        ></DiscountDialog>
      </Grid>
    );
  } else return <Grid></Grid>;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadAppliedDiscounts: (discount: ReturnedDiscount) => dispatch(loadAppliedDiscounts(discount)),
  };
};

export default connect(null, mapDispatchToProps)(DiscountCodeBox);
