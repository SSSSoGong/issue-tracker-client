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
import axios from "axios";
import { APIURL } from "../source/constants";

const arrowStyle = {
    textAlign : "center",
    fontSize : "50px",
}



function IssueUpdate({userInfo, setUserInfo}){
    const navigate = useNavigate();
    const {projectId, issueId} = useParams();
    const [loading, setLoading] = useState(true);

    //-----------------------------------------------------------
    //설정할 변수 값
    //-----------------------------------------------------------

    //issue 정보
    const [issueInfo, setIssueInfo] = useState({
        title : "",
        description : "",
        priority : "",
        category : "",
        state : "",
    })

    //다음에 갱신할 state
    const [nextState, setNextState] = useState('');


    //assignee로 지정할 user의 accountId
    const [assignee, setAssignee] = useState('');

    //assignee로 지정 가능한 user List
    const [devsList, setDevsList] = useState();

    //추천 assignee List
    const [recommendedDevsList, setRecommendedDevsList] = useState();
    

    
    //-----------------------------------------------------------
    //data fetch 함수
    //-----------------------------------------------------------

    //초기화 함수
    const fetchData = async () => {
        setLoading(true);

        try {

            //issueInfo 초기화
            const response = await axios.get(`${APIURL}/projects/${projectId}/issues/${issueId}`,{
                headers : {
                    'Authorization' : userInfo.JWT
                }
            })

            setIssueInfo({
                title : response.data.title,
                description : response.data.description,
                priority : response.data.priority,
                category : response.data.category,
                state : response.data.state,
            })


            //nextState 값 초기화
            switch(response.data.state) {
                case 'NEW':
                    setNextState('ASSIGNED');
                    break;
                case 'REOPENED' :
                    setNextState('ASSIGNED');
                    break;
                case 'ASSIGNED' :
                    setNextState('FIXED');
                    break;
                case 'FIXED' :
                    setNextState('RESOLVED');
                    break;
                case 'RESOLVED' :
                    setNextState('CLOSED');
                    break;
            }

            
            //추천 assignee list 초기화
            const recommends = await axios.get(`${APIURL}/projects/${projectId}/issues/${issueId}/assignee-suggestion`, {
                headers : {
                    'Authorization' : userInfo.JWT
                }
            })
            setRecommendedDevsList(recommends.data);

            //developer list 초기화
            const response2 = await axios.get(`${APIURL}/projects/${projectId}/users`,{
                headers : {
                    'Authorization' : userInfo.JWT
                }
            })

            const devs = response2.data
            .filter(dev => dev.role === 'Developer')
            .map(dev => ({ accountId: dev.accountId, username: dev.username }));

            setDevsList(devs)

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }


    


    //최초 랜더링 시 초기화 실행
    useEffect(() => {

        fetchData();
    }, []);


    
    //-----------------------------------------------------------
    //event handler
    //-----------------------------------------------------------

    //assignne 지정을 위한 click event handling
    const handleClick = (event) => {
        
        setAssignee(event.target.value);
        
    };

    //issue 업데이트 event handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        //ASSIGNED로 변경할 때, assignee 가 설정 안되면 취소시키기
        if((nextState === "ASSIGNED") && (
            assignee === ''
        )){
            alert('assignee를 설정하세요');
            return;
        }

        try {

            const config = {
                headers : {
                    'Authorization' : userInfo.JWT,
                },
            };


            //이슈 상태 변경
            const updateData = {
                state : nextState,
                assignee : assignee,
            };

            //console.log(updateData.state);

            const updateJson = JSON.stringify(updateData);
            const updateBlob = new Blob([updateJson], {type : "application/json"});

            const updateFormData = new FormData();

            updateFormData.append('requestDto', updateBlob);

            await axios.post(`${APIURL}/projects/${projectId}/issues/${issueId}/state`, updateFormData, config);
        
            

            //system comment
            const scommentData = {
                content: `[ -- State Update : ${nextState} -- ]`
            };
            const scommentJson = JSON.stringify(scommentData);
            const scommentBlob = new Blob([scommentJson], {type : "application/json"});

            const scommentFormData = new FormData();

            scommentFormData.append('content', scommentBlob);

            await axios.post(`${APIURL}/issues/${issueId}/comments`, scommentFormData, config);
        
            

            
        }catch(error) {
            console.error(error);

        }finally {
            //issue page로 이동
            navigate(`/project/${projectId}/issue/${issueId}`);
        }

    }





    
    //-----------------------------------------------------------
    //return
    //-----------------------------------------------------------


    if(loading){
        return(
            <div>Loading...</div>
        );
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
                            setNextState={setNextState}
                            handleSubmit={handleSubmit}
                            />
 

                        {
                            (nextState === 'ASSIGNED')
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

