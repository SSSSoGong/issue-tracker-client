import style from "../styles/IssueMetaInfo.module.css"
import PropTypes from "prop-types";


function IssueMetaInfo({priority, state, category, reporter, reportedDate}){
    return(
        <div className={style.frame}>
            <div className={style.line}>
                <div className={style.itemFrame}>
                    <div className={style.tag}>Priority</div>
                    <div className={style.priorityFrame}>{priority}</div>
                </div>
                <div className={style.itemFrame}>
                    <div className={style.tag}>State</div>
                    <div className={style.stateFrame}>{state}</div>
                </div>
            </div>
            <div className={style.line}>
                <div className={style.itemFrame}>
                    <div className={style.tag}>Category</div>
                    <div className={style.categoryFrame}>{category}</div>
                </div>
            </div>
            <div className={style.line}>
                <div className={style.itemFrame}>
                    <div className={style.tag}>Reported Date</div>
                    <div className={style.reportedDateFrame}>{reportedDate}</div>
                </div>
                <div className={style.itemFrame}>
                    <div className={style.tag}>Reporter</div>
                    <div className={style.reporterFrame}>{reporter}</div>
                </div>
            </div>
        </div>
    );
}
IssueMetaInfo.propTypes = {
    priority : PropTypes.string.isRequired,
    state : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,
    reporter : PropTypes.string.isRequired,
    reportedDate : PropTypes.string.isRequired,
}

export default IssueMetaInfo;
