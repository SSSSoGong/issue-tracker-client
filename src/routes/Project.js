import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import ProjectFooter from "../components/ProjectFooter";
import ProjectContent from "../components/ProjectContent";


function Project({isLogin, userName}) {
    const {projectId} = useParams();
    

    return (
        <div>
            <MainHeader isLogin={isLogin} userName={userName}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <section className="main_section">
                        <ProjectContent projectId={projectId}/>
                    </section>
                    <ProjectFooter projectId={projectId}/>
                </main>
            </div>
            <Footer />
        </div>
    );
}
Project.propTypes = {
    isLogin : PropTypes.bool.isRequired,
    userName : PropTypes.string,
};

export default Project;