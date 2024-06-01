import PropTypes from "prop-types";
import { priorities, categories } from "../source/constants";
import style from "../styles/IssueInfoInputForm.module.css"

function IssueInfoInputForm({handleSubmit, handleChange, handleImageChange, title, description, priority, category, imageFileNames}){
    
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
            <div className={style.IssueInfoFrame}>
                <div className={style.box}>
                    <label className={style.label} htmlFor="projectName">Issue Title</label>
                    <input 
                        className={style.input}
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                
                <div className={style.box}>
                    <label className={style.label} htmlFor="description">Description</label>
                    <textarea
                        className={style.textarea}
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        ></textarea>
                </div>

                <div className={style.box}>
                    <label className={style.label} htmlFor="imageUrls">images</label>
                    <input 
                        className={style.files}
                        id="imageUrls"
                        name="imageUrls"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                        />
                    {renderImageFileNames()}
                </div>

                <div className={style.selectBox}>
                    <label className={style.selectLabel} htmlFor="category">Category</label>
                    <select
                        className={style.selectBox}
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleChange}>
                        {categories.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option> 
                        ))}
                    </select>
                </div>

                <div className={style.selectBox}>
                    <label className={style.selectLabel} htmlFor="priority">Priority</label>
                    <select
                        className={style.selectBox}
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={handleChange}>
                        {priorities.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option> 
                        ))}
                    </select>
                </div>

            </div>
            <button className={style.btn} type="submit">Submit</button>
        </form>
    );
}
IssueInfoInputForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleImageChange : PropTypes.func.isRequired,

    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    priority : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,

    imageFileNames : PropTypes.array.isRequired,
}

export default IssueInfoInputForm;

//title, description
//priority, category
