import { useState } from "react";
import style from "../styles/userSearchForm.module.css"
import PropTypes from "prop-types";
import axios from "axios";
import { APIURL } from "../source/constants";
import { jwtDecode } from "jwt-decode";

function UserSearchForm({participants, setParticipants, userInfo}){

    const [accountId, setAccountId] = useState('');
    const [role, setRole] = useState('ProjectLeader');

    //유저 중복 입력 확인 함수
    const checkDuplicate = () => {
        return participants.some(participant => participant.accountId === accountId);
    }

    //유저 본인인지 확인 함수
    const checkIsSelf = () => {
        const myId = jwtDecode(userInfo.JWT).accountId;
        return (accountId === myId);
    }

    //새로운 participant 등록 event handler
    const handleAddParticipants = async (event) => {
        event.preventDefault();

        //입력자 자신이면 취소 시키기
        if (checkIsSelf()){
            alert('project admin은 목록에 포함되지 않습니다');
            return;
        }

        //participants에 이미 있으면 취소 시키기
        if (checkDuplicate()){
            alert('이미 포함된 유저입니다');
            return;
        }

        //user이름 API로 찾아서 넣기
        try {
            const response = await axios.get(`${APIURL}/users/${accountId}`);
            const username = response.data.username;

            const newParticipant = { accountId, role, userName: username };
            setParticipants([...participants, newParticipant]);

            setAccountId('');

        } catch(error){
            alert('존재하지 않는 유저입니다');
        }
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
                        <option value="ProjectLeader">Project Leader</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
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
UserSearchForm.prototypes = {
    participants : PropTypes.arrayOf(
        PropTypes.shape({
            role: PropTypes.string,
            accountId: PropTypes.number,
            userName: PropTypes.string,
        })
    ).isRequired,
    setParticipants : PropTypes.func.isRequired,
    userInfo : PropTypes.object.isRequired,
}


export default UserSearchForm;