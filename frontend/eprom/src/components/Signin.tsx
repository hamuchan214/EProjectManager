import React from "react";
import { Box, Button, CssBaseline, TextField, Typography, Container } from "@mui/material";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Signin = () => {

    return(
        <ThemeProvider theme={darkTheme}>
          <CssBaseline>
          <Container>
            
          </Container>
          </CssBaseline>
        </ThemeProvider>
    );


}

export default Signin