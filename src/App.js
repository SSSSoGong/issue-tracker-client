
import './App.css';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Project from './routes/Project';
import Filter from './routes/Filter';
import MetaInfo from './routes/MetaInfo';
import DashBoard from './routes/DashBoard';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Introduction from './routes/Introduction';
import Issue from './routes/Issue';
import MainHeader from './components/MainHeader';







function App() {
  //초기 상태를 로컬 스토리지에서 백업
  const savedJWT = localStorage.getItem('JWT');
  const loggedIn = localStorage.getItem('isLogin');


  const [userInfo, setUserInfo] 
  = useState({
    isLogin : loggedIn || true, 
    userName : "TESETER",
    JWT : savedJWT || "default",
  });
  

  //로컬 스토리지에서 로그인 상태를 확인하고 설정
  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('isLogin');
  //   const savedJWT = localStorage.getItem('JWT')
  //   if(loggedIn === 'true'){
  //     setUserInfo(prev => ({...prev, isLogin : true}));
  //   }
  // }, []);



  //isLogin 상태가 변경될 때 로컬 스토리지에 상태 업데이트
  useEffect(() => {
    localStorage.setItem('isLogin', userInfo.isLogin.toString());
  }, [userInfo.isLogin]);

  //JWT 상태가 변경될 때 로컬 스토리지에 상태 업데이트
  useEffect(() => {
    localStorage.setItem('JWT', userInfo.JWT.toString());
  }, [userInfo.JWT]);
  
  return (
    <Router>
      <Routes>
        
        {/** main page */}
        <Route path="/"                                                     
            element={                                          
            userInfo.isLogin ? (
              <Navigate to="project/1" replace />  //login 되어 있다면 project 1로 이동
            ) : (
              <Introduction userInfo={userInfo} setUserInfo={setUserInfo}/>  //login 되어 있지 않을 때 main page로 이동
            )
        }/>   
        <Route path="/project/:projectId" element={<Project userInfo={userInfo} setUserInfo={setUserInfo}/>} />                 {/** project-issues page */}
        <Route path="/project/:projectId/filter" element={<Filter userInfo={userInfo} setUserInfo={setUserInfo} />} />           {/** project-filter page */}
        <Route path="/project/:projectId/dashBoard" element={<DashBoard userInfo={userInfo} setUserInfo={setUserInfo} />} />     {/** project-dashboard page */}
        <Route path="/project/:projectId/metaInfo" element={<MetaInfo userInfo={userInfo} setUserInfo={setUserInfo} />} />       {/** project-metaInfo page */}
        
        <Route path="/project/:projectId/:issueId" element={<Issue userInfo={userInfo} setUserInfo={setUserInfo}/>} />          {/**Issue page */}
        
        <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo}/>} />                         {/** login page */}
        <Route path="/sign" element={<SignUp />} />                       {/** signup page */}
      </Routes>
    </Router>
    
  );
}


export default App;
