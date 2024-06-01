import PropTypes from "prop-types";
import style from "../styles/CommentInputForm.module.css"


function CommentInputForm({handleSubmit, handleChange, handleImageChange, content, imageFileNames}){
    
    // 추가: 이미지 파일 이름 표시
    const renderImageFileNames = () => {
        return (
            <ul>
                {imageFileNames.map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                ))}
            </ul>
        );
    };

    return(
        <form className={style.frame} onSubmit={handleSubmit}>
            <textarea
            className={style.contentBox}
            id="content"
            name="content"
            placeholder="comment"
            value={content}
            onChange={handleChange}
            required
            ></textarea>
            {renderImageFileNames()}
            <input 
                className={style.files}
                id="imageUrls"
                name="imageUrls"
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                />
            <button className={style.btn} type="submit">Add Comment</button>
        </form>
    );
}
CommentInputForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    imageFileNames : PropTypes.array.isRequired,
}

export default CommentInputForm;