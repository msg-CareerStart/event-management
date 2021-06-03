import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FilesSectionDumb from './FilesSectionDumb';
import FilesDialog from './FilesDialogDelete';
import { FileAdministration } from '../../../model/FileAdministration';
import { importEvents, importTickets } from '../../../api/AdministrationPageAPI';

interface FilesSectionProps {
  doImport: boolean;
  state: string;
  setStateComboBox: (value: string) => void;
  setShowDialogExport: (value: boolean) => void;
}

const FilesSectionSmart = (props: FilesSectionProps) => {
  const [files, setFiles] = useState<FileAdministration[]>([]);
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FileAdministration>();

  const importCSV = () => {
    if (props.state === '10') {
      let formData = new FormData();
      formData.append('csv', files[0].file);
      importEvents(formData);
      props.setStateComboBox('0');
    } else if (props.state === '20') {
      let formData = new FormData();
      formData.append('csv', files[0].file);
      importTickets(formData);
      props.setStateComboBox('0');
    } else {
      props.setShowDialogExport(true);
    }
  };

  const handleCloseConfirm = () => {
    setImageAsDeleted(itemToDelete as FileAdministration);
    setItemToDelete(undefined);
    setOpen(false);
  };

  const handleCloseDecline = () => {
    setItemToDelete(undefined);
    setOpen(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const byteArr = reader.result;
        const id = `file-${file.size}-${Date.now()}-${file.name}`;
        const elem = { id: id, name: file.name, file: file };
        setFiles([elem]);
      };
    });
  }, []);

  const setImageAsDeleted = (item: FileAdministration) => {
    files[0].deleted = true;
    setFiles(files);
  };

  const handleClickOpen = (item: FileAdministration) => {
    setItemToDelete(item);
    setOpen(true);
  };

  const { getRootProps, getInputProps } = useDropzone({ accept: '.csv', onDrop, multiple: false });

  useEffect(() => {
    console.log('Da');
    if (props.doImport === true) {
      importCSV();
    }
  }, [props.doImport]);

  return (
    <>
      <FilesSectionDumb
        files={files}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        setFiles={setFiles}
        handleClickOpen={handleClickOpen}
      />

      <FilesDialog open={open} handleCloseDecline={handleCloseDecline} handleCloseConfirm={handleCloseConfirm} />
    </>
  );
};

export default FilesSectionSmart;
