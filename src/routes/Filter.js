import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import ProjectFooter from "../components/ProjectFooter";

import '../styles/default_layout.css'
import BarChart from "../components/BarChart";



function Filter({isLogin, userName, setIsLogin}) {
    const {projectId} = useParams();

    return (
        <div>
            <MainHeader isLogin={isLogin} userName={userName} setIsLogin={setIsLogin}/>
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
    isLogin : PropTypes.bool.isRequired,
    userName : PropTypes.string,
    setIsLogin : PropTypes.func,
};


export default Filter;