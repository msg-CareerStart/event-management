import { NEXT_STEP_FORM, SET_STEP_FORM } from '../actions/FormAction';

export interface FormState {
  stepNumber: number;
}

const initialState: FormState = {
  stepNumber: 0,
};

export const FormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NEXT_STEP_FORM:
      const current = state.stepNumber === 3 ? 3 : state.stepNumber + 1;
      return {
        ...state,
        stepNumber: current,
      };
    case SET_STEP_FORM:
      return {
        ...state,
        stepNumber: action.payload,
      };
    default:
      return state;
  }
};
