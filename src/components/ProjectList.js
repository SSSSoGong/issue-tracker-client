import { Link } from "react-router-dom";
import style from "../styles/ProjectList.module.css"

//dummy data
const projects = [
    {projectId : 1, title : "Project A", isFavorite : true},
    {projectId : 2, title : "Project B", isFavorite : true},
    {projectId : 3, title : "Project C", isFavorite : false},
    {projectId : 4, title : "Project 4", isFavorite : false},
    {projectId : 5, title : "Project 5", isFavorite : false},
];

function ProjectList(){
    return (
        <aside id="aside-menu" className="d-flex flex-column" style={{ width: '200px', borderRight: '1px solid #ddd' }}>
            
            <Link to={`/project-create`} className={style.link}>
                New
            </Link>

            <nav className="nav flex-column align-items-center">
                <ul className={`nav d-flex flex-column align-items-center ${style.list}`}>
                    {projects.map((item) => (
                        <li className={`${style.list_item}`}>
                            <Link className={`nav-link ${style.item}`} to={{pathname: `/project/${item.projectId}`}}>
                                {item.isFavorite && <span className={style.favorite}>★ </span>}
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default ProjectList;