import React from 'react';
import { Container } from '@material-ui/core';
import UserEventListSmart from './listSection/UserEventListSmart';
import UserEventsListFilterSmart from './filterSection/UserEventsListFilterSmart';

function UserEventsPage() {
  return (
    <Container>
      <UserEventsListFilterSmart />
      <UserEventListSmart />
    </Container>
  );
}

export default UserEventsPage;
