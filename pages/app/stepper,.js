import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const progress = [
  'SEARCH SYMPTOMS',
  'BODY PARTS & FUNCTIONS',
  'QUESTIONS',
  'RESULT',
];

export default function HorizontalLabelPositionBelowStepper({ stepIndex }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={stepIndex} alternativeLabel>
        {progress.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
