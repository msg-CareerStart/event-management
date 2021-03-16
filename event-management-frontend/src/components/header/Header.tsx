import React from 'react';
import { AppBar, Avatar, Toolbar } from '@material-ui/core';
import AppBarCollapse from './AppBarCollapse';
import RO from '../../languageImages/RO.png';
import EN from '../../languageImages/EN.png';
import { useTranslation } from 'react-i18next';
import { useStylesHeader } from '../../styles/HeaderStyle';
import AccountAppBarCollapse from './AccountAppBarCollapse';

// The Header creates links that can be used to navigate between routes.
const Header = () => {
  const [, i18n] = useTranslation();
  const classes = useStylesHeader();

  const handleChangeAppLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#133655' }}>
      <Toolbar>
        <AccountAppBarCollapse />

        <div onClick={() => handleChangeAppLanguage('ro')} className={classes.flags}>
          <Avatar alt="RO" variant="square" className={classes.small} src={RO} />
        </div>

        <div onClick={() => handleChangeAppLanguage('en')} className={classes.flags}>
          <Avatar alt="EN" variant="square" className={classes.small} src={EN} />
        </div>

        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
