import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import ProjectFooter from "../components/ProjectFooter";

import '../styles/default_layout.css'
import BarChart from "../components/BarChart";



function Filter({userInfo, setUserInfo}) {
    const {projectId} = useParams();

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <ProjectMenu />
                    <section class="main_section">
                        <BarChart />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
Filter.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};


export default Filter;