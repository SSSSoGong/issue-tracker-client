import { Link } from "react-router-dom";
import linkStyle from "../styles/Links.module.css"
import style from "../styles/ProjectContent.module.css"

const IssueList = [
    {title : "Issue 1", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 1},
    {title : "Issue 2", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 2},
    {title : "Issue 3", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 3},
    {title : "Issue 4", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 4},
    {title : "Issue 5", description : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", id: 5},
];

const stateList = [
    {state : "NEW", issueList : IssueList},
    {state : "ASSIGNED", issueList : IssueList},
    {state : "FIXED", issueList : IssueList},
    {state : "RESOLVED", issueList : IssueList},
    {state : "CLOSED", issueList : IssueList},
];

function ProjectContent({projectId}){
    return (
        <ul className={`${style.list_section}`}>
            {
                stateList.map((item) => (
                    <li className={`${style.lists}`}>
                        <div className={`${style.list_tag}`}>{item.state}</div>
                        <ul className={`${style.list}`}>
                            {item.issueList.map((issue) => (
                                <li className={`${style.item}`}><Link to={{pathname: `issue/${issue.id}`}} className={`${linkStyle.link_black}`}>
                                    <div className={`${style.item_title}`}>{issue.title}</div>
                                    <div className={`${style.item_desc}`}>{issue.description}</div>
                                </Link></li>
                            ))}
                        </ul>
                    </li>
                ))
            }

        </ul>
    );
}

export default ProjectContent