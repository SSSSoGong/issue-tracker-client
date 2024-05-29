import PropTypes from "prop-types";
import style from "../styles/ProjectCreationForm.module.css"

function ProjectInfoInputForm({handleSubmit, handleChange, projectName, subject}){
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
            <button className={style.btn} type="submit">Submit</button>
        </form>
    );
}
ProjectInfoInputForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    projectName : PropTypes.string.isRequired,
    subject : PropTypes.string.isRequired,
}

export default ProjectInfoInputForm;

