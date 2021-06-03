import {
  Button,
  TextField,
  OutlinedInput,
  Grid,
  Card,
  CardContent,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EventCrud } from '../../../../model/EventCrud';
import { EventFormErrors } from '../../../../model/EventFormErrors';
import { useStylesDiscountCard } from '../../../../styles/DiscountCardStyle';

type Props = {
  available: boolean;
  event: EventCrud;
  removeDiscount: (id: number) => void;
  discountId: number;
  categoryId: number;
  handleChange: any;
  formErrors: EventFormErrors;
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
};

const DiscountCardDumb = ({
  available,
  event,
  removeDiscount,
  discountId,
  categoryId,
  handleChange,
  formErrors,
  code,
  percentage,
  startDate,
  endDate,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStylesDiscountCard();
  let categoryIndex = event.ticketCategoryDtoList.findIndex((card) => card.id === categoryId);
  let discountIndex = event.ticketCategoryDtoList[categoryIndex].discountDtoList.findIndex(
    (card) => card.id === discountId
  );

  return (
    <Grid item xl={12} lg={12} md={10} sm={11} xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Grid item container justify="space-between">
            <Grid item xl={10} sm={10} xs={10}>
              <TextField
                required
                className={classes.marginBasic}
                InputProps={{
                  className: classes.inputBasic,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="code"
                fullWidth
                variant="outlined"
                label={t('discountCard.code')}
                error={formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].code.length > 0}
                helperText={formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].code}
                defaultValue={code}
                onChange={handleChange}
                disabled={discountId >= 0 ? true : false || !available}
              ></TextField>
            </Grid>
            <Grid item xl={1} sm={1} xs={1}>
              <IconButton disabled={!available} onClick={() => removeDiscount(discountId)} size="small">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item xl={12} sm={12} xs={12}>
            <FormControl className={classes.marginShort} variant="outlined" required>
              <InputLabel>{t('discountCard.percentage')}</InputLabel>
              <OutlinedInput
                type="number"
                name="percentage"
                onChange={handleChange}
                defaultValue={percentage.toString()}
                disabled={!available}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                inputProps={{ className: classes.inputPrice }}
                labelWidth={50}
                error={
                  formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].percentage.length > 0
                }
              ></OutlinedInput>
              <FormHelperText>
                {formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].percentage}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item container justify="space-evenly">
            <Grid item xl={4} lg={6} md={7} sm={9} xs={12}>
              <form autoComplete="off">
                <TextField
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  className={classes.date}
                  label={t('discountCard.startDate')}
                  defaultValue={startDate}
                  error={
                    formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].startDate.length > 0
                  }
                  helperText={formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].startDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={discountId >= 0 ? true : false || !available}
                ></TextField>
              </form>
            </Grid>

            <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
              <form autoComplete="off">
                <TextField
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  className={classes.date}
                  label={t('discountCard.endDate')}
                  defaultValue={endDate}
                  error={
                    formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].endDate.length > 0
                  }
                  helperText={formErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={discountId >= 0 ? true : false || !available}
                ></TextField>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DiscountCardDumb;
