import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";
import CommandLine from "../components/CommandLine";
import IssueContent from "../components/IssueContent";
import IssueMetaInfo from "../components/IssueMetaInfo";
import Comments from "../components/Comments";
import CommentInputForm from "../components/CommentInputForm";

//issueContent 용 dummy data 
const issueContentInfo = {
    title : "Awesome Issue",
    description : "This is Cool and Awesome Issue which can be solved soon. So Don't worry about that. It gonna be okay. You know what I mean, right?",
    imgList : [
        "/img1.png",
        "/img2.png",
        "/img3.png",
    ],
};

//issueMetaInfo 용 dummy data
const issueMetaInfos = {
    priority : "MAJOR", 
    state : "NEW", 
    category : "BUG_REPORT", 
    reporter : "TESTER01", 
    reportedDate : "2024-05-27",
};

//comments 용 dummy data
const commentList = [
    {
        commentId : 1,
        content : "comment1",
        writerId : "writer1",
        imageUrls : ["/img1.png", "/img2.png"],
        writerName : "writer1",
    },
    {
        commentId : 2,
        content : "comment2",
        writerId : "writer2",
        imageUrls : [],
        writerName : "writer2",
    },
    {
        commentId : 3,
        content : "comment3",
        writerId : "writer3",
        imageUrls : ["/img1.png"],
        writerName : "writer3",
    },
    {
        commentId : 4,
        content : "comment4",
        writerId : "writer4",
        imageUrls : ["/img1.png", "/img2.png"],
        writerName : "writer4",
    },
    {
        commentId : 5,
        content : "comment5",
        writerId : "writer5",
        imageUrls : [],
        writerName : "writer5",
    },
];

function Issue({userInfo, setUserInfo}){
    const {issueId} = useParams();

    

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
        const urls = files.map(file => URL.createObjectURL(file));
        setNewComment({
            ...newComment,
            imageUrls : urls,
        })
    };

    //comment submit event handling
    const handleSubmit = (e) => {
        e.preventDefault();


        //dummy 코드
        //console.log(newComment);
        commentList.push({
            commentId: commentList.length + 1,
            content: newComment.content,
            writerId: "newWriter",
            imageUrls: newComment.imageUrls,
            writerName: "newWriter",
        });

        //newComment 초기화
        setNewComment({
            content: "",
            imageUrls: [],
        });
    }



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
                            <Comments commentList = {commentList}/>
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