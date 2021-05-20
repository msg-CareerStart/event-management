import React from 'react';
import HeaderDumb from './HeaderCrudDumb';

interface Props {
  step: number;
  loadStep: () => void;
  setStep: (value: number) => void;
  saveEvent: () => void;
  deleteEvent: () => void;
  isAdmin: boolean;
  title: string;
}

function HeaderSmart({ step, loadStep, setStep, saveEvent, deleteEvent, isAdmin, title }: Props) {
  return (
    <HeaderDumb
      step={step}
      loadStep={loadStep}
      setStep={setStep}
      isAdmin={isAdmin}
      title={title}
      handleEventDelete={deleteEvent}
      handleEventSave={saveEvent}
    />
  );
}

export default HeaderSmart;
