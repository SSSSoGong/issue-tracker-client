import PropTypes from "prop-types";
import style from "../styles/UserInfoForm.module.css"

function UserInfoForm({accountId, userName, password, handleChange, handleSubmit}) {
    return(
        <form className={style.frame} onSubmit={handleSubmit}>
            <div className={style.box}>
                <label className={style.label} htmlFor="accountId">Account ID</label>
                <input id="accountId" type="text" value={accountId} readOnly />
            </div>
            <div className={style.box}>
                <label className={style.label} htmlFor="password">password</label>
                <input id="password" name="password" type="text" value={password} onChange={handleChange}/>
            </div>
            <div className={style.box}>
                <label className={style.label} htmlFor="userName">UserName</label>
                <input id="userName" name="userName" type="text" value={userName} onChange={handleChange}/>
            </div>
            <button className={style.button} type="submit">수정</button>
        </form>
    );
}
UserInfoForm.propTypes = {
    accountId : PropTypes.string.isRequired,
    userName : PropTypes.string.isRequired,
    password : PropTypes.string.isRequired,
    handleChange : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired,
}

export default UserInfoForm;


