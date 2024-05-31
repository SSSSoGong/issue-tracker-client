
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
import ProjectCreation from './routes/ProjectCreation';
import IssueCreation from './routes/IssueCreation';
import ProjectModification from './routes/ProjectModification';
import IssueModification from './routes/IssueModification';
import AxiosTest from './routes/AxiosTest';
import IssueUpdate from './routes/IssueUpdate';
import DashBoardContent from './routes/DashBoardContent';
import UserInfoPage from './routes/UserInfoPage';






function App() {
  //초기 상태를 로컬 스토리지에서 백업
  const savedJWT = localStorage.getItem('JWT');
  const loggedIn = (localStorage.getItem('isLogin') === 'true');

  const [userInfo, setUserInfo] = useState({
    isLogin: loggedIn,
    JWT: savedJWT || "",
  });

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
              <Navigate to={`project/0`} replace />  //login 되어 있다면 default page로 이동
            ) : (
              <Introduction userInfo={userInfo} setUserInfo={setUserInfo}/>  //login 되어 있지 않을 때 main page로 이동
            )
        }/>   
        <Route path="/project/:projectId" element={<Project userInfo={userInfo} setUserInfo={setUserInfo}/>} />                 {/** project-issues page */}
        <Route path="/project/:projectId/filter" element={<Filter userInfo={userInfo} setUserInfo={setUserInfo} />} />           {/** project-filter page */}
        <Route path="/project/:projectId/dashBoard" element={<DashBoard userInfo={userInfo} setUserInfo={setUserInfo} />} />     {/** project-dashboard page */}
        <Route path="/project/:projectId/dashBoard/chart/:chartIdx" element={<DashBoardContent userInfo={userInfo} setUserInfo={setUserInfo} />} /> {/**project-dasboard-chart page */} 
        
        <Route path="/project/:projectId/metaInfo" element={<MetaInfo userInfo={userInfo} setUserInfo={setUserInfo} />} />       {/** project-metaInfo page */}

        <Route path="/project/:projectId/modify" element={<ProjectModification userInfo={userInfo} setUserInfo={setUserInfo} />} />  {/** project modifying page */}

        <Route path="/project-create" element={<ProjectCreation userInfo={userInfo} setUserInfo={setUserInfo} />} />  {/** project create page */}

        
        
        <Route path="/project/:projectId/issue/:issueId" element={<Issue userInfo={userInfo} setUserInfo={setUserInfo}/>} />  {/**Issue page */}
        <Route path="/project/:projectId/issue/:issueId/modify" element={<IssueModification userInfo={userInfo} setUserInfo={setUserInfo}/>} />  {/**Issue page */}
        <Route path="/project/:projectId/issue-create" element={<IssueCreation userInfo={userInfo} setUserInfo={setUserInfo} /> } />  {/** Issue create page */}
        <Route path="/project/:projectId/issue/:issueId/update" element={<IssueUpdate userInfo={userInfo} setUserInfo={setUserInfo} />} /> {/** Issue update page */}
        
        <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo}/>} />                         {/** login page */}
        <Route path="/sign" element={<SignUp userInfo={userInfo} setUserInfo={setUserInfo}/>} />                       {/** signup page */}
        <Route path="/userInfo" element={<UserInfoPage userInfo={userInfo} setUserInfo={setUserInfo}/>} />        {/** user information page */}
        
        <Route path="/test" element={<AxiosTest/>} /> {/**test page */}

      </Routes>
    </Router>
  );
}


export default App;
