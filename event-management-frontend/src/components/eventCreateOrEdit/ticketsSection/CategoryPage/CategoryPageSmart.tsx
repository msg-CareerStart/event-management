import React, { useEffect } from 'react';
import { AppState } from '../../../../store/store';
import { connect } from 'react-redux';
import CategoryPageDumb from './CategoryPageDumb';
import { EventCrud } from '../../../../model/EventCrud';
import {
  addEmptyCategoryCard,
  updateEvent,
  updateFormErrors,
  removeDiscountCard,
} from '../../../../actions/HeaderEventCrudActions';
import { EventFormErrors } from '../../../../model/EventFormErrors';
import { useTranslation } from 'react-i18next';

type Props = {
  newEvent: boolean;
  event: EventCrud;
  formErrors: EventFormErrors;
  addEmptyCategoryCard: () => void;
  updateEvent: (event: EventCrud) => void;
  updateFormErrors: (errors: EventFormErrors) => void;
  removeDiscount: (id: number) => void;
};

const CategoryPageSmart: React.FC<Props> = ({
  newEvent,
  event,
  formErrors,
  addEmptyCategoryCard,
  updateEvent,
  updateFormErrors,
  removeDiscount,
}: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (newEvent === true) {
      addEmptyCategoryCard();
    }
  }, []);

  const handleChange = (e: { preventDefault: () => void; target: { name: string; value: any } }) => {
    e.preventDefault();
    const { name, value } = e.target;

    // update event
    let newEvent = Object.assign({}, event);

    switch (name) {
      case 'ticketsPerUser':
        newEvent.ticketsPerUser = parseInt(value);
        break;

      case 'ticketInfo':
        newEvent.ticketInfo = value;
        break;

      default:
        break;
    }
    updateEvent(newEvent);

    let newFormErrors = Object.assign({}, formErrors);

    switch (name) {
      case 'ticketsPerUser':
        newFormErrors.ticketsPerUser = value <= 0 ? t('categoryCard.ticketPerUserError') : '';
        break;

      case 'ticketInfo':
        newFormErrors.ticketInfo = value.length < 3 ? t('categoryCard.lengthError') : '';
        break;

      default:
        break;
    }

    updateFormErrors(newFormErrors);
  };

  return (
    <CategoryPageDumb
      newEvent={newEvent}
      event={event}
      formErrors={formErrors}
      addCard={addEmptyCategoryCard}
      handleChange={handleChange}
      removeDiscount={removeDiscount}
      updateEvent={updateEvent}
      updateFormErrors={updateFormErrors}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  event: state.eventCrud.event,
  formErrors: state.eventCrud.formErrors,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addEmptyCategoryCard: () => dispatch(addEmptyCategoryCard()),
    updateEvent: (event: EventCrud) => dispatch(updateEvent(event)),
    updateFormErrors: (errors: EventFormErrors) => dispatch(updateFormErrors(errors)),
    removeDiscount: (id: number) => dispatch(removeDiscountCard(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageSmart);
