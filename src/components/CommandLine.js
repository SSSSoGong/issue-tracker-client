import { Link, useNavigate } from "react-router-dom";
import style from "../styles/CommandLine.module.css"
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../source/constants";

function CommandLine({isUpdatable, isEditable, isDeletable, userInfo}){
    const {issueId, projectId} = useParams();

    const navigate = useNavigate();

    //이슈 삭제 event handler
    const handleDelete = async() => {
        try{
            await axios.delete(`${APIURL}/projects/${projectId}/issues/${issueId}`, {
                headers : {
                    'Authorization' : userInfo.JWT, 
                }
            })

            navigate(`/project/${projectId}`);
        }catch(error){
            console.error(error);
        }
    };


    return(
        <div className={style.frame}>
            {isUpdatable && <Link className={style.link} to={{ pathname: `update`}}>Update</Link>}
            <div classname={style.forCreater}>
                {isEditable && <Link className={style.link} to={{ pathname: `modify`}}>수정</Link>}
                {isDeletable && <Link className={style.link} to="#" onClick={handleDelete}>삭제</Link>}
            </div>
        </div>
    );
};
CommandLine.propTypes = {
    isUpdatable : PropTypes.bool.isRequired,
    isEditable : PropTypes.bool.isRequired,
    isDeletable : PropTypes.bool.isRequired,
    userInfo : PropTypes.object.isRequired,
}




export default CommandLine;