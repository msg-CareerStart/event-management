import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FilesSectionDumb from './FilesSectionDumb';
import FilesDialog from './FilesDialogDelete';
import { FileAdministration } from '../../../model/FileAdministration';
import { importEvents, importTickets } from '../../../api/AdministrationPageAPI';
import ImportDialogSuccess from './ImportDialogSuccess';

interface FilesSectionProps {
  setDoImport: (value: boolean) => void;
  doImport: boolean;
  state: string;
  setStateComboBox: (value: string) => void;
  setShowDialogExport: (value: boolean) => void;
}

const FilesSectionSmart = (props: FilesSectionProps) => {
  const [files, setFiles] = useState<FileAdministration[]>([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogImportSuccess, setOpenDialogImportSuccess] = useState(false);
  const [openDialogImportError, setOpenDialogImportError] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FileAdministration>();

  const importCSV = async () => {
    if (props.state === '10' && files.length !== 0) {
      let formData = new FormData();
      formData.append('csv', files[0].file);
      const result = await importEvents(formData);
      console.log(result);
      props.setStateComboBox('0');
      props.setDoImport(false);
      setFiles([]);
      setOpenDialogImportSuccess(true);
    } else if (props.state === '20' && files.length !== 0) {
      let formData = new FormData();
      formData.append('csv', files[0].file);
      const result = await importTickets(formData);
      console.log(result);
      props.setStateComboBox('0');
      props.setDoImport(false);
      setFiles([]);
      setOpenDialogImportSuccess(true);
    } else {
      props.setShowDialogExport(true);
      props.setDoImport(false);
    }
  };

  const handleCloseConfirm = () => {
    setImageAsDeleted(itemToDelete as FileAdministration);
    setItemToDelete(undefined);
    setOpenDialogDelete(false);
    setOpenDialogImportSuccess(false);
  };

  const handleCloseDecline = () => {
    setItemToDelete(undefined);
    setOpenDialogDelete(false);
    setOpenDialogImportSuccess(false);
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
    setOpenDialogDelete(true);
  };

  const { getRootProps, getInputProps } = useDropzone({ accept: '.csv', onDrop, multiple: false });

  useEffect(() => {
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

      <FilesDialog
        open={openDialogDelete}
        handleCloseDecline={handleCloseDecline}
        handleCloseConfirm={handleCloseConfirm}
      />

      <ImportDialogSuccess
        open={openDialogImportSuccess}
        handleCloseDecline={handleCloseDecline}
        handleCloseConfirm={handleCloseConfirm}
      />
    </>
  );
};

export default FilesSectionSmart;
