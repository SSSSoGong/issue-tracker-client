import PropTypes from "prop-types";
import style from "../styles/ProjectCreationContent.module.css"

function ProjectCreationContent(){
    return(
        <form className={style.frame}>
            <div className={style.projectInfoFrame}>
                <div className={style.nameBox}></div>
            </div>
        </form>
    );
}
ProjectCreationContent.propTypes = {

}

export default ProjectCreationContent;


//name, subject(설명)
//user 추가 (accountId, role)의 배열