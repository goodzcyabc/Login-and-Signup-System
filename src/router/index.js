import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom"
import App from "../pages/App";
import SignUpPage from "../pages/SignUp/SignUpPage";
import SignInPage from "../pages/SignIn/SignInPage";
import HeaderNav from "../components/HeaderNav"
import FlashMessageList from "../components/Flash/FlashMessageList";

function AppRouter() {
    return (
      <HashRouter>
        <HeaderNav />
        <FlashMessageList />
        <Routes>
          <Route exact path="/" Component={ App } />
          <Route path="/signup" Component={ SignUpPage }/>
          <Route path="/signin" Component={ SignInPage }/>
        </Routes>
      </HashRouter>
    );
}

export default AppRouter