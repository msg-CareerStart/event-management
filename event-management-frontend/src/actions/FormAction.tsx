export const NEXT_STEP_FORM = 'NEXT_STEP_FORM';
export const SET_STEP_FORM = 'SET_STEP_FORM';

export const nextStepForm = () => {
  return {
    type: NEXT_STEP_FORM,
  };
};

export const setStepForm = (value: number) => {
  return {
    type: SET_STEP_FORM,
    payload: value,
  };
};
