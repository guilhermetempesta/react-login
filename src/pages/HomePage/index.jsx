import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import MainAppBar from "../../components/MainAppBar";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "../../components/Footer";

const theme = createTheme();

const HomePage = () => {
  const { logout, user  } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault(); // teste
    logout();
  }
  return (    
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <MainAppBar/>        
        <CssBaseline />        
        <Container component="main" maxWidth="xl">
          <h1>HomePage</h1>
          <h3>Usuário: {user.firstName}</h3>
          <button onClick={handleLogout}>Sair</button>
        </Container>
        <Footer/>
      </Box>
    </ThemeProvider>
  )
};


export default HomePage;