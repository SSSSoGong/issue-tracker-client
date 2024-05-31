import PropTypes from "prop-types";
import style from "../styles/UserList.module.css";

function UserList({users}){
    return(
        <div className={style.frame}>
            <h2 className={style.title}>User List</h2>
            <ul className={style.users}>
                {users.map((user) => (
                    <li className={style.userFrame}>
                        <div className={style.roleFrame}>{user.role}</div>
                        <div className={style.nameFrame}>{user.username}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
UserList.propTypes = {
    users : PropTypes.arrayOf(
        PropTypes.shape({
            accountId : PropTypes.string.isRequired,
            userName : PropTypes.string.isRequired,
            role : PropTypes.string.isRequired,
        })
    ).isRequired,
};


export default UserList;

