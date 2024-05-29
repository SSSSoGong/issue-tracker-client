import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueInfoInputForm from "../components/IssueInfoInputForm";

function IssueModification({userInfo, setUserInfo}){
    const navigate = useNavigate();
    
    //issue 정보
    const [issueInfo, setIssueInfo] = useState({
        title : "",
        description : "",
        priority : "",
        category : "",
    })

    //issue 정보 초기화
    //API 호출하는 지점
    const initializeIssueInfo = () => {
        setIssueInfo({
            title : "awesome issue",
            description : "It is awesome issue",
            priority : 'MAJOR',
            category : "BUG_REPORT",
        });
    }

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setIssueInfo({
            ...issueInfo,
            [name] : value,
        });
    };

    //issue 생성 event handling
    const handleSubmit = (e) => {
        e.preventDefault();


        //dummy code
        console.log(issueInfo);

        //main으로 이동
        navigate('/');
    }

    //초기화 실행
    useEffect(() => {
        initializeIssueInfo()
    }, []); 


    return(
        <div>
        <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
        <div class="center_area">
            <ProjectList />
            <main class="project_area">
                <ProjectMenu />
                <section class="main_section">
                    <IssueInfoInputForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        title={issueInfo.title}
                        description={issueInfo.description}
                        priority={issueInfo.priority}
                        category={issueInfo.category}
                        />
                </section>
            </main>
        </div>
        <Footer />
    </div>
    );
}
IssueModification.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default IssueModification;


//comment?(수정시)