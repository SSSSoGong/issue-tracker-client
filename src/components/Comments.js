import PropTypes from "prop-types";
import style from "../styles/Comments.module.css"

function Comments({commentList}) {
    //image 못 찾은 경우, default로 설정
    const handleImageError = (e) => {
        e.target.src = "/no-image.png";
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
                                <img src={imgUrl} alt="image" onError={handleImageError} />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
Comments.propTypes = {
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