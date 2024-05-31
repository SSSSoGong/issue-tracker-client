import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import UserSearchForm from "../components/UserSearchForm";
import ProjectInfoInputForm from "../components/ProjectInfoInputForm";
import axios from "axios";
import { APIURL } from "../source/constants";


//button style 코드
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'red',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft : "5px",
};


function ProjectModification({userInfo, setUserInfo}) {
    const navigate = useNavigate();

    const {projectId} = useParams();

    //생성할 proejct 정보
    const [projectInfo, setProjectInfo] = useState({
        projectName : "",
        subject : "",
    });

    //project에 참여할 user 목록
    /* 객체(userName, role, accountId) 의 배열 */
    const [participants, setParticipants] = useState([]);


    //API 콜 실행
    //project Info와 participants를 초기화
    const initializeProjectInfo = () => {
        //dummycode
        setProjectInfo({
            projectName : "Cool project", subject : "awesome subject"
        });

        setParticipants([
            {accountId : "leader", role : "PL", userName : "IM Leader"}
        ]);
    };

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setProjectInfo({
            ...projectInfo,
            [name] : value,
        });
    };

    //project 생성 event handling
    const handleSubmit = (e) => {
        e.preventDefault();


        //dummy code
        console.log(projectInfo);
        console.log(participants);
        navigate('/');
        //main으로 이동
    }

    //project 삭제 버튼 click event handling
    const handleDelete = async (e) => {
        //API call 지점
        try {
            const response = await axios.delete(`${APIURL}/projects/${projectId}`,{
                headers : {
                    'Authorization' : userInfo.JWT
                }
            });
            alert("프로젝트 삭제되었습니다");
            navigate('/');
        } catch(error){
            console.error(error.message);
        }
        

        
    }

    //초기화 실행
    useEffect(() => {
        initializeProjectInfo()
    }, []); 

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div className="center_area">
                <ProjectList />
                <main className="project_area">
                    <ProjectMenu />
                    <section className="main_section">
                        <ProjectInfoInputForm
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit}
                            projectName={projectInfo.projectName}
                            subject={projectInfo.subject}
                            />
                        <UserSearchForm 
                            participants={participants}
                            setParticipants={setParticipants}
                            />
                        <button style={buttonStyle} onClick={handleDelete}>프로젝트 삭제</button>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
ProjectModification.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default ProjectModification;
