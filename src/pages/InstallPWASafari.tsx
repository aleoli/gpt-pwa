import { Box, Container, Typography } from '@mui/material';
import React from 'react';

function InstallPWASafari() {
  return (
    <React.Fragment>
      <Container style={
        {
          marginTop: '1rem',
          marginBottom: '1rem',
        }
      }>
        <Box>
          <Typography variant="h4">Install on iOS</Typography>
          <Typography variant="body1">
            To install the application on iOS, press the <b>Share</b> button below.
            <img src={process.env.PUBLIC_URL + "/imgs/install-pwa-safari/step1.jpg"} alt="iOS Share" style={
              {
                width: '100%',
                margin: '1rem 0',
              }
            } />
          </Typography>
          <Typography variant="body1">
            In the next screen, select <b>Add to Home Screen</b>.
            <img src={process.env.PUBLIC_URL + "/imgs/install-pwa-safari/step2.jpg"} alt="iOS Add to Home" style={
              {
                width: '100%',
                margin: '1rem 0',
              }
            } />
          </Typography>
          <Typography variant="body1">
            In the next screen, press <b>Add</b>.
            <img src={process.env.PUBLIC_URL + "/imgs/install-pwa-safari/step3.jpg"} alt="iOS Add" style={
              {
                width: '100%',
                margin: '1rem 0',
              }
            } />
          </Typography>
          <Typography variant="body1">
            Congratulations! The application has been installed correctly and can be used as a normal application.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default InstallPWASafari;
