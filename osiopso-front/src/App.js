import { Routes, Route } from "react-router-dom";
import { useEffect, Component } from "react";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Login from "./routes/login/login.component";
import Join from "./routes/join/join.component";
import Mypage from "./routes/mypage/mypage.component";
import AdvicePage from './routes/advice/advice.component';
import OOTDPage from './routes/ootd/ootd.component'
import PasswordCheck from './routes/passwordcheck/passwordcheck.component'
import ChangePassword from './routes/changeuserinfo/changepassword.component'
import DisclosureScope from './routes/disclosurescopre/disclore-scope.component'
import MembershipWithdrawal from "./routes/membershipwithdrawal/membershipwithdrawal.component";
import Search from "./routes/search/search.component";
import FindPage from "./routes/findpage/findpage.component";
import ErrorPage from "./routes/errorpage/errorpage.component";
import Test from "./components/test/test.component"
import SelectboxPage from "./routes/selectbox/selectbox.component";
import OAuth2RedirectHandler from "./routes/oauth2/OAuth2RedirectHandler";
import OAuth2Test from "./routes/oauth2/OAuth2Test";
import { getCurrentUser } from './utils/APIUtils';

import { createTheme, ThemeProvider } from "@material-ui/core";

import "./App.scss";

const theme = createTheme({
  typography: {
    fontFamily: "LINESeedKR-Bd",
    fontSize:'12'
  },
});
function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="passwordcheck" element={<PasswordCheck />} />
          <Route path="profile/*" element={<Mypage />} />
          <Route path="advice/*" element={<AdvicePage />} />
          <Route path="ootd/*" element={<OOTDPage />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="disclosurescope" element={<DisclosureScope />} />
          <Route
            path="membershipwithdrawal/"
            element={<MembershipWithdrawal />}
          />
          <Route path="search" element={<Search />} />
          <Route path="find" element={<FindPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="mypage/*" element={<Mypage />} />
          <Route path="disclosurescope" element={<DisclosureScope />} />

          <Route path="test" element={<Test />} />
          <Route path="selectbox/*" element={<SelectboxPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
