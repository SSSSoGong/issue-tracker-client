import PropTypes from "prop-types";
import style from "../styles/CommentInputForm.module.css"


function CommentInputForm({handleSubmit, handleChange, handleImageChange, content}){
    
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
}

export default CommentInputForm;