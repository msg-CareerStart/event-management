import { SummaryStepDumb } from './SummaryStepDumb';
import React from 'react';

interface SummaryStepSmartProps {
  nextStep: () => void;
  previousStep: () => void;
}

export function SummaryStepSmart({ nextStep, previousStep }: SummaryStepSmartProps) {
  return <SummaryStepDumb previousStep={previousStep} nextStep={nextStep} />;
}
