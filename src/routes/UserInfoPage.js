import PropTypes from "prop-types";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";

import '../styles/default_layout.css'



function UserInfoPage({userInfo, setUserInfo}) {
    return(
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <section class="main_section">
                        UserInfo
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};
UserInfoPage.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default UserInfoPage;