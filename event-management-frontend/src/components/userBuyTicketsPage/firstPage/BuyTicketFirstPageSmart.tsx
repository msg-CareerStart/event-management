import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { EventReserveTicketType } from '../../../model/EventReserveTicketType';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  reserveEventisLoading,
  reserveEventFetchSucces,
  reserveEventFetch,
  updateRadioButton,
} from '../../../actions/ReserveTicketsActions';
import BuyTicketFirstPageDumb from './BuyTicketFirstPageDumb';

interface Props {
  eventReserve: EventReserveTicketType;
  isLoading: boolean;
  reserveEventisLoading: (loadingStatus: boolean) => void;
  reserveEventFetchSucces: (eventReserve: EventReserveTicketType) => void;
  matching: RouteComponentProps<any>;
  reserveEventFetch: (id: number) => void;
  error: boolean;
  radioButtonState: string;
  updateRadioButton: (radioButtonState: string) => void;
}

interface OwnProps {
  matching: RouteComponentProps<any>;
}

const BuyTicketFirstPageSmart: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.reserveEventFetch(props.matching.match.params.id);
    props.reserveEventisLoading(false);
    updateRadioButton(props.radioButtonState);
  }, []);

  const handleChangeRadioButtonState = (value: string) => {
    props.updateRadioButton(value);
  };

  return (
    <div>
      <BuyTicketFirstPageDumb
        event={props.eventReserve}
        isError={props.error}
        isLoading={props.isLoading}
        radioButtonState={props.radioButtonState}
        handleChangeRadioButtonState={handleChangeRadioButtonState}
        matching={props.matching}
      ></BuyTicketFirstPageDumb>
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  eventReserve: state.reserveTicket.event,
  isLoading: state.reserveTicket.isLoading,
  error: state.reserveTicket.isError,
  matching: ownProps.matching,
  radioButtonState: state.reserveTicket.radioButtonState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reserveEventFetchSucces: (eventReserve: EventReserveTicketType) => dispatch(reserveEventFetchSucces(eventReserve)),
  reserveEventisLoading: (loadingStatus: boolean) => dispatch(reserveEventisLoading(loadingStatus)),
  reserveEventFetch: (id: number) => dispatch(reserveEventFetch(id)),
  updateRadioButton: (radioButtonState: string) => dispatch(updateRadioButton(radioButtonState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketFirstPageSmart);
