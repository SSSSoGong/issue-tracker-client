import PropTypes from "prop-types";
import style from "../styles/AssigneeSelectForm.module.css";

function AssigneeSelectForm({assignee, recommendedDevsList, devsList, handleClick}) {
    return(
        <div className={style.frame}>
            <div className={style.smallTitle}>Assignee 선택</div>
            <input type="text" disabled placeholder="Assignee" value={assignee}/>

            <div className={style.recommendedListBox}>
                <label className={style.label} htmlFor="recommendedList">추천 목록</label>
                <ul className={style.recommendedList} id="recommendedList">
                    {recommendedDevsList.map((item, idx) => (
                        <li className={style.recommended} key={idx}>
                            <div className={style.userName}>{item.userName}</div>
                            <div className={style.accountId}>{item.accountId}</div>
                            <button className={style.devSelectBtn} value={item.accountId} onClick={handleClick}>Select</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={style.listBox}>
                <label className={style.label} htmlFor="list">개발자 목록</label>
                <ul className={style.list} id="list">
                    {devsList.map((item, idx) => (
                        <li className={style.listItem} key={idx}>
                            <div className={style.userName}>{item.userName}</div>
                            <div className={style.accountId}>{item.accountId}</div>
                            <button className={style.devSelectBtn} value={item.accountId} onClick={handleClick}>Select</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
AssigneeSelectForm.propTypes = {
    assignee : PropTypes.string.isRequired,

    recommendedDevsList : PropTypes.arrayOf(
        PropTypes.shape({
            accountId : PropTypes.string.isRequired,
            userName : PropTypes.string.isRequired,
        })
    ).isRequired,

    devsList : PropTypes.arrayOf(
        PropTypes.shape({
            accountId : PropTypes.string.isRequired,
            userName : PropTypes.string.isRequired,
        })
    ).isRequired,
    
    handleClick : PropTypes.func.isRequired, //다음 assignee를 클릭하는 listener
};

export default AssigneeSelectForm;