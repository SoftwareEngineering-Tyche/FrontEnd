import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import './App.css';
import { connect } from "react-redux";
import { login } from "./store/authentication/action";
import Init from './web3client';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import Header from './components/header';
import Footer from './components/footer';
import ProfilePage from './pages/profile-page';
import Nft from './pages/create-nft';
import ProductPage from "./pages/product-page";
import CollectionPage from "./pages/collection-page";
import { MoralisProvider } from "react-moralis";
import Moralis from "moralis";

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
    <MoralisProvider serverUrl={process.env.REACT_APP_SERVER_URL} appId={process.env.REACT_APP_APP_ID}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="App" dir="rtl">
            <Header/>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/profile/collections' element={<ProfilePage value={0}/>} />
                <Route path='/profile/creations' element={<ProfilePage value={1}/>} />
                <Route path='/profile/favorites' element={<ProfilePage value={2}/>} />
                <Route path='/profile' element={<ProfilePage value={0}/>} />
                <Route path='/nft' element={<Nft />} />
                <Route path='/product/*' element={<ProductPage />} />
                <Route path="/collection/create/*" element={<CollectionPage mode="create"/>}/>
                <Route path="/collection/*" element={<CollectionPage mode="show"/>}/>
              </Routes>
            </BrowserRouter>
            <Footer/>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </MoralisProvider>
  );
}

export default connect(
  null,
  dispatch => ({
    login: userData => dispatch(login(userData)),
  }))(App);
