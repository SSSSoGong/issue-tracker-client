import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import ProjectFooter from "../components/ProjectFooter";
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


function Project({userInfo, setUserInfo}) {
    const {projectId} = useParams();
    

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <FavoriteComponent />
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