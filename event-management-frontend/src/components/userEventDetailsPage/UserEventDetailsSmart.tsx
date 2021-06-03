import React, { useEffect } from 'react';
import { EventCrud } from '../../model/EventCrud';
import { EventImage } from '../../model/EventImage';
import { connect } from 'react-redux';
import UserEventDetailsDumb from './UserEventDetailsDumb';
import { Container, CircularProgress } from '@material-ui/core';
import { loadEventWithLocations } from '../../actions/UserEventDetailsActions';
import { Dispatch } from 'redux';
import { AppState } from '../../store/store';
import { loadDiscountsForEvent } from '../../actions/DiscountForEventActions';
import { DiscountsForEvent } from '../../model/DiscountsForEvent';
import { DiscountsForEventState } from '../../reducers/DiscountsForEventReducer';

interface UserEventDetailsProps {
  match: any;
  fetchData: (id: string) => void;
  fetchDiscounts: (id: number) => void;
  discountState: DiscountsForEventState;
  loading: boolean;
  event: EventCrud;
  images: EventImage[];
  locationAddress: string;
  locationName: string;
}

function UserEventDetailsSmart({
  match,
  fetchData,
  fetchDiscounts,
  discountState,
  loading,
  event,
  images,
  locationAddress,
  locationName,
}: UserEventDetailsProps) {
  useEffect(() => {
    fetchDiscounts(match.params.id);
    fetchData(match.params.id);
  }, [match.params.id, fetchData]);

  return (
    <div>
      {discountState.isLoading && loading ? (
        <CircularProgress />
      ) : (
        <UserEventDetailsDumb
          event={event}
          images={images}
          locationAddress={locationAddress}
          locationName={locationName}
          discounts={discountState.discounts}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    event: state.eventWithLocation.event,
    loading: state.eventWithLocation.isLoading,
    images: state.eventWithLocation.images,
    locationAddress: state.eventWithLocation.locationAddress,
    locationName: state.eventWithLocation.locationName,
    discountState: state.discounts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchData: (id: string) => dispatch(loadEventWithLocations(id)),
    fetchDiscounts: (id: number) => dispatch(loadDiscountsForEvent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventDetailsSmart);
