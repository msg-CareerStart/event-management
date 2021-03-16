import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homePage/Home';
import EventList from './eventListPage/listSection/EventListSmart';
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { SecureRoute } from './SecureRoute';
import ValidateTicket from './validateTicket/ValidateTicketSmart';

const Main = () => {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <SecureRoute
            admin
            exact
            path="/admin/events/:id"
            component={(props: any) => <EventDetails match={props.match} isAdmin={true} />}
          />
          <Route
            exact
            path="/admin/validate/:id"
            component={(props: any) => <ValidateTicket match={props.match} newEvent={true} isAdmin={true} />}
          />
          <SecureRoute admin exact path="/admin/events" component={EventList} />
          <SecureRoute
            admin
            exact
            path="/admin/newEvent"
            component={(props: any) => <EventDetails match={props.match} isAdmin={true} />}
          />
          <SecureRoute admin exact path="/admin" component={Home} />
        </Switch>
      </main>
    </>
  );
};

export default Main;
