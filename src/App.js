
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
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("TESTER");

  //로컬 스토리지에서 로그인 상태를 확인하고 설정
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLogin');
    if(loggedIn === 'true'){
      setIsLogin(true);
    }
  }, []);

  //isLogin 상태가 변경될 때 로컬 스토리지에 상태 업데이트
  useEffect(() => {
    localStorage.setItem('isLogin', isLogin.toString());
  }, [isLogin]);

  
  return (
    <Router>
      <Routes>
        
        {/** main page */}
        <Route path="/"                                                     
            element={                                          
            isLogin ? (
              <Navigate to="project/1" replace />  //login 되어 있다면 project 1로 이동
            ) : (
              <Introduction isLogin = {isLogin} setIsLogin={setIsLogin}/>  //login 되어 있지 않을 때 main page로 이동
            )
        }/>   
        <Route path="/project/:projectId" element={<Project isLogin={isLogin} userName={userName}/>} />                 {/** project-issues page */}
        <Route path="/project/:projectId/filter" element={<Filter isLogin={isLogin} userName={userName}/>} />           {/** project-filter page */}
        <Route path="/project/:projectId/dashBoard" element={<DashBoard isLogin={isLogin} userName={userName}/>} />     {/** project-dashboard page */}
        <Route path="/project/:projectId/metaInfo" element={<MetaInfo isLogin={isLogin} userName={userName}/>} />       {/** project-metaInfo page */}
        
        <Route path="/project/:projectId/:issueId" element={<Issue isLogin={isLogin} userName={userName}/>} />          {/**Issue page */}
        
        <Route path="/login" element={<Login />} />                         {/** login page */}
        <Route path="/sign" element={<SignUp />} />                       {/** signup page */}
      </Routes>
    </Router>
    
  );
}


export default App;
