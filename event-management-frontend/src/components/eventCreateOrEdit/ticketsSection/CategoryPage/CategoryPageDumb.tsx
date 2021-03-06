import React from 'react';
import { useStylesCategoryPage } from '../../../../styles/CategoryPageStyle';
import { TextField, Button, Grid } from '@material-ui/core';
import CategoryCard from '../CategoryCard/CategoryCardSmart';
import '../../../../styles/Responsivity.css';
import { EventCrud } from '../../../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import { EventFormErrors } from '../../../../model/EventFormErrors';
import { useStyles } from '../../../../styles/CommonStyles';
import { CategoryCardItem } from '../../../../model/TicketType';
import { DiscountCardItem } from '../../../../model/DiscountType';
import DiscountCardDumb from '../DiscountCard/DiscountCardDumb';
import DiscoutCardSmart from '../DiscountCard/DiscountCardSmart';

type Props = {
  newEvent: boolean;
  event: EventCrud;
  handleChange: any;
  formErrors: EventFormErrors;
  addCard: () => void;
  removeDiscount: (id: number) => void;
  updateEvent: (event: EventCrud) => void;
  updateFormErrors: (errors: EventFormErrors) => void;
};

const CategoryPageDumb: React.FC<Props> = ({
  newEvent,
  event,
  addCard,
  handleChange,
  formErrors,
  removeDiscount,
  updateEvent,
  updateFormErrors,
}: Props) => {
  const classes = useStylesCategoryPage();
  const classes2 = useStyles();
  const { t } = useTranslation();
  const addNewCard = () => {
    addCard();
  };

  return (
    <div>
      <Grid className={classes.gridStyleHeader} container spacing={1}>
        <Grid container item xl={2} lg={2} md={2} sm={9} xs={10}>
          <TextField
            required
            name="ticketsPerUser"
            className={classes.maxTickets}
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            variant="outlined"
            label={t('categoryCard.maxTicketPerUser')}
            error={formErrors.ticketsPerUser.length > 0}
            helperText={formErrors.ticketsPerUser}
            defaultValue={event.ticketsPerUser}
            onChange={handleChange}
          />
        </Grid>

        <Grid container item xl={5} lg={5} md={5} sm={9} xs={10}>
          <TextField
            required
            className={classes.ticketInfoStyle}
            InputLabelProps={{
              shrink: true,
            }}
            name="ticketInfo"
            multiline
            rows="3"
            fullWidth
            rowsMax="4"
            variant="outlined"
            label={t('categoryCard.ticketInfo')}
            disabled={!newEvent}
            defaultValue={event.ticketInfo}
            onChange={handleChange}
            error={formErrors.ticketInfo.length > 0}
            helperText={formErrors.ticketInfo}
          />
        </Grid>

        <Grid container item xl={2} lg={2} md={3} sm={8} xs={10}>
          <Button
            className={`${classes.button} ${classes2.mainButtonStyle} ${classes2.pinkGradientButtonStyle} addButtonResponsive`}
            onClick={addNewCard}
          >
            {t('categoryCard.addCategory')}
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid className={classes.gridStyle} container spacing={4}>
        {event.ticketCategoryDtoList.map((category: CategoryCardItem) => (
          <Grid container item xl={6} lg={6} md={7} sm={12} xs={12} key={category.id} direction="column" spacing={1}>
            <Grid item>
              <CategoryCard
                id={category.id}
                title={category.title}
                subtitle={category.subtitle}
                price={category.price}
                description={category.description}
                ticketsPerCategory={category.ticketsPerCategory}
                available={category.available}
              />
            </Grid>
            <Grid item container direction="column" spacing={1}>
              {category.discountDtoList.map((discount: DiscountCardItem) => (
                <Grid item key={discount.id}>
                  <DiscoutCardSmart
                    available={category.available}
                    discountId={discount.id}
                    categoryId={category.id}
                    removeDiscount={removeDiscount}
                    event={event}
                    updateEvent={updateEvent}
                    code={discount.code}
                    percentage={discount.percentage}
                    startDate={discount.startDate}
                    endDate={discount.endDate}
                    updateFormErrors={updateFormErrors}
                    formErrors={formErrors}
                  ></DiscoutCardSmart>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryPageDumb;
