import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Grid, LinearProgress } from '@material-ui/core';
import { useStyle } from '../../../styles/administrationPage/FilesSectionStyle';
import { EventImage } from '../../../model/EventImage';
import CancelIcon from '@material-ui/icons/Cancel';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTranslation } from 'react-i18next';
import { FileAdministration } from '../../../model/FileAdministration';

interface FilesSectionProps {
  files: FileAdministration[];
  getRootProps: any;
  getInputProps: any;
  setFiles: (file: FileAdministration[]) => void;
  handleClickOpen: (item: FileAdministration) => void;
}

const FilesSectionDumb = (props: FilesSectionProps) => {
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div {...props.getRootProps()} className={classes.dragndrop}>
        <input {...props.getInputProps()} />
        <p> {t('files.fileDragAndDrop')} </p>
      </div>

      <div className={classes.imagesContainerWrapper}>
        {props.files.length !== 0 && (
          <ReactSortable
            list={props.files}
            setList={props.setFiles}
            direction="horizontal"
            animation={150}
            className={`${classes.imagesContainer} MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3`}
          >
            {props.files
              .filter((item) => item.deleted === undefined)
              .map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} className={classes.imageWrapper}>
                  <CancelIcon onClick={() => props.handleClickOpen(item)} className={classes.deleteButton} />
                  <Grid container direction="column" justify="center" alignItems="center">
                    <DescriptionIcon fontSize="large"></DescriptionIcon>
                    {item.name}
                  </Grid>
                </Grid>
              ))}
          </ReactSortable>
        )}
      </div>
    </div>
  );
};

export default FilesSectionDumb;
