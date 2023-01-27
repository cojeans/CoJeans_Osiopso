import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Login from './routes/login/login.component';
import Join from './routes/join/join.component';
import Mypage from './routes/mypage/mypage.component';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />  
        <Route path='login' element={<Login />} />
        <Route path='join' element={<Join />} />
        <Route path='mypage' element={<Mypage />} />
      </Route>
   </Routes>
  );
}

export default App;
