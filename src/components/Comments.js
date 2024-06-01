import PropTypes from "prop-types";
import style from "../styles/Comments.module.css"
import { APIURL } from "../source/constants";
import DeleteAccountBtn from "./DeleteAccountBtn"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



function Comments({userInfo, commentList}) {
    const {issueId} = useParams();
    const navigate = useNavigate();

    //image 못 찾은 경우, default로 설정
    const handleImageError = (e) => {
        e.target.src = "/no-image.png";
    };

    //comment 삭제 event handler
    const handleDeleteClick = async(e) => {
        const commentId = e.target.value;


        try {
            const response = await axios.delete(`${APIURL}/issues/${issueId}/comments/${commentId}`,{
                headers : {
                    'Authorization' : userInfo.JWT, 
                }
            })
        }catch(error){
            if (error.response) {
                // 서버가 응답을 반환했지만 요청이 실패한 경우
                //error.response.status : 상태 코드 (409, 404)
                if(error.response.status == "400")
                    alert('권한이 없습니다');
                else if(error.response.stauts == "500")
                    alert('권한이 없습니다');

            } else {
                // 요청 자체가 실패한 경우
                console.error('Error registering user:', error.message);
            }
        }finally {
            navigate(0);
        }
    };

    

    return(
        <ul className={style.frame}>
            {commentList.map((item,idx) => (
                <li className={style.comment} key={idx} >
                    <div className={style.wrtierFrame}>{item.writerName}</div>
                    <div className={style.contentFrame}>{item.content}</div>
                    <ul className={style.imgsFrame}>
                        {item.imageUrls.map((imgUrl, index) => (
                            <li key={index} className={style.imgFrame}>
                                <img src={`${APIURL}${imgUrl}`} alt="image" onError={handleImageError} />
                            </li>
                        ))}
                    </ul>
                    <DeleteAccountBtn 
                        handleDelete={handleDeleteClick} 
                        ment = {"Delete"}
                        commentId = {item.id}
                        visible = {(item.writerId == jwtDecode(userInfo.JWT).accountId)}
                        />
                </li>
            ))}
        </ul>
    );
}
Comments.propTypes = {
    userInfo : PropTypes.object.isRequired,
    commentList : PropTypes.arrayOf(
        PropTypes.shape({
            commentId : PropTypes.number,
            content : PropTypes.string,
            writerId : PropTypes.string,
            imageUrls : PropTypes.array,
            writerName : PropTypes.string,
        })
    ).isRequired,
}


export default Comments;