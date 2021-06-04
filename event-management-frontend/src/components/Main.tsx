import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homePage/Home';
import EventList from './eventListPage/listSection/EventListSmart';
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { SecureRoute } from './SecureRoute';
import ValidateTicket from './validateTicket/ValidateTicketSmart';
import MyAccount from './myAccount/MyAccount';
import StatisticsPageSmart from './statisticsPage/StatisticsPageSmart';

const Main = () => {
  console.log('........');
  console.log(localStorage);
  return (
    <>
      <Header isAdmin={true} />
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
          {/* component={MyAccount} */}
          <SecureRoute admin exact path="/admin" component={Home} />
          <SecureRoute
            admin
            exact
            path="/admin/account"
            component={(props: any) => (
              <MyAccount match={props.match} isAdmin={true} isRequest={false} isError={false} />
            )}
          />
          <SecureRoute admin exact path="/admin/statistics" component={StatisticsPageSmart} />
        </Switch>
      </main>
    </>
  );
};

export default Main;
