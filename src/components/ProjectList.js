import { Link } from "react-router-dom";

function ProjectList(){
    return (
        <aside id="aside-menu" className="d-flex flex-column" style={{ width: '200px', borderRight: '1px solid #ddd' }}>
            <button type="button" className="btn btn-outline-secondary m-3">New</button>
            <nav className="nav flex-column align-items-center">
                <ul className="nav d-flex flex-column align-items-center">
                    <li><Link className="nav-link" to="/project/1">project 1</Link></li>
                    <li><Link className="nav-link" to="/project/2">project 2</Link></li>
                    <li><Link className="nav-link" to="/project/3">project 3</Link></li>
                    <li><Link className="nav-link" to="/project/4">project 4</Link></li>
                    <li><Link className="nav-link" to="/project/5">project 5</Link></li>
                </ul>
            </nav>
        </aside>
    );
}

export default ProjectList;