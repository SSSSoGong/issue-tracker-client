import PropTypes from "prop-types";
import style from "../styles/StateUpdateInputForm.module.css";


const switchButtonStyle = {
    backgroundColor : "orange",
    marginTop : "5px",
    padding : '7px',
}

function StateUpdateInputForm({nextState, setNextState, handleSubmit}) {

    //nextState를 RESOLVED와 REOPENED로 switch 하는 함수
    const switchState = (e) => {
        e.preventDefault();

        if(nextState === 'RESOLVED')
            setNextState('REOPENED');
        else if(nextState === 'REOPENED')
            setNextState('RESOLVED');
    };
    

    return(
        <form className={style.frame} onSubmit={handleSubmit}>
            <div className={style.stateBox}>
                <label className={style.label} htmlFor="nextState">next State</label>
                <div className={style.state} id="nextState">{nextState}</div>
                
                {
                    ((nextState === 'RESOLVED') || (nextState === 'REOPENED'))
                    && <button onClick={switchState} style={switchButtonStyle}>switch</button>
                }
            </div>


            <button className={style.btn} type="submit">Submit</button>
        </form>
    );
}
StateUpdateInputForm.propTypes = {
    nextState : PropTypes.string.isRequired,
    setNextState : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired,
};

export default StateUpdateInputForm;



//갱신 후 정보
//state, comment (optional), handleSubmit
