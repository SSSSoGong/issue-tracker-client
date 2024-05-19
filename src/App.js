
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Project from './routes/Project';
import Filter from './routes/Filter';
import MetaInfo from './routes/MetaInfo';
import DashBoard from './routes/DashBoard';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

//test용 import
import MainHeader from './components/MainHeader';
import ProjectList from './components/ProjectList';
import ProjectMenu from './components/ProjectMenu';



function App() {
  const userInfo = {
    isLogined : true,
    userName : "TESTER0123412",
  }


  return (
    <Router>
      <Routes>
        <Route path="/test" element={<ProjectMenu projectIdx={1}/>} />                     {/** test용 page */}
        
        {/** main page */}
        <Route path="/"                                                     
            element={                                          
            userInfo.isLogined ? (
              <Navigate to="project/1" replace />  //login 되어 있다면 project 1로 이동
            ) : (
              <h1>main</h1>   //login 되어 있지 않을 때 main page로 이동
            )
        }/>   
        <Route path="/project/:idx" element={<Project />} />                 {/** project-issues page */}
        <Route path="/project/:idx/filter" element={<Filter />} />           {/** project-filter page */}
        <Route path="/project/:idx/dashBoard" element={<DashBoard />} />     {/** project-dashboard page */}
        <Route path="/project/:idx/metaInfo" element={<MetaInfo />} />       {/** project-metaInfo page */}
        <Route path="/login" element={<Login />} />                         {/** login page */}
        <Route path="/sign" element={<SignUp />} />                       {/** signup page */}
      </Routes>
    </Router>
  );
}


export default App;
