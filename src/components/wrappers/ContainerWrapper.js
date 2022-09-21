import { Container } from '@mui/material';
import React from 'react';

const ContainerWrapper = ( props ) => {
  const { children } = props;

  return (
    <Container {...props}>
      { children }
    </Container>
  );
};

export default ContainerWrapper;