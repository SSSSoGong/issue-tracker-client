import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueInfoInputForm from "../components/IssueInfoInputForm";

function IssueCreation({userInfo, setUserInfo}){
    const navigate = useNavigate();
    
    //생성할 issue 정보
    const [issueInfo, setIssueInfo] = useState({
        title : "",
        description : "",
        priority : "",
        category : "",
        imageUrls : [],
    })

    //----------------------------------------------------------------
    // issue 생성 event handler 코드
    //----------------------------------------------------------------

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setIssueInfo({
            ...issueInfo,
            [name] : value,
        });
    };

    //image 추가 event handling
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setIssueInfo((prev) => ({
            ...prev,
            imageUrls : [...prev.imageUrls, ...files],
        }))
    };

    //issue 생성 event handling
    const handleSubmit = (e) => {
        e.preventDefault();


        //dummy code
        console.log(issueInfo);

        //main으로 이동
        navigate('/');
    }




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
                        handleImageChange={handleImageChange}
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
IssueCreation.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default IssueCreation;


//comment?(수정시)