import PropTypes from "prop-types";
import style from "../styles/StateUpdateInputForm.module.css";


function StateUpdateInputForm({nextState, comment, handleChange, handleSubmit}) {
    return(
        <form className={style.frame} onSubmit={handleSubmit}>
            <div className={style.stateBox}>
                <label className={style.label} htmlFor="nextState">next State</label>
                <div className={style.state} id="nextState">{nextState}</div>
            </div>

            <div className={style.box}>
                <label className={style.label} htmlFor="comment">comment</label>
                <textarea
                    className={style.textarea}
                    id="comment"
                    value={comment}
                    onChange={handleChange}
                    placeholder="optional"
                    ></textarea>
            </div>

            <button className={style.btn} type="submit">Submit</button>
        </form>
    );
}
StateUpdateInputForm.propTypes = {
    nextState : PropTypes.string.isRequired,
    comment : PropTypes.string.isRequired,
    handleChange : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired,
};

export default StateUpdateInputForm;



//갱신 후 정보
//state, comment (optional), handleSubmit
