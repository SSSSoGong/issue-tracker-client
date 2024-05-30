import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";

import style from "../styles/SignUp.module.css"
import { APIURL } from "../source/constants";

function SignUp({ userInfo, setUserInfo }) {
    const navigate = useNavigate();

    //유효성 검사
    const isInvaild = true;

    //signUP 정보 관리
    const [signInfo, setSignInfo] = useState({
        ID: '',
        password: '',
        userName: '',
    });

    //event handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSignInfo(signInfo => ({
            ...signInfo,
            [name]: value,
        }));
    };

    //singUp 로직 처리
    const signProcess = async () => {
        //API call 실행
        try {
            const response = await axios.post(APIURL + "/users/register", {
                accountId : signInfo.ID,
                password : signInfo.password,
                username : signInfo.userName,
            })
            alert('가입 되었습니다');
            navigate('/');
        } catch(error){
            if (error.response) {
                // 서버가 응답을 반환했지만 요청이 실패한 경우
                if(error.response.status == "409")
                    alert("ID가 이미 존재합니다");
                else if(error.response.status == "400")
                    alert("ID 혹은 PW가 형식에 부합하지 않습니다");
                else
                    console.log('status code : ', error.response.status); //error.response.status : 상태 코드 (409, 404)
            } else {
                // 요청 자체가 실패한 경우
                console.error('Error registering user:', error.message);
            }
        }
        
    }

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo} />
            <div className="center_area">
                <main className="project_area">
                    <section className={`main_section ${style.section}`} onChange={handleInputChange}>
                        <div className={style.signUp}>
                            <label className={style.label} htmlFor="ID">ID</label>
                            <input
                                className={style.input}
                                type="text"
                                placeholder="ID"
                                value={signInfo.ID}
                                name="ID"
                            />
                            <label className={style.label} htmlFor="password">Password</label>
                            <input
                                className={style.input}
                                type="password"
                                placeholder="password"
                                value={signInfo.password}
                                name="password"
                                />
                            <label className={style.label} htmlFor="userName">Name</label>                            
                            <input 
                                className={style.input}
                                type="userName"
                                placeholder="userName"
                                value={signInfo.userName}
                                name="userName"
                                />
                            <button
                                calssName={style.btn}
                                disabled={!isInvaild}
                                onClick={signProcess}
                                >Sign Up</button> 
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
SignUp.propTypes = {
    userInfo: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func,
}


export default SignUp;
