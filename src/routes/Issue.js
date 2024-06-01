import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import CommandLine from "../components/CommandLine";
import IssueContent from "../components/IssueContent";
import IssueMetaInfo from "../components/IssueMetaInfo";
import Comments from "../components/Comments";
import CommentInputForm from "../components/CommentInputForm";
import axios from "axios";
import { APIURL } from "../source/constants";


function Issue({userInfo, setUserInfo}){
    const {issueId, projectId} = useParams();
    const [loading, setLoading] = useState(true);

    //----------------------------------------------------------------
    //Comment 관리 코드
    //----------------------------------------------------------------

    //새로운 comment
    const [newComment, setNewComment] = useState({
        content : "",
        imageUrls : [],
    })

    //form의 값 변경 handling
    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewComment({
            ...newComment,
            [name] : value,
        });
    };

    //image 추가 event handling
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewComment((prev) => ({
            ...prev,
            imageUrls : [...prev.imageUrls, ...files],
        }))


        
    };

    //comment submit event handler
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            //content를 JSON 형식으로 변환
            const contentData = {
                content: newComment.content
            };
            const contentJson = JSON.stringify(contentData);
            const blob = new Blob([contentJson], {type : "application/json"});

            const formData = new FormData();

            formData.append('content', blob);




            for(let i =0; i<newComment.imageUrls.length; i++){
                formData.append('imageFiles', newComment.imageUrls[i]);
            }

            
            const config = {
                headers : {
                    'Authorization' : userInfo.JWT,
                },
            };

            await axios.post(`${APIURL}/issues/${issueId}/comments`, formData, config);
        
        }catch(error) {
            console.error(error);

        }finally {

            //newComment 초기화
            setNewComment({
                content: "",
                imageUrls: [],
            });

            //화면 갱신
            fetchData();
        }
    }


    //----------------------------------------------------------------
    //data fecth 코드
    //----------------------------------------------------------------

    const [issueMetaInfos, setIssueMetaInfos] = useState({
        priority : "", 
        state : "", 
        category : "", 
        reporter : "", 
        reportedDate : "",
    });

    const [issueContentInfo, setIssueContentInfo] = useState({
        title : "",
        description : "",
        imgList : [],
    }) 

    const [commentList, setCommentList] = useState([]); 


    //issue 정보 갱신
    const fetchData = async() => {

        setLoading(true);

        try{

            //issue 세부 정보 fetch
            const response = await axios.get(`${APIURL}/projects/${projectId}/issues/${issueId}`,{
                headers : {
                    'Authorization' : userInfo.JWT
                }
            })

            setIssueContentInfo({
                title : response.data.title,
                description : response.data.description,
                imgList : response.data.imageUrls,
            })

            setIssueMetaInfos({
                priority : response.data.priority, 
                state : response.data.state, 
                category : response.data.category, 
                reporter : response.data.reporter, 
                reportedDate : response.data.reportedDate.slice(0,10),
            })


            //issue에 속한 comment 목록 갱신
            const response2 = await axios.get(`${APIURL}/issues/${issueId}/comments`);


            setCommentList(response2.data);
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
        
    };

    //초기화 실행
    useEffect(() => {
        fetchData();
    }, []);


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
                <div class="center_area">
                    <ProjectList />
                    <main class="project_area">
                        <ProjectMenu />
                        <section class="main_section">
                            <CommandLine issueId={issueId}/>
                            <IssueContent 
                                title = {issueContentInfo.title} 
                                description={issueContentInfo.description} 
                                imgList={issueContentInfo.imgList}
                                />
                            <IssueMetaInfo 
                                priority = {issueMetaInfos.priority}
                                state = {issueMetaInfos.state}
                                category = {issueMetaInfos.category}
                                reporter = {issueMetaInfos.reporter}
                                reportedDate = {issueMetaInfos.reportedDate}
                                />
                            <Comments 
                                userInfo = {userInfo}
                                commentList = {commentList}/>
                            <CommentInputForm 
                                handleSubmit={handleSubmit} 
                                handleChange={handleChange} 
                                handleImageChange={handleImageChange}
                                content={newComment.content} 
                                />
                        </section>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
Issue.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};


export default Issue