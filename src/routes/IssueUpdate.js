import PropTypes from "prop-types";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueInfo from "../components/IssueInfo";
import { useEffect, useState } from "react";
import StateUpdateInputForm from "../components/StateUpdateInputForm";
import { useNavigate, useParams } from "react-router-dom";
import AssigneeSelectForm from "../components/AssigneeSelectForm";

const arrowStyle = {
    textAlign : "center",
    fontSize : "50px",
}



function IssueUpdate({userInfo, setUserInfo}){
    const navigate = useNavigate();
    const {projectId, issueId} = useParams();

    //dummy data
    const issueInfo = {
        title : "Cool Issue",
        description : "It is cool issue",
        priority : "MAJOR",
        category : "BUG_REPORT",
        state : "NEW",
    }

    //다음에 갱신할 state
    const [nextState, setNextState] = useState('');

    const [comment, setComment] = useState('');

    //assignee로 지정할 user의 accountId
    const [assignee, setAssignee] = useState('');

    //assignee로 지정 가능한 user List
    const [devsList, setDevsList] = useState();

    //추천 assignee List
    const [recommendedDevsList, setRecommendedDevsList] = useState();


    

    //nextState 초기화
    const initialize_nextState = () => {
        setNextState('ASSIGNED');
    }

    //추천 assignee List 초기화   
    //API call
    const initialize_RecommendedDevsList = () => {

        //dummy code
        setRecommendedDevsList([
            {accountId : "dev1", userName : "john"},
            {accountId : "dev2", userName : "James"}
        ])
    };

    //developer list 초기화
    const initialize_devsList = () => {

        //dummy code
        setDevsList([
            {accountId : "dev1", userName : "john"},
            {accountId : "dev2", userName : "James"},
            {accountId : "dev3", userName : "Micky"},
            {accountId : "dev4", userName : "Cane"},
            {accountId : "dev5", userName : "Lana"},
        ])
    };


    //최초 랜더링 시 초기화 실행
    useEffect(() => {
        initialize_RecommendedDevsList();
        initialize_devsList();
        initialize_nextState();
    }, []);

    //assignne 지정을 위한 click event handling
    const handleClick = (event) => {
        
        setAssignee(event.target.value);
        
    };


    //form의 값 변경 handling
    const handleChange = (event) => {
        const {value} = event.target;
        setComment(value);
    };

    //issue 생성 event handling
    //api 호출 지점
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Comment", comment);
        console.log("Assignee", assignee);

        //issue page로 이동
        navigate(`/project/${projectId}/issue/${issueId}`);
    }



    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <ProjectMenu />
                    <section class="main_section">
                        <IssueInfo
                            title={issueInfo.title}
                            description={issueInfo.description}
                            priority={issueInfo.priority}
                            category={issueInfo.category}
                            state={issueInfo.state}
                            />
                        <div class="arrowDown" style={arrowStyle}>
                            ↓
                        </div>
                        
                        <StateUpdateInputForm
                            nextState={nextState}
                            comment={comment}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            />
                        {
                            nextState === 'ASSIGNED' 
                            && <AssigneeSelectForm
                                    assignee={assignee}
                                    recommendedDevsList={recommendedDevsList}
                                    devsList={devsList}
                                    handleClick={handleClick}
                                    />
                        }
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
IssueUpdate.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default IssueUpdate;

