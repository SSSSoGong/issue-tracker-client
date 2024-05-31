import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import ProjectContent from "../components/ProjectContent";
import FavoriteComponent from "../components/FavoriteComponent";

//button style 코드
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft : "5px",
};

//description style 코드
const desStyle = {
    height : "70vh",
    textAlign : "center",
    paddingTop : "20vh",
    fontSize : "2.5em",
}


function Project({userInfo, setUserInfo}) {
    const {projectId} = useParams();
    

    //로그인 하자마자 보이는 default page
    if(projectId == '0'){
        return(
            <div>
                <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
                <div className="center_area">
                    <ProjectList />
                    <main className="project_area">
                        <section className="main_section">
                            <div className="description" style={desStyle}>Welcome</div>
                        </section>   
                    </main>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <FavoriteComponent 
                            userInfo={userInfo}
                            />
                        <Link to="issue-create" style={buttonStyle}>New Issue</Link>
                    </div>
                    <section className="main_section">
                        <ProjectContent projectId={projectId}/>
                    </section>   
                </main>
            </div>
            <Footer />
        </div>
    );
}
Project.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default Project;