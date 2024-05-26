import PropTypes from "prop-types";
import style from "../styles/projectInfo.module.css"

function ProjectInfo({projectName, subject, createdAt, adminName}){
    return (
        <div className={style.frame}>
            <h1 className={style.title}>{projectName}</h1>
            <div className={style.datas}>
                <div className={style.data}>
                    <div className={style.dataTitle}>Subject</div> 
                    <div className={style.dataContent}>{subject}</div>
                </div>
                <div className={style.data}>
                    <div className={style.dataTitle}>CreatedAt</div> 
                    <div className={style.dataContent}>{createdAt}</div>
                </div>
                <div className={style.data}>
                    <div className={style.dataTitle}>Admin</div> 
                    <div className={style.dataContent}>{adminName}</div>
                </div>
            </div>
        </div>
        
    );
}
ProjectInfo.propTypes = {
    projectName : PropTypes.string.isRequired,
    subject : PropTypes.string.isRequired,
    createdAt : PropTypes.string.isRequired,
    adminName : PropTypes.string.isRequired,
};

export default ProjectInfo;
