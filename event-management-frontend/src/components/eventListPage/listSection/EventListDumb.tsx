import React, { useLayoutEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Button, Container, TableFooter, TableSortLabel, CircularProgress, Grid } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import FilterSectionSmart from '../filterSection/FilterSectionSmart';
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useListStyles } from '../../../styles/EventListStyle';
import { EventSort } from '../../../model/EventSort';
import { EventFilters } from '../../../model/EventFilters';
import ErrorIcon from '@material-ui/icons/Error';
import { StyledTableCell } from '../../../styles/StyledTableCell';
import { PaginationCell } from '../../../styles/PaginationCell';

interface Props {
  isError: boolean;
  isLoading: boolean;
  sort: EventSort;
  filters: EventFilters;
  page: number;
  noPages: number;
  updateSortCriteria: (sortCriteria: { criteria: string; type: string }) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  eventsDetails: any[];
  eventsDetailsMobile: any[];
  handleSortEvent: (criteria: string, type: string) => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

interface Data {
  title: string;
  subtitle: string;
  location: string;
  date: number;
  hour: number;
  occRate: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const EventListDumb = ({
  isError,
  isLoading,
  sort,
  filters,
  page,
  noPages,
  updateSortCriteria,
  incrementPage,
  decrementPage,
  eventsDetails,
  eventsDetailsMobile,
  handleSortEvent,
  goToPrevPage,
  goToNextPage,
}: Props) => {
  const commonClasses = useStyles();
  const classes = useListStyles();

  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [t] = useTranslation();

  const stickyDiv: React.RefObject<HTMLInputElement> = React.createRef();

  const headCells: HeadCell[] = [
    { id: 'date', numeric: true, disablePadding: false, label: t('eventList.date') },
    { id: 'hour', numeric: true, disablePadding: false, label: t('eventList.hour') },
    { id: 'occRate', numeric: true, disablePadding: false, label: t('eventList.occupancyRate') + ' (%) ' },
  ];

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    event.preventDefault();
    let type = '';
    if (sort.type === 'asc') {
      type = 'desc';
    } else {
      type = 'asc';
    }
    updateSortCriteria({ criteria: property, type: type });
  };

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const height = 250;

      // collapse on scrolling up or on a quick scroll down
      if (prevPos.y > currPos.y + height || prevPos.y < currPos.y) {
        setExpanded(false);
      }
    },
    [expanded],
    undefined,
    false,
    300
  );

  if (width <= 600) {
    return (
      <TableContainer component={Paper}>
        <Link to={`/admin/newEvent`} style={{ textDecoration: 'none' }}>
          <Button
            className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${commonClasses.buttonStyle4}`}
          >
            {t('eventList.createNewEventButton')}
          </Button>
        </Link>

        <FilterSectionSmart expanded={expanded} setExpanded={setExpanded} />

        {isError ? (
          <Grid container alignItems={'center'} justify={'center'} className={commonClasses.marginTop}>
            <ErrorIcon color={'primary'} fontSize={'large'} />
            Oops, there was an error
          </Grid>
        ) : isLoading ? (
          <Grid container alignItems={'center'} justify={'center'} className={commonClasses.marginTop}>
            <CircularProgress />
          </Grid>
        ) : (
          <Table aria-label="customized table" className={commonClasses.left}>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('eventList.title')}</StyledTableCell>
                <StyledTableCell
                  sortDirection={sort.criteria === 'date' ? (sort.type as 'asc' | 'desc' | undefined) : false}
                >
                  <TableSortLabel
                    hideSortIcon={true}
                    active={sort.criteria === 'date'}
                    direction={sort.criteria === 'date' ? (sort.type as 'asc' | 'desc' | undefined) : 'asc'}
                    onClick={createSortHandler('date')}
                  >
                    {sort.criteria === 'date' ? (
                      <span className={`${commonClasses.visuallyHidden}`}>
                        {sort.type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                    {t('eventList.date')}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>

            <TableBody>{eventsDetailsMobile}</TableBody>

            <TableFooter>
              <TableRow>
                {page > 0 ? (
                  <PaginationCell>
                    <Button onClick={decrementPage} style={{ color: '#F9C929' }}>
                      <b>&laquo;&laquo;</b>
                    </Button>
                  </PaginationCell>
                ) : (
                  <PaginationCell />
                )}
                <PaginationCell style={{ textAlign: 'center' }}>{`${page + 1}/${
                  noPages ? noPages : 1
                }`}</PaginationCell>
                {page + 1 < noPages ? (
                  <PaginationCell>
                    <Button onClick={incrementPage} style={{ color: '#F9C929' }}>
                      <b>&raquo;&raquo;</b>
                    </Button>
                  </PaginationCell>
                ) : (
                  <PaginationCell />
                )}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    );
  } else {
    return (
      <Container>
        <TableContainer component={Paper} className={classes.pageContainer}>
          <div className={classes.stickyArea} ref={stickyDiv}>
            <Link to={`/admin/newEvent`} style={{ textDecoration: 'none' }}>
              <Button
                className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${commonClasses.buttonStyle4}`}
              >
                {t('eventList.createNewEventButton')}
              </Button>
            </Link>

            <FilterSectionSmart expanded={expanded} setExpanded={setExpanded} />
          </div>

          {isError ? (
            <Grid container alignItems={'center'} justify={'center'} className={commonClasses.marginTop}>
              <ErrorIcon color={'primary'} fontSize={'large'} />
              Oops, there was an error
            </Grid>
          ) : isLoading ? (
            <Grid container alignItems={'center'} justify={'center'} className={commonClasses.marginTop}>
              <CircularProgress />
            </Grid>
          ) : (
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell key={'title'} align={'left'} padding={'default'} size={'medium'}>
                    {t('eventList.title')}
                  </TableCell>
                  <TableCell key={'subtitle'} align={'left'} padding={'default'} size={'medium'}>
                    {t('eventList.subtitle')}
                  </TableCell>
                  <TableCell key={'location'} align={'left'} padding={'default'} size={'medium'}>
                    {t('eventList.location')}
                  </TableCell>

                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={
                        sort.criteria === headCell.id && headCell.numeric
                          ? (sort.type as 'asc' | 'desc' | undefined)
                          : false
                      }
                      size={'medium'}
                    >
                      <TableSortLabel
                        hideSortIcon={!headCell.numeric}
                        active={sort.criteria === headCell.id && headCell.numeric}
                        direction={sort.criteria === headCell.id ? (sort.type as 'asc' | 'desc' | undefined) : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}

                        {sort.criteria === headCell.id && headCell.numeric ? (
                          <span className={`${commonClasses.visuallyHidden}`}>
                            {sort.type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>{eventsDetails}</TableBody>
              <TableFooter>
                <TableRow>
                  {page > 0 ? (
                    <PaginationCell>
                      <Button onClick={goToPrevPage} style={{ color: '#f2ac0a' }}>
                        <b>&laquo;{t('eventList.previous')}</b>
                      </Button>
                    </PaginationCell>
                  ) : (
                    <PaginationCell />
                  )}
                  <PaginationCell />
                  <PaginationCell />
                  <PaginationCell>{`${page + 1}/${noPages ? noPages : 1}`}</PaginationCell>
                  <PaginationCell />
                  <PaginationCell />
                  {page + 1 < noPages ? (
                    <PaginationCell>
                      <Button onClick={goToNextPage} style={{ color: '#f2ac0a' }}>
                        <b>{t('eventList.next')}&raquo;</b>
                      </Button>
                    </PaginationCell>
                  ) : (
                    <PaginationCell />
                  )}
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </TableContainer>
      </Container>
    );
  }
};

export default EventListDumb;
