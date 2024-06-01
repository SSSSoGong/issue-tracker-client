import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueInfoInputForm from "../components/IssueInfoInputForm";
import axios from "axios";
import { APIURL } from "../source/constants";

function IssueCreation({userInfo, setUserInfo}){
    const navigate = useNavigate();

    const {projectId} = useParams();
    
    //생성할 issue 정보
    const [issueInfo, setIssueInfo] = useState({
        title : "",
        description : "",
        priority : "BLOCKER",
        category : "TODO",
        imageUrls : [],
    })

    //----------------------------------------------------------------
    // issue 생성 event handler 코드
    //----------------------------------------------------------------

    // 추가: 이미지 파일 이름을 저장할 상태
    const [imageFileNames, setImageFileNames] = useState([]);

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
        }));

        // 파일 이름 추출하여 저장
        const fileNames = files.map(file => file.name);
        setImageFileNames(prevNames => [...prevNames, ...fileNames]);
    };

    //issue submit event handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            //content를 JSON 형식으로 변환
            const contentData = {
                title : issueInfo.title,
                description : issueInfo.description,
                category : issueInfo.category,
                priority : issueInfo.priority,
            }
            const contentJson = JSON.stringify(contentData);
            const blob = new Blob([contentJson], {type : "application/json"});

            const formData = new FormData();

            for(let i =0; i<issueInfo.imageUrls.length; i++){
                formData.append('imageFiles', issueInfo.imageUrls[i]);
            }

            formData.append('requestDto', blob);

            const config = {
                headers : {
                    'Authorization' : userInfo.JWT,
                },
            };

            const respone = await axios.post(`${APIURL}/projects/${projectId}/issues`, formData, config);



            navigate(`/project/${projectId}/issue/${respone.data.issueId}`);

        }catch(error){
            console.error(error);
            alert('생성에 실패했습니다');
        }
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
                        imageFileNames={imageFileNames}
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