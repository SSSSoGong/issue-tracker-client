import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueSearch from "../components/IssueSearch";
import IssueList from "../components/IssueList";




function Filter({userInfo, setUserInfo}) {
    const {projectId} = useParams();

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
                        <IssueList />
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

