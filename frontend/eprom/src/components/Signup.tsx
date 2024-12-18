import React from "react";
import { Box, Button, CssBaseline, TextField, Typography, Container } from "@mui/material";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Signup = () => {

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      {/* Corrected CssBaseline */}
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
