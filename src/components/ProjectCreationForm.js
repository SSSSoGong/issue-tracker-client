import PropTypes from "prop-types";
import style from "../styles/ProjectCreationForm.module.css"
import UserSearchForm from "./UserSearchForm";

function ProjectCreationForm({handleSubmit, handleChange, projectName, subject}){
    return(
        <form className={style.frame} onSubmit={handleSubmit}>
            <div className={style.projectInfoFrame}>
                <div className={style.box}>
                    <label className={style.label} htmlFor="projectName">Project Name</label>
                    <input 
                        className={style.input}
                        id="projectName"
                        name="projectName"
                        value={projectName}
                        onChange={handleChange}
                    />
                </div>
                
                <div className={style.box}>
                    <label className={style.label} htmlFor="subject">Subject</label>
                    <textarea
                        className={style.textarea}
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={handleChange}
                        ></textarea>
                </div>
            </div>
            <button className={style.btn} type="submit">프로젝트 생성</button>
        </form>
    );
}
ProjectCreationForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    projectName : PropTypes.string.isRequired,
    subject : PropTypes.string.isRequired,
}

export default ProjectCreationForm;


//name, subject(설명)
//user 추가 (accountId, role)의 배열