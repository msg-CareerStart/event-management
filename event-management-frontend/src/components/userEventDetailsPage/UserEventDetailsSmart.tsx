import React, { useEffect } from 'react';
import { EventCrud } from '../../model/EventCrud';
import { EventImage } from '../../model/EventImage';
import { connect } from 'react-redux';
import UserEventDetailsDumb from './UserEventDetailsDumb';
import { Container, CircularProgress } from '@material-ui/core';
import { loadEventWithLocations } from '../../actions/UserEventDetailsActions';
import { Dispatch } from 'redux';
import { AppState } from '../../store/store';

interface UserEventDetailsProps {
  match: any;
  fetchData: (id: string) => void;
  loading: boolean;
  event: EventCrud;
  images: EventImage[];
  locationAddress: string;
  locationName: string;
}

function UserEventDetailsSmart({
  match,
  fetchData,
  loading,
  event,
  images,
  locationAddress,
  locationName,
}: UserEventDetailsProps) {

  useEffect(() => {
    fetchData(match.params.id);
  }, [match.params.id, fetchData]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <UserEventDetailsDumb event={event} images={images} locationAddress={locationAddress} locationName={locationName} />
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    event: state.eventWithLocation.event,
    loading: state.eventWithLocation.isLoading,
    images: state.eventWithLocation.images,
    locationAddress: state.eventWithLocation.locationAddress,
    locationName: state.eventWithLocation.locationName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchData: (id: string) => dispatch(loadEventWithLocations(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventDetailsSmart);
