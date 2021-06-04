import React from 'react';
import { EventCrud } from '../../../../model/EventCrud';
import DiscountCardDumb from './DiscountCardDumb';
import { useTranslation } from 'react-i18next';
import { EventFormErrors } from '../../../../model/EventFormErrors';

type Props = {
  available: boolean;
  removeDiscount: (id: number) => void;
  categoryId: number;
  discountId: number;
  event: EventCrud;
  updateEvent: (event: EventCrud) => void;
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
  updateFormErrors: (erros: EventFormErrors) => void;
  formErrors: EventFormErrors;
};

const DiscountCardSmart: React.FC<Props> = ({
  available,
  removeDiscount,
  discountId,
  event,
  categoryId,
  updateEvent,
  code,
  percentage,
  startDate,
  endDate,
  updateFormErrors,
  formErrors,
}: Props) => {
  const { t } = useTranslation();
  let categoryIndex = event.ticketCategoryDtoList.findIndex((card) => card.id === categoryId);
  let discountIndex = event.ticketCategoryDtoList[categoryIndex].discountDtoList.findIndex(
    (card) => card.id === discountId
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    let newEvent = Object.assign({}, event);
    switch (name) {
      case 'code':
        newEvent.ticketCategoryDtoList
          .filter((data) => data.id === categoryId)[0]
          .discountDtoList.filter((data) => data.id === discountId)[0].code = value;
        break;

      case 'percentage':
        newEvent.ticketCategoryDtoList
          .filter((data) => data.id === categoryId)[0]
          .discountDtoList.filter((data) => data.id === discountId)[0].percentage = parseInt(value);
        break;

      case 'startDate':
        newEvent.ticketCategoryDtoList
          .filter((data) => data.id === categoryId)[0]
          .discountDtoList.filter((data) => data.id === discountId)[0].startDate = value;
        break;

      case 'endDate':
        newEvent.ticketCategoryDtoList
          .filter((data) => data.id === categoryId)[0]
          .discountDtoList.filter((data) => data.id === discountId)[0].endDate = value;
        break;
    }
    updateEvent(newEvent);

    let newFormErrors = Object.assign({}, formErrors);
    switch (name) {
      case 'code':
        newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].code =
          value.length <= 2 ? t('discountCard.codeError') : '';
        break;
      case 'percentage':
        if (parseInt(value) < 1 || parseInt(value) > 99) {
          newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].percentage =
            t('discountCard.percentageError');
        } else {
          newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].percentage = '';
        }
        break;
      case 'startDate':
      case 'endDate':
        let startDate = new Date(event.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].startDate);
        let endDate = new Date(event.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].endDate);
        if (endDate < startDate) {
          newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].startDate =
            t('discountCard.dateOrderError');
          newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].endDate =
            t('discountCard.dateOrderError');
        } else {
          newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].startDate = '';
          newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].endDate = '';
          event.ticketCategoryDtoList[categoryIndex].discountDtoList.forEach((discount) => {
            if (discount.id !== discountId) {
              let discountStartDate = new Date(discount.startDate);
              let discountEndDate = new Date(discount.endDate);
              discountEndDate.setDate(discountEndDate.getDate() + 1);
              discountStartDate.setDate(discountStartDate.getDate() - 1);
              if (discountStartDate < endDate && discountEndDate > startDate) {
                newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].startDate = t(
                  'discountCard.discountOverlapError'
                );
                newFormErrors.ticketCategoryDtoList[categoryIndex].discountDtoList[discountIndex].endDate = t(
                  'discountCard.discountOverlapError'
                );
              }
            }
          });
        }
      default:
        break;
    }
    updateFormErrors(newFormErrors);
  };

  return (
    <div>
      <DiscountCardDumb
        available={available}
        event={event}
        removeDiscount={removeDiscount}
        discountId={discountId}
        categoryId={categoryId}
        handleChange={handleChange}
        code={code}
        percentage={percentage}
        startDate={startDate}
        endDate={endDate}
        formErrors={formErrors}
      ></DiscountCardDumb>
    </div>
  );
};

export default DiscountCardSmart;
