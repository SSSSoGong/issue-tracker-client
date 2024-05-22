import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ProjectMenu(){
    const {projectId} = useParams();

    return (
        <nav class="project-menu">
            <ul className="nav d-flex justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link ms-3" to={{ pathname: `/project/${projectId}`}}>Issues</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to={{ pathname: `/project/${projectId}/filter`}}>Filter</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to={{ pathname: `/project/${projectId}/dashBoard`}}>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link mx-3" to={{ pathname: `/project/${projectId}/metaInfo`}}>Meta Info</Link>
                </li>
            </ul>
        </nav>
    );
}


export default ProjectMenu;