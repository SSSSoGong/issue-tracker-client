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
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(searchInfo);
    }


    //issues 목록 초기화
    //각 권한에 맞게
    const fetchIssues = async () => {
        setLoading(true);

        try {
            const fetchCondition = {

            };


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

