import PropTypes from "prop-types";
import style from "../styles/IssueList.module.css"
import { Link, useParams } from "react-router-dom";


function IssueList({Issues}) {
    const {projectId} = useParams();

    return (
        <ul className={style.frame}>
            {
                Issues.map((item, idx) => (
                    <Link className={style.link} to={{pathname : `/project/${projectId}/issue/${item.issueId}`}}>
                        <li className={style.issueFrame} key={idx}>
                            <div className={style.state}>{item.state}</div>
                            <div className={style.priority}>{item.priority}</div>
                            <div className={style.title}>{item.title}</div>
                        </li>
                    </Link>
                ))
            }
        </ul>
    );
}
IssueList.propTypes = {
    Issues : PropTypes.arrayOf(PropTypes.shape({
        state : PropTypes.string.isRequired,
        priority : PropTypes.string.isRequired,
        title : PropTypes.string.isRequired,
        issueId : PropTypes.string.isRequired,
    })).isRequired,
}

export default IssueList;
