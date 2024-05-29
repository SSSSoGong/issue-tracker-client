import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import ProjectFooter from "../components/ProjectFooter";
import ProjectContent from "../components/ProjectContent";
import FavoriteComponent from "../components/FavoriteComponent";


function Project({userInfo, setUserInfo}) {
    const {projectId} = useParams();
    

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <FavoriteComponent />
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