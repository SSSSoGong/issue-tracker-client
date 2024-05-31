import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import ProjectInfo from "../components/ProjectInfo";
import UserList from "../components/UserList";
import axios from "axios";
import { APIURL } from "../source/constants";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ModifyBtn from "../components/ModifyBtn";


//button style 코드
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft : "5px",
};

function MetaInfo({userInfo, setUserInfo}) {
    const {projectId}= useParams();

    //project 정보 저장
    const [projectInfo, setProjectInfo] = useState({
        projectName : "",
        subject : "",
        createdAt : "",
        adminName : "",
    })

    //project 참여 유저 정보
    const [users, setUsers] = useState([]);


    const aId = jwtDecode(userInfo.JWT).accountId;

    //현재 유저의 adimin 여부 판단
    const isAdmin = async () => {
        try {

            const response = await axios.get(`${APIURL}/users/${aId}/project/${projectId}/role`)
            return (response.data === "Administrator");
        } catch(error) {
            console.error(error);
        }
    };


    //projectInfo와 userList를 받아오는 API 호출문
    const fetchProjectInfo = async() => {
        try {
            //project 정보 설정
            const response = await axios.get(`${APIURL}/projects/${projectId}`,{
                headers : {
                    'Authorization' : userInfo.JWT
                }
            });
            setProjectInfo({
                projectName : response.data.name,
                subject : response.data.subject,
                createdAt : response.data.createdAt,
                adminName : response.data.adminName,
            });

            //project 포함 user 목록 설정
            const response2 = await axios.get(`${APIURL}/projects/${projectId}/users`,{
                headers : {
                    'Authorization' : userInfo.JWT
                }
            });
            setUsers(response2.data);
            
            
        }catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjectInfo();
    }, []);



    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <ProjectMenu />
                    <section class="main_section">
                        <ProjectInfo 
                            projectName={projectInfo.projectName}
                            subject={projectInfo.subject}
                            createdAt={projectInfo.createdAt}
                            adminName={projectInfo.adminName} />
                        <UserList users={users} />
                        <ModifyBtn 
                            isAdmin={isAdmin}
                            projectId={projectId}
                            />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
MetaInfo.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default MetaInfo;