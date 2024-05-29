import PropTypes from "prop-types";
import { useState } from "react";

import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ProjectCreationForm from "../components/ProjectCreationForm";
import UserSearchForm from "../components/UserSearchForm";


function ProjectCreation({userInfo, setUserInfo}) {
    const navigate = useNavigate();

    //생성할 proejct 정보
    const [newProjectInfo, setNewProjectInfo] = useState({
        projectName : "",
        subject : "",
    });

    //project에 참여할 user 목록
    /* 객체(userName, role, accountId) 의 배열 */
    const [participants, setParticipants] = useState([]);

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewProjectInfo({
            ...newProjectInfo,
            [name] : value,
        });
    };

    //project 생성 event handling
    const handleSubmit = (e) => {
        e.preventDefault();


        //dummy code
        console.log(newProjectInfo);
        console.log(participants);
        navigate('/');
        //main으로 이동
    }

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <section className="main_section">
                        <ProjectCreationForm
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit}
                            projectName={newProjectInfo.projectName}
                            subject={newProjectInfo.subject}
                            />
                        <UserSearchForm 
                            participants={participants}
                            setParticipants={setParticipants}
                            />
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