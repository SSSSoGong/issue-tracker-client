import { Link } from "react-router-dom";
import style from "../styles/ProjectList.module.css"

//dummy data
const projects = [
    {projectId : 1, title : "Project A"},
    {projectId : 2, title : "Project B"},
    {projectId : 3, title : "Project C"},
    {projectId : 4, title : "Project 4"},
    {projectId : 5, title : "Project 5"},
];

function ProjectList(){
    return (
        <aside id="aside-menu" className="d-flex flex-column" style={{ width: '200px', borderRight: '1px solid #ddd' }}>
            <button type="button" className="btn btn-outline-secondary m-3">New</button>
            <nav className="nav flex-column align-items-center">
                <ul className={`nav d-flex flex-column align-items-center ${style.list}`}>
                    {projects.map((item) => (
                        <li className={`${style.list_item}`}><Link className={`nav-link ${style.item}`} to={{pathname: `/project/${item.projectId}`}}>{item.title}</Link></li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default ProjectList;