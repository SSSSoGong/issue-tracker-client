import PropTypes from "prop-types";
import { useState } from "react";
import { APIURL } from "../source/constants";
import axios from "axios";

import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ProjectInfoInputForm from "../components/ProjectInfoInputForm";
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


    //submit 버튼 클릭 event handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData1 = {
            name : newProjectInfo.projectName,
            subject : newProjectInfo.subject,
        }

        const requestData2 = participants.map(participant => ({
            accountId : participant.accountId,
            role : participant.role
        }));

        const config = {
            headers : {
                'Authorization' : userInfo.JWT,
            }
        };

        try {
            //새 프로젝트 생성
            const response1 = await axios.post(`${APIURL}/projects`, requestData1, config);
            const newProjectId = response1.data.projectId;

            //프로젝트에 유저 추가
            //const response2 = await axios.post(`${APIURL}/projects/${newProjectId}/users`, requestData2, config);
            console.log(requestData2);

             //생성한 프로젝트 페이지로 이동
            navigate(`/project/${newProjectId}`);

        } catch (error) {
            alert("생성에 실패했습니다");
            console.error("Error : ", error);
        }
    
    }

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <section className="main_section">
                        <ProjectInfoInputForm
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
