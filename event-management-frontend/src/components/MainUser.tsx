import React from 'react';
import { Switch } from 'react-router-dom';
import UserHomePage from './userHomePage/UserHomePage';
import Header from './header/Header';
import UserTicketsPage from './userTicketsPage/UserTicketsPage';
import UserEventsPage from './userEventListPage/UserEventsPage';
import UserEventDetailsSmart from './userEventDetailsPage/UserEventDetailsSmart';
import { SecureRoute } from './SecureRoute';
import BuyTicketFirstPageSmart from './userBuyTicketsPage/firstPage/BuyTicketFirstPageSmart';
import BuyTicketsSecondPageSmart from './userBuyTicketsPage/secondPage/BuyTicketsSecondPageSmart';

const MainUser = () => {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <SecureRoute
            exact
            path="/user/events/:id"
            component={(props: any) => <UserEventDetailsSmart match={props.match} />}
          />
          <SecureRoute exact path="/user/tickets" component={UserTicketsPage} />
          <SecureRoute exact path="/user/events" component={UserEventsPage} />
          <SecureRoute exact path="/user" component={UserHomePage} />
          <SecureRoute
            exact
            path="/user/reserve-tickets/first-page/:id"
            component={(renderProps: any) => <BuyTicketFirstPageSmart matching={renderProps}></BuyTicketFirstPageSmart>}
          />
          <SecureRoute
            exact
            path="/user/reserve-tickets/second-page/:id"
            component={(props: any) => <BuyTicketsSecondPageSmart match={props.match} />}
          />
        </Switch>
      </main>
    </>
  );
};

export default MainUser;
