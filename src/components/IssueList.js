import PropTypes from "prop-types";
import style from "../styles/IssueList.module.css"
import { Link } from "react-router-dom";

//dummy issueList data
const Issues = [
    {state : "NEW", priority : "MAJOR", title : "Issue 1", issueId : "1"},
    {state : "ASSIGNED", priority : "MINOR", title : "Issue 2", issueId : "2"},
    {state : "FIXED", priority : "CRITICAL", title : "Issue 3", issueId : "3"},
    {state : "RESOLVED", priority : "TRIVIAL", title : "Issue 4", issueId : "4"},
    {state : "REOPENED", priority : "MAJOR", title : "Issue 5", issueId : "5"},
    {state : "CLOSED", priority : "MINOR", title : "Issue 6", issueId : "6"},
    {state : "NEW", priority : "MAJOR", title : "Issue 7", issueId : "7"},
    {state : "ASSIGNED", priority : "MINOR", title : "Issue 8", issueId : "8"},
    {state : "FIXED", priority : "CRITICAL", title : "Issue 9", issueId : "9"},
    {state : "RESOLVED", priority : "TRIVIAL", title : "Issue 10", issueId : "10"},
    {state : "REOPENED", priority : "MAJOR", title : "Issue 11", issueId : "11"},
    {state : "CLOSED", priority : "MINOR", title : "Issue 12", issueId : "12"},
];

function IssueList() {
    return (
        <ul className={style.frame}>
            {
                Issues.map((item, idx) => (
                    <Link className={style.link} to={{pathname : `/issue/${item.issueId}`}}>
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

export default IssueList;
