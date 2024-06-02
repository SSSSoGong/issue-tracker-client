import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueSearch from "../components/IssueSearch";
import IssueList from "../components/IssueList";
import { APIURL } from "../source/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



function Filter({userInfo, setUserInfo}) {
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true);

    //띄워줄 issue의 목록
    const [issues, setIssues] = useState([]);

    //search할때 사용하는 값
    const [searchInfo, setSearchInfo] = useState({
        title : "",
        priority : "",
        state : "",
        category : "",
        issueCount : "",
        reporter : "",
        fixer : "",
        assignee : "",
    });

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSearchInfo({
            ...searchInfo,
            [name] : value
        });
    };

    //form 제출 handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        let searchCondition = {};

        Object.keys(searchInfo).forEach(key => {
            if (searchInfo[key] !== "") {
                searchCondition[key] = searchInfo[key];
            }
        });

        const searchedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
            headers : {
                'Authorization' : userInfo.JWT
            },
            params : searchCondition
        })

        setIssues(searchedIssues.data.map(issue => ({
            state : issue.state,
            priority : issue.priority,
            title : issue.title,
            issueId : issue.issueId,
        })));

        try {


        }catch(error) {
            console.error(error);
        }
    }


    //issues 목록 초기화
    //각 권한에 맞게
    const fetchIssues = async () => {
        setLoading(true);

        try {

            var fetchCondition = {};

            //프로젝트에서 유저 권한 조회
            const issueNumber = 20;
            const aId = jwtDecode(userInfo.JWT).accountId
            const response = await axios.get(`${APIURL}/users/${aId}/project/${projectId}/role`);

            //검색 조건 설정
            switch(response.data){
                case 'Administrator' : //admin이면 최신 순으로 나열
                    fetchCondition = {
                        issueCount : issueNumber,
                    };
                    break;
                case 'ProjectLeader' :  //PL이면 NEW state의 issue 최신 순 나열
                    fetchCondition = {
                        state : "NEW",
                        issueCount : issueNumber,
                    };
                    break;
                case 'Developer' : //Developer면 자신이 assignee로 지정된 issue 나열
                    fetchCondition = {
                        assignee : aId,
                        issueCount : issueNumber,

                    };
                    break;
                case 'Tester' : //Tester이면, 자신이 reporter인 issue 나열
                    fetchCondition = {
                        reporter : aId,
                        issueCount : issueNumber,

                    };
                    break;
            }

            //이슈 검색
            const searchedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : fetchCondition
            })

            setIssues(searchedIssues.data.map(issue => ({
                state : issue.state,
                priority : issue.priority,
                title : issue.title,
                issueId : issue.issueId,
            })));

            

            console.log(issues);
            


        }catch(error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchIssues();
    }, []);




    if(loading){
        return(
            <div>Loading...</div>
        )
    }


    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <ProjectMenu />
                    <section class="main_section">
                        <IssueSearch 
                            title = {searchInfo.title}
                            issueCount={searchInfo.issueCount}
                            priority={searchInfo.priority}
                            state={searchInfo.state}
                            category={searchInfo.category}
                            reporter={searchInfo.reporter}
                            fixer={searchInfo.fixer}
                            assignee={searchInfo.assignee}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                        <IssueList 
                            Issues={issues}
                        />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
Filter.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};


export default Filter;

