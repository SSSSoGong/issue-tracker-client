import PropTypes from "prop-types";

import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import Footer from "../components/Footer";


function ProjectCreation({userInfo, setUserInfo}) {

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <section className="main_section">
                        <h1>new project</h1>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
ProjectCreation.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default ProjectCreation;
