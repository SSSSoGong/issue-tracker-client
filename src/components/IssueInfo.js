import PropTypes, { string } from "prop-types";
import style from "../styles/IssueInfo.module.css"

function IssueInfo({title, description, priority, category, state}){
    return(
        <div className={style.frame}>
            <div className={style.titleBox}>
                <label className={style.label} htmlFor="title">Issue Title</label>
                <div className={style.title} id="title">{title}</div>
            </div>
            <div className={style.descriptionBox}>
                <label className={style.label} htmlFor="description">Description</label>
                <div className={style.description} id="description">{description}</div>
            </div>
            <div className={style.priorityAndCategoryBox}>
                <div className={style.priorityBox}>
                    <label className={style.smallLabel} htmlFor="priority">Priority</label>
                    <div className={style.priority} id="priority">{priority}</div>
                </div>
                <div className={style.categoryBox}>
                    <label className={style.smallLabel} htmlFor="category">Category</label>
                    <div className={style.category} id="category">{category}</div>
                </div>                
            </div>
            <div className={style.stateBox}>
                <label className={style.smallLabel} htmlFor="state">State</label>
                <div className={style.state} id="state">{state}</div>
            </div>
        </div>
    );
}
IssueInfo.prototypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    priority : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,
    state : PropTypes.string.isRequired,
}

export default IssueInfo;

