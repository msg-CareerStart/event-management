import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  FormHelperText,
  Grid,
  FormControlLabel,
  withStyles,
  Checkbox,
  CheckboxProps,
} from '@material-ui/core';
import { useStylesCategoryCard } from '../../../../styles/CategoryCardStyle';
import React from 'react';
import '../../../../styles/Responsivity.css';
import { EventCrud } from '../../../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import { CategoryCardErrors } from '../../../../model/EventFormErrors';

type Props = {
  event: EventCrud;
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  ticketsPerCategory: number;
  available: boolean;
  handleChange: any;
  formErrors: {
    ticketCategoryDtoList: CategoryCardErrors[];
  };
  removeThisCard: () => void;
};

const YellowCheckbox = withStyles({
  root: {
    color: '#f9c929',
    '&$checked': {
      color: '#f2ac0a',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CategoryCardDumb: React.FC<Props> = ({
  event,
  id,
  title,
  subtitle,
  price,
  description,
  ticketsPerCategory,
  available,
  handleChange,
  formErrors,
  removeThisCard,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStylesCategoryCard();
  let index = event.ticketCategoryDtoList.findIndex((card) => card.id === id);

  return (
    <div>
      <Grid item xl={12} lg={12} md={10} sm={11} xs={12}>
        <Card variant="outlined" className={classes.root}>
          <CardContent className={classes.cardStyle}>
            <Grid item xl={4} sm={7} xs={10}>
              <TextField
                required
                className={classes.marginBasic}
                InputProps={{
                  className: classes.inputBasic,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="title"
                fullWidth
                variant="outlined"
                label={t('categoryCard.title')}
                error={formErrors.ticketCategoryDtoList[index].title.length > 0}
                helperText={formErrors.ticketCategoryDtoList[index].title}
                defaultValue={title}
                disabled={id >= 0 ? true : false || !available}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xl={4} sm={7} xs={10}>
              <TextField
                variant="outlined"
                className={classes.marginBasic}
                InputProps={{
                  className: classes.inputBasic,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="subtitle"
                label={t('categoryCard.subtitle')}
                defaultValue={subtitle}
                disabled={id >= 0 ? true : false || !available}
                onChange={handleChange}
                error={formErrors.ticketCategoryDtoList[index].subtitle.length > 0}
                helperText={formErrors.ticketCategoryDtoList[index].subtitle}
              />
            </Grid>

            <Grid item xl={4} lg={5} sm={7} xs={10}>
              <FormControl className={classes.marginShort} variant="outlined" required>
                <InputLabel>{t('categoryCard.price')}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  defaultValue={price}
                  onChange={handleChange}
                  name="price"
                  type="number"
                  disabled={id >= 0 ? true : false || !available}
                  endAdornment={<InputAdornment position="end">RON</InputAdornment>}
                  inputProps={{ className: classes.inputPrice }}
                  labelWidth={50}
                  error={formErrors.ticketCategoryDtoList[index].price.length > 0}
                />
                <FormHelperText>{formErrors.ticketCategoryDtoList[index].price}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xl={8} lg={11} md={11} sm={10} xs={10}>
              <TextField
                required
                className={classes.marginBasic}
                InputProps={{
                  className: classes.inputLong,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="description"
                multiline
                rows="3"
                fullWidth
                rowsMax="4"
                disabled={id >= 0 ? true : false || !available}
                variant="outlined"
                label={t('categoryCard.description')}
                defaultValue={description}
                onChange={handleChange}
                error={formErrors.ticketCategoryDtoList[index].description.length > 0}
                helperText={formErrors.ticketCategoryDtoList[index].description}
              />
            </Grid>

            <Grid item container spacing={1}>
              <Grid item lg={5} sm={7} xs={10}>
                <TextField
                  required
                  className={classes.marginShortTicketNr}
                  InputProps={{
                    className: classes.inputBasic,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="ticketsPerCategory"
                  variant="outlined"
                  label={t('categoryCard.nrOfTickets')}
                  type="number"
                  disabled={!available}
                  defaultValue={ticketsPerCategory === 0 ? '' : ticketsPerCategory}
                  onChange={handleChange}
                  error={formErrors.ticketCategoryDtoList[index].ticketsPerCategory.length > 0}
                  helperText={formErrors.ticketCategoryDtoList[index].ticketsPerCategory}
                />
              </Grid>

              <Grid item lg={3} md={7} sm={7} xs={6}>
                <FormControlLabel
                  className={classes.availableStyle}
                  control={<YellowCheckbox checked={available} onChange={handleChange} name="available" />}
                  label={t('categoryCard.available')}
                />
              </Grid>

              <Grid item lg={2} md={3} sm={3} xs={3}>
                <Button disabled={!available} className={classes.removeButton} onClick={removeThisCard} size="small">
                  {t('categoryCard.remove')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CategoryCardDumb;
