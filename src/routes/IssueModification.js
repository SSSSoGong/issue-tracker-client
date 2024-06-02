import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import IssueInfoInputForm from "../components/IssueInfoInputForm";
import { APIURL } from "../source/constants";
import axios from "axios";

function IssueModification({userInfo, setUserInfo}){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const {issueId, projectId} = useParams();

    // 추가: 이미지 파일 이름을 저장할 상태
    const [imageFileNames, setImageFileNames] = useState([]);
    
    //issue 정보
    const [issueInfo, setIssueInfo] = useState({
        title : "",
        description : "",
        priority : "",
        category : "",
        iamgeUrls : [],
    })

    //issue 정보 초기화
    //API 호출하는 지점
    const initializeIssueInfo = async () => {
        setLoading(true);
        
        try{
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
                imageUrls : [],
            });

        }catch(error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
        
    }

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

    //issue 생성 event handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const formData = new FormData();

            for(let i =0; i<issueInfo.imageUrls.length; i++){
                formData.append('imageFiles', issueInfo.imageUrls[i]);
            }


            const contentData = {
                title : issueInfo.title,
                description : issueInfo.description,
                priority : issueInfo.priority,
                category : issueInfo.category,
            }
            const contentJson = JSON.stringify(contentData);
            const blob = new Blob([contentJson], {type : "application/json"});

            formData.append('requestDto', blob);

            const config = {
                headers : {
                    'Authorization' : userInfo.JWT,
                },
            };

            await axios.put(`${APIURL}/projects/${projectId}/issues/${issueId}`, formData, config);


        }catch(error) {
            console.error(error);

        }finally{
            //issue page로 이동
            navigate(-1);
        }
    }

    //초기화 실행
    useEffect(() => {
        initializeIssueInfo()
    }, []); 

    if(loading){
        return(
            <div>Loading...</div>
        );
    };


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
IssueModification.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default IssueModification;


//comment?(수정시)