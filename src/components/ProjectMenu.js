import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProjectMenu({projectIdx}){
    return (
        <nav>
            <ul className="nav d-flex justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link ms-3" to={`/project/${projectIdx}`}>Issues</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to={`/project/${projectIdx}/filter`}>Filter</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to={`/project/${projectIdx}/dashBoard`}>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link mx-3" to={`/project/${projectIdx}/metaInfo`}>Meta Info</Link>
                </li>
            </ul>
        </nav>
    );
}

ProjectMenu.propTypes = {
    projectIdx : PropTypes.number.isRequired,
}


export default ProjectMenu;