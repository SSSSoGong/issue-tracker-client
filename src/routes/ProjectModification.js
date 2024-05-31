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

    //생성할 project 정보
    const [projectInfo, setProjectInfo] = useState({
        projectName : "",
        subject : "",
    });

    //project에 참여할 user 목록
    /* 객체(userName, role, accountId) 의 배열 */
    const [participants, setParticipants] = useState([]);

    //기존의 project 소속 user 목록
    const [prevParticipants, setPrevParticipants] = useState([]);


    //API 콜 실행
    //project Info와 participants를 초기화
    const initializeProjectInfo = async () => {

        try {
            const response = await axios.get(`${APIURL}/projects/${projectId}`, {
                headers : {
                    'Authorization' : userInfo.JWT, 
                }
            });

            setProjectInfo({
                projectName : response.data.name,
                subject : response.data.subject,
            });

            const response2 = await axios.get(`${APIURL}/projects/${projectId}/users`,{
                    headers : {
                        'Authorization' : userInfo.JWT, 
                    }
                }
            );

            setParticipants(response2.data.map((participant) => ({
                accountId : participant.accountId,
                role : participant.role,
                userName : participant.username,
            })));

            setPrevParticipants(response2.data.map((participant) => ({
                accountId : participant.accountId,
                role : participant.role,
                userName : participant.username,
            })));


        } catch(error) {
            console.error(error.message);
        }

    };

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setProjectInfo({
            ...projectInfo,
            [name] : value,
        });
    };

    //project 수정 event handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try{
            //project 정보 수정
            const requestData = {
                name : projectInfo.projectName,
                subject : projectInfo.subject,
            };
            
            const response = await axios.put(`${APIURL}/projects/${projectId}`, requestData , {
                headers : {
                    'Authorization' : userInfo.JWT, 
                }
            });

            //project 소속 user 정보 수정

                //삭제할 user 배열
            const deletes = prevParticipants
                .filter(prev => !participants.some(curr => curr.accountId === prev.accountId))
                .map(prev => prev.accountId);


                //추가할 user 배열
            const adds = participants
                .filter(curr => !prevParticipants.some(prev => prev.accountId === curr.accountId))
                .map(curr => ({ accountId: curr.accountId, role: curr.role }));

            

                //user 삭제 API 호출 
            const response2 = await axios.delete(`${APIURL}/projects/${projectId}/users`, {
                headers : {
                    'Authorization' : userInfo.JWT, 
                },
                data : deletes
            });

                //user 추가 API 호출
            const response3 = await axios.post(`${APIURL}/projects/${projectId}/users`, adds, {
                headers : {
                    'Authorization' : userInfo.JWT, 
                }
            });

            //project metaInfo page로 이동
            navigate(-1);
        } catch(error) {
            console.error(error.message);
            navigate(-1);
        }
        
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
                            userInfo={userInfo}
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
