import { Link, useParams } from "react-router-dom";
import linkStyle from "../styles/Links.module.css"
import style from "../styles/ProjectContent.module.css"
import axios from "axios";
import { APIURL } from "../source/constants";
import { useEffect, useId, useState } from "react";
import PropTypes from "prop-types";



function ProjectContent({userInfo}){
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true);


    //state 별 최신 issue 5개를 정렬하는 list
    const [stateList, setStateList] = useState([
        {state : "NEW", issueList : []},
        {state : "REOPENED", issueList : []},
        {state : "ASSIGNED", issueList : []},
        {state : "FIXED", issueList : []},
        {state : "RESOLVED", issueList : []},
        {state : "CLOSED", issueList : []},
    ]);


    //issueList 가져오기
    const fetchIssueList = async () => {

        try {
            
            //NEW state
            const newIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : {
                    state : "NEW",
                    issueCount : 5,
                }
            })


            const news = newIssues.data.map(issue => ({
                title: issue.title,
                id : issue.issueId,
            }));

            //REOPENED state
            const reopenedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : {
                    state : "REOPENED",
                    issueCount : 5,
                }
            })

            const reopeneds = reopenedIssues.data.map(issue => ({
                title: issue.title,
                id : issue.issueId,
            }));

            //ASSIGNED state
            const assignedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : {
                    state : "ASSIGNED",
                    issueCount : 5,
                }
            })

            const assigneds = assignedIssues.data.map(issue => ({
                title: issue.title,
                id : issue.issueId,
            }));

            //FIXED state
            const fixedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : {
                    state : "FIXED",
                    issueCount : 5,
                }
            })

            const fixeds = fixedIssues.data.map(issue => ({
                title: issue.title,
                id : issue.issueId,
            }));
            
            //RESOLVED state
            const resolvedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : {
                    state : "RESOLVED",
                    issueCount : 5,
                }
            })

            const resolveds = resolvedIssues.data.map(issue => ({
                title: issue.title,
                id : issue.issueId,
            }));

            //CLOSED state
            const closedIssues = await axios.get(`${APIURL}/projects/${projectId}/issues`,{
                headers : {
                    'Authorization' : userInfo.JWT
                },
                params : {
                    state : "CLOSED",
                    issueCount : 5,
                }
            })

            const closeds = closedIssues.data.map(issue => ({
                title: issue.title,
                id : issue.issueId,
            }));
            
            //할당
            setStateList([
                {state : "NEW", issueList : news},
                {state : "REOPENED", issueList : reopeneds},
                {state : "ASSIGNED", issueList : assigneds},
                {state : "FIXED", issueList : fixeds},
                {state : "RESOLVED", issueList : resolveds},
                {state : "CLOSED", issueList : closeds},
            ]);



        } catch(error) {
            console.log(error)
        }finally {
            setLoading(false);
        }


        //issueCount = 5
        //state = stateList.state

        
    };

    
    useEffect(()=>{
        fetchIssueList();
    }, [projectId]);

    if (loading) return <div>Loading...</div>;

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
                                </Link></li>
                            ))}
                        </ul>
                    </li>
                ))
            }
        </ul>
    );
}
ProjectContent.propTypes = {
    userInfo : PropTypes.object.isRequired,
}

export default ProjectContent