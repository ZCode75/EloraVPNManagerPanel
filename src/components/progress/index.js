import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5
  }
}));

const Progress = ({ value, secondaryLabel }) => {
  const color =
    (value < 50 && 'success') ||
    (value > 50 && value < 70 && 'danger') ||
    (value > 70 && 'error') ||
    'primary';
  return (
    <>
      <>
        <BorderLinearProgress variant="determinate" value={value} color={color} />
        <Typography variant="body2">{secondaryLabel}</Typography>
      </>
    </>
  );
};

export default Progress;
