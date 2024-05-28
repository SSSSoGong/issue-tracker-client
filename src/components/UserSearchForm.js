import { useState } from "react";
import style from "../styles/userSearchForm.module.css"

/* newParticipants : 객체(userName, role, accountId) 의 배열 */

function UserSearchForm(){
    //participant를 projectCreation에서 받아와야 함
    //projectCreationForm에서 submit을 누르면 API를 호출할 수 있도록
    //userSearchForm에서는 유효성 검사하고 list에 넣는 것만 수행
    const [participants, setParticipants] = useState([]);

    const [accountId, setAccountId] = useState('');
    const [role, setRole] = useState('PL');

    //새로운 participant 등록 event handler
    //유효성 확인하고 이상하면 추가 안함
    //괜찮으면 추가함
    const handleAddParticipants = (event) => {
        event.preventDefault();


        const newParticipant = { accountId, role, userName: 'user' };
        setParticipants([...participants, newParticipant]);

        setAccountId('');
        setRole('PL');
    };

    //delete 버튼 event listener
    const handleDeleteClick = (accountIdToDelete) => {
        setParticipants(participants.filter(participant => participant.accountId !== accountIdToDelete));
    };

    return(
        <div className={style.frame}>
            <div className={style.header}>참여자 목록</div>
            <form className={style.inputForm} onSubmit={handleAddParticipants}>
                <div className={style.inputBox}>
                    <label className={style.label} htmlFor="accountId">Account ID</label>
                    <input
                        className={style.input}
                        type="text"
                        id="accountId"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        >
                        <option value="PL">PL</option>
                        <option value="DEVELOPER">DEVELOPER</option>
                        <option value="TESTER">TESTER</option>
                    </select>
                </div>
                <button type="submit">Add User</button>
            </form>
            <ul className={style.participantsList}>
                <li className={style.headerFrame}>
                    <div className={style.roleHeader}>Role</div>
                    <div className={style.nameHeader}>User Name</div>
                    <div className={style.idHeader}>Account ID</div>
                </li>
                {participants.map((item, idx) => (
                    <li className={style.userFrame} key={idx}>
                        <div className={style.roleBox}>{item.role}</div>
                        <div className={style.nameBox}>{item.userName}</div>
                        <div className={style.idBox}>{item.accountId}</div>
                        <button className={style.deleteBtn} onClick={() => handleDeleteClick(item.accountId)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserSearchForm;