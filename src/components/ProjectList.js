import { Link } from "react-router-dom";
import style from "../styles/ProjectList.module.css"

import axios from "axios";
import { useEffect, useState } from "react";
import { APIURL } from "../source/constants";
import { jwtDecode } from "jwt-decode";


//dummy data
// const projects = [
//     {projectId : 1, title : "Project A", isFavorite : true},
//     {projectId : 2, title : "Project B", isFavorite : true},
//     {projectId : 3, title : "Project C", isFavorite : false},
//     {projectId : 4, title : "Project 4", isFavorite : false},
//     {projectId : 5, title : "Project 5", isFavorite : false},
// ];


function ProjectList(){
    const JWT = localStorage.getItem('JWT');
    const id = jwtDecode(JWT).accountId;

    //project 목록
    const [projects, setProjects] = useState([]);

    //project 목록 받아오기
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${APIURL}/users/${id}/projects`,{
                headers : {
                    'Authorization' : JWT,
                }
            });

            setProjects(response.data);
        }catch(error){
            console.error(error);
        }
    };

    //렌더링 시 project 목록 받아오기
    useEffect(() => {
        fetchProjects();
    }, []);


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
                                {item.favorite && <span className={style.favorite}>★ </span>}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default ProjectList;