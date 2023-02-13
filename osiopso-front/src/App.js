import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Login from "./routes/login/login.component";
import Join from "./routes/join/join.component";
import Mypage from "./routes/mypage/mypage.component";
import OOTDPage from './routes/ootd/ootd.component'
import PasswordCheck from './routes/passwordcheck/passwordcheck.component'
import ChangePassword from './routes/changeuserinfo/changepassword.component'
import PwdComplete from './routes/changeuserinfo/pwdchangecomplete'
import DisclosureScope from './routes/disclosurescopre/disclore-scope.component'
import MembershipWithdrawal from "./routes/membershipwithdrawal/membershipwithdrawal.component";
import JoinComplete from "./routes/join/join-complete.component";
import AdvicePage from "./routes/advice/advice.component";



import "./App.scss";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <Routes>

      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path='passwordcheck' element={<PasswordCheck/>}/>
        <Route path="mypage/*" element={<Mypage />} />
        <Route path="advice/*" element={<AdvicePage />} />        
        <Route path='ootd/*' element={<OOTDPage/>}/>
        <Route path='changePassword' element={<ChangePassword/>}/>
        <Route path='pwdchangecomplete' element={<PwdComplete/>}/>
        <Route path='disclosurescope' element={<DisclosureScope/>}/>
        <Route path='membershipwithdrawal/' element={<MembershipWithdrawal/>}/>
        <Route path='joincomplete' element={<JoinComplete/>}/>

        
      </Route>
    </Routes>
  );
}

export default App;
