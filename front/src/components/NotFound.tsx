import { Box, Container } from '@mui/material';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >

        {/* Add the image from the public folder */}
        <img src="/assets/images/404.jpg" alt="404 Robot" />
      </Box>
    </Container>
  );
};

export default NotFound;

