import { Link } from "react-router-dom";
import linkStyle from "../styles/Links.module.css"
import style from "../styles/ProjectContent.module.css"

const IssueList = [
    {title : "Issue 1", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 1},
    {title : "Issue 2", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 2},
    {title : "Issue 3", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 3},
    {title : "Issue 4", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 4},
    {title : "Issue 5", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 5},
]

function ProjectContent(){
    return (
        <ul className={`${style.list_section}`}>
            <li className="lists">
                <div className="list-tag">NEW</div>
                <ul className="list">
                    {IssueList.map((issue) => (
                        <li className="item"><Link to={{pathname: `/project/1/${issue.id}`}} className={`${linkStyle.link_black}`}>
                            <div className="item-title">{issue.title}</div>
                            <div className="item-desc">{issue.description}</div>
                        </Link></li>
                    ))}
                </ul>
            </li>

            <li className="lists">
                <div className="list-tag">ASSIGNED</div>
                <ul className="list">
                    {IssueList.map((issue) => (
                        <li className="item"><Link to={{pathname: `/project/1/${issue.id}`}} className={`${linkStyle.link_black}`}>
                            <div className="item-title">{issue.title}</div>
                            <div className="item-desc">{issue.description}</div>
                        </Link></li>
                    ))}
                </ul>
            </li>

            <li className="lists">
                <div className="list-tag">FIXED</div>
                <ul className="list">
                    {IssueList.map((issue) => (
                        <li className="item"><Link to={{pathname: `/project/1/${issue.id}`}} className={`${linkStyle.link_black}`}>
                            <div className="item-title">{issue.title}</div>
                            <div className="item-desc">{issue.description}</div>
                        </Link></li>
                    ))}
                </ul>
            </li>

            <li className="lists">
                <div className="list-tag">RESOLVED</div>
                <ul className="list">
                    {IssueList.map((issue) => (
                        <li className="item"><Link to={{pathname: `/project/1/${issue.id}`}} className={`${linkStyle.link_black}`}>
                            <div className="item-title">{issue.title}</div>
                            <div className="item-desc">{issue.description}</div>
                        </Link></li>
                    ))}
                </ul>
            </li>

            <li className="lists">
                <div className="list-tag">CLOSED</div>
                <ul className="list">
                    {IssueList.map((issue) => (
                        <li className="item"><Link to={{pathname: `/project/1/${issue.id}`}} className={`${linkStyle.link_black}`}>
                            <div className="item-title">{issue.title}</div>
                            <div className="item-desc">{issue.description}</div>
                        </Link></li>
                    ))}
                </ul>
            </li>

        </ul>

        


    );
}

export default ProjectContent