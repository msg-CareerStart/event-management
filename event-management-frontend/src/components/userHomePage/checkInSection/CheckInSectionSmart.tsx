import React, { useEffect } from 'react';
import CheckInSectionDumb from './CheckInSectionDumb';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchBookings } from '../../../actions/UserHomePageActions';
import { Booking } from '../../../model/userHome/Booking';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface UserHomePageProps {
  bookings: Booking[];
  isError: boolean;
  isLoading: boolean;
  fetchBookings: () => void;
}

function CheckInSectionSmart({ bookings, isError, isLoading, fetchBookings }: UserHomePageProps) {
  const [translation] = useTranslation();
  const history = useHistory();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleOnClick = () => {
    history.push('/user/tickets');
  };

  return (
    <CheckInSectionDumb
      bookings={bookings}
      isLoading={isLoading}
      isError={isError}
      translation={translation}
      handleOnClick={handleOnClick}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  bookings: state.userHome.bookings.bookings,
  isError: state.userHome.bookings.isError,
  isLoading: state.userHome.bookings.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBookings: () => dispatch(fetchBookings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckInSectionSmart);
