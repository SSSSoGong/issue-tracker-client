
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Project from './routes/Project';
import Filter from './routes/Filter';
import MetaInfo from './routes/MetaInfo';
import DashBoard from './routes/DashBoard';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

//test용 import들
import MainHeader from './components/MainHeader';
import ProjectList from './components/ProjectList';
import ProjectMenu from './components/ProjectMenu';
import Footer from './components/Footer';
import ProjectFooter from './components/ProjectFooter';
import Introduction from './routes/Introduction';


const userInfo = {
  isLogined : false,
  userName : "TESTER0123412",
}


/**
 * user의 login 여부를 설정하는 함수
 * @param {boolean} bool false, 혹은 true
 */
export function setUserLoginState(bool) {
  userInfo.isLogined = bool;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<MainHeader userInfo={userInfo}/>} />                     {/** test용 page */}
        
        {/** main page */}
        <Route path="/"                                                     
            element={                                          
            userInfo.isLogined ? (
              <Navigate to="project" replace />  //login 되어 있다면 project 1로 이동
            ) : (
              <Introduction />  //login 되어 있지 않을 때 main page로 이동
            )
        }/>   
        <Route path="/project" element={<Project projectId={0}/>} />                 {/** project-issues page */}
        <Route path="/project/filter" element={<Filter projectId={0}/>} />           {/** project-filter page */}
        <Route path="/project/dashBoard" element={<DashBoard projectId={0}/>} />     {/** project-dashboard page */}
        <Route path="/project/metaInfo" element={<MetaInfo projectId={0}/>} />       {/** project-metaInfo page */}
        <Route path="/login" element={<Login />} />                         {/** login page */}
        <Route path="/sign" element={<SignUp />} />                       {/** signup page */}
      </Routes>
    </Router>
  );
}


export default App;
