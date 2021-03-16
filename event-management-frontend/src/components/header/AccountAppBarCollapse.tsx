import React, { MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useStylesHeader } from '../../styles/HeaderStyle';
import { Auth } from 'aws-amplify';

const AccountAppBarCollapse = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
  const open = Boolean(anchorEl);
  const classes = useStylesHeader();
  const history = useHistory();
  const userName = localStorage.getItem('username');
  const count = 10;
  const [t] = useTranslation();
  const result = userName === null ? '' : userName.slice(0, count) + (userName.length > count ? '...' : '');

  const handleMenu = (event: MouseEvent) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOutClick = async () => {
    await Auth.signOut()
      .then(() => {
        localStorage.removeItem('role');
        history.push('/login');
      })
      .catch(() => {});
  };

  return (
    <>
      <IconButton onClick={handleMenu} className={classes.yellow}>
        <AccountCircle />
        <Typography variant="h6">&nbsp;{result}</Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <Link to="/account" style={{ textDecoration: 'none' }}>
          <MenuItem>
            <Typography variant="h6" className={classes.light}>
              {t('eventList.account')}&nbsp;&nbsp;
            </Typography>
          </MenuItem>
        </Link>

        <MenuItem>
          <Typography variant="h6" className={classes.light} onClick={onSignOutClick}>
            {t('eventList.logout')}&nbsp;&nbsp;
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountAppBarCollapse;
