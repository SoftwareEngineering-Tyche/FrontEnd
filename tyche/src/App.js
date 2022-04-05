import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import './App.css';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import Header from './components/header';
import Footer from './components/footer';
import ProfilePage from './pages/profile-page';

const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] });

function App() {

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);
  const theme = createTheme({
    direction: 'rtl', 
    padding:'0px', 
    typography: {
      "fontFamily": `"Yekan", "Arial", sans-serif`,
    }
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="App" dir="rtl">
          <Header/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/profile' element={<ProfilePage/>} />
            </Routes>
          </BrowserRouter>
          <Footer/>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
