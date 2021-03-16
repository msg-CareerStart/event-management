import React from 'react';
import { Button, MenuItem } from '@material-ui/core';
import ButtonAppBarCollapse from './ButtonAppBarCollapse';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles/CommonStyles';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppBarCollapse = () => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = React.useState('home');
  const [t] = useTranslation();

  const handleOnClick = (index: string) => {
    setActiveIndex(index);
  };
  
  const role = localStorage.getItem('role');

  return (
    <div className={classes.root}>
      <ButtonAppBarCollapse>
        <Link to={`/${role}`} className={classes.linkDecoration}>
          <MenuItem>
            <Typography variant="h6" className={classes.light}>
              {t('eventList.home')}
            </Typography>
          </MenuItem>
        </Link>
        <Link to={`/${role}/buildings`} className={classes.linkDecoration}>
          <MenuItem>
            <Typography variant="h6" className={classes.light}>
              {t('eventList.buildings')}&nbsp;&nbsp;
            </Typography>
          </MenuItem>
        </Link>
        <Link to={`/${role}/events`} className={classes.linkDecoration}>
          <MenuItem>
            <Typography variant="h6" className={classes.light}>
              {t('eventList.events')}&nbsp;&nbsp;
            </Typography>
          </MenuItem>
        </Link>

        {role === 'admin' ? (
          <Link to={'/admin/statistics'} className={classes.linkDecoration}>
            <MenuItem>
              <Typography variant="h6" className={classes.light}>
                {t('eventList.statistics')}&nbsp;&nbsp;
              </Typography>
            </MenuItem>
          </Link>
        ) : (
          <Link to={'/user/tickets'} className={classes.linkDecoration}>
            <MenuItem>
              <Typography variant="h6" className={classes.light}>
                {t('eventList.tickets')}&nbsp;&nbsp;
              </Typography>
            </MenuItem>
          </Link>
        )}
      </ButtonAppBarCollapse>

      <div className={classes.buttonBar}>
        <Button>
          <NavLink
            to={`/${role}`}
            onClick={() => handleOnClick('home')}
            className={activeIndex === 'home' ? classes.active : classes.inactive}
          >
            <Typography variant="h6">{t('eventList.home')}&nbsp;&nbsp;</Typography>
          </NavLink>
        </Button>

        <Button>
          <NavLink
            to={`/${role}/buildings`}
            onClick={() => handleOnClick('buildings')}
            className={activeIndex === 'buildings' ? classes.active : classes.inactive}
          >
            <Typography variant="h6">{t('eventList.buildings')}&nbsp;&nbsp;</Typography>
          </NavLink>
        </Button>

        <Button>
          <NavLink
            to={`/${role}/events`}
            onClick={() => handleOnClick('events')}
            className={activeIndex === 'events' ? classes.active : classes.inactive}
          >
            <Typography variant="h6">{t('eventList.events')}&nbsp;&nbsp;</Typography>
          </NavLink>
        </Button>

        {role === 'admin' ? (
          <Button>
            <NavLink
              to="/admin/statistics"
              onClick={() => handleOnClick('statistics')}
              className={activeIndex === 'statistics' ? classes.active : classes.inactive}
            >
              <Typography variant="h6">{t('eventList.statistics')}&nbsp;&nbsp;</Typography>
            </NavLink>
          </Button>
        ) : (
          <Button>
            <NavLink
              to="/user/tickets"
              onClick={() => handleOnClick('tickets')}
              className={activeIndex === 'tickets' ? classes.active : classes.inactive}
            >
              <Typography variant="h6">{t('eventList.tickets')}&nbsp;&nbsp;</Typography>
            </NavLink>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppBarCollapse;
