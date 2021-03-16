import React, { useState } from 'react';
import { AppState } from '../../../../store/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CategoryCardDumb from './CategoryCardDumb';
import { EventCrud } from '../../../../model/EventCrud';
import { updateEvent, removeCategoryCard, updateFormErrors } from '../../../../actions/HeaderEventCrudActions';
import { EventFormErrors } from '../../../../model/EventFormErrors';
import { TicketAvailabilityData } from '../../../../model/TicketAvailabilityData';
import { useTranslation } from 'react-i18next';
import TicketDialog from '../TicketDialog';

type Props = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  ticketsPerCategory: number;
  available: boolean;

  ticketData: TicketAvailabilityData[];
  event: EventCrud;
  formErrors: EventFormErrors;
  removeCard: (id: number) => void;
  updateEvent: (event: EventCrud) => void;
  updateFormErrors: (errors: EventFormErrors) => void;
};

const CategoryCardSmart: React.FC<Props> = ({
  id,
  title,
  subtitle,
  price,
  description,
  ticketsPerCategory,
  available,
  ticketData,
  event,
  formErrors,
  removeCard,
  updateEvent,
  updateFormErrors,
}: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [disableMessage, setDisableMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');

  let categoryData = ticketData.filter((data) => data.title === title)[0];

  const removeThisCard = () => {
    if (categoryData && categoryData.sold !== 0) {
      setDisableMessage('Disable');
      setDialogTitle(t('categoryCard.removeTitle'));
      setDialogDescription(t('categoryCard.removePurchased'));
      setOpen(true);
    } else if (
      title.trim() !== '' ||
      subtitle.trim() !== '' ||
      price !== 0 ||
      description.trim() !== '' ||
      ticketsPerCategory !== 0
    ) {
      setDisableMessage('');
      setDialogTitle(t('categoryCard.removeTitle'));
      setDialogDescription(t('categoryCard.removeEmpty'));
      setOpen(true);
    } else {
      removalApproved();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removalApproved = () => {
    removeCard(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    // update event
    let newEvent = Object.assign({}, event);

    switch (name) {
      case 'title':
        newEvent.ticketCategoryDtoList.filter((data) => data.id === id)[0].title = value;
        break;

      case 'subtitle':
        newEvent.ticketCategoryDtoList.filter((data) => data.id === id)[0].subtitle = value;
        break;

      case 'description':
        newEvent.ticketCategoryDtoList.filter((data) => data.id === id)[0].description = value;
        break;

      case 'price':
        newEvent.ticketCategoryDtoList.filter((data) => data.id === id)[0].price = parseInt(value);
        break;

      case 'ticketsPerCategory':
        newEvent.ticketCategoryDtoList.filter((data) => data.id === id)[0].ticketsPerCategory = parseInt(value);
        break;

      case 'available':
        newEvent.ticketCategoryDtoList.filter((data) => data.id === id)[0].available = e.target.checked;
        break;

      default:
        break;
    }
    updateEvent(newEvent);

    let newFormErrors = Object.assign({}, formErrors);
    let index = event.ticketCategoryDtoList.findIndex((card) => card.id === id);

    switch (name) {
      case 'title':
        newFormErrors.ticketCategoryDtoList[index].title = value.length < 3 ? t('categoryCard.lengthError') : '';
        break;

      case 'subtitle':
        break;

      case 'description':
        newFormErrors.ticketCategoryDtoList[index].description = value.length < 3 ? t('categoryCard.lengthError') : '';
        break;

      case 'price':
        newFormErrors.ticketCategoryDtoList[index].price = Number(value) < 0 ? t('categoryCard.priceError') : '';
        break;

      case 'ticketsPerCategory':
        let nrOfMaxPeople = event.maxPeople;
        let ticketsToSell = 0;
        for (let fields of event.ticketCategoryDtoList) {
          ticketsToSell += Number(fields.ticketsPerCategory);
        }
        if (ticketsToSell > nrOfMaxPeople) {
          newFormErrors.ticketCategoryDtoList[index].ticketsPerCategory = t(
            'categoryCard.ticketsPerCategoryExceedsError'
          );
          break;
        }

        let categoryData = ticketData.filter((data) => data.title === title)[0];

        if (categoryData && categoryData.sold >= parseInt(value) && parseInt(value) > 0) {
          newFormErrors.ticketCategoryDtoList[index].ticketsPerCategory =
            categoryData.sold + ' ' + t('categoryCard.ticketsPerCategoryAlreadySoldError');
        } else {
          newFormErrors.ticketCategoryDtoList[index].ticketsPerCategory =
            Number(value) <= 0 ? t('categoryCard.ticketsPerCategoryTooSmallError') : '';
        }
        break;

      default:
        break;
    }

    updateFormErrors(newFormErrors);
  };

  return (
    <div>
      <CategoryCardDumb
        event={event}
        id={id}
        title={title}
        subtitle={subtitle}
        price={price}
        description={description}
        ticketsPerCategory={ticketsPerCategory}
        available={available}
        formErrors={formErrors}
        removeThisCard={removeThisCard}
        handleChange={handleChange}
      />
      <TicketDialog
        open={open}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
        disableMessage={disableMessage}
        removalApproved={removalApproved}
        handleClose={handleClose}
      />
    </div>
  );
};

const mapStateToProps = (
  state: AppState,
  ownProps: {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    description: string;
    ticketsPerCategory: number;
  }
) => ({
  ticketData: state.eventCrud.ticketData,
  formErrors: state.eventCrud.formErrors,
  event: state.eventCrud.event,
  id: ownProps.id,
  title: ownProps.title,
  subtitle: ownProps.subtitle,
  price: ownProps.price,
  description: ownProps.description,
  ticketsPerCategory: ownProps.ticketsPerCategory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCard: (id: number) => dispatch(removeCategoryCard(id)),
  updateEvent: (event: EventCrud) => dispatch(updateEvent(event)),
  updateFormErrors: (errors: EventFormErrors) => dispatch(updateFormErrors(errors)),
});

const CategoryCard = connect(mapStateToProps, mapDispatchToProps)(CategoryCardSmart);

export default CategoryCard;
