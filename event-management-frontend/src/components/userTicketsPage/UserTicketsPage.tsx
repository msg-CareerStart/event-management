import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import TicketListSmart from './listSection/TicketListSmart';
import UserTicketsFilterSmart from './filterSection/UserTicketsFilterSmart';

function UserTicketsPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      <UserTicketsFilterSmart expanded={expanded} setExpanded={setExpanded} />
      <TicketListSmart />
    </Container>
  );
}

export default UserTicketsPage;
