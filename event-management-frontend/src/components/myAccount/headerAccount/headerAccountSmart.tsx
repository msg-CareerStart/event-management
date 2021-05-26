import React from 'react';
import HeaderAccDumb from './headerAccountDumb';

let saveInfo = (): void => {};

function HeaderAccSmart() {
  return <HeaderAccDumb isAdmin={true} />;
}

export default HeaderAccSmart;
