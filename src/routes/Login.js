import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import UserButton from "../components/UserButton";
import UserInput from "../components/UserInput";

import style from "../styles/Login.module.css"

const dummyUserData = {
    ID : "tester",
    password : "test1",
    userName : "TESTER01",
    JWT : "thisisjwt",
}

function Login({userInfo, setUserInfo}) {
    const navigate = useNavigate();

    //유효성 검사
    const isInvaild = true;

    //login 정보 관리
    const [loginInfo, setLoginInfo] = useState({
        ID : '',
        password : '',
    })

    //event handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo(loginInfo => ({
            ...loginInfo,
            [name]: value,
        }));
    };

    //login 로직 처리
    //API call이 실행되는 위치
    const loginProcess = () => {
        if(loginInfo.ID == dummyUserData.ID
            && loginInfo.password == dummyUserData.password){
                alert('로그인 되었습니다');
                setUserInfo({isLogin: true, userName : dummyUserData.userName, JWT : dummyUserData.JWT});
                localStorage.setItem('isLogin', "true");
                localStorage.setItem('JWT', dummyUserData.JWT.toString());
                navigate('/');
            }
        else {
            alert('가입되지 않은 정보입니다');
        }
    }

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
                <main>
                    <div className={`${style.login}`}>
                        <div className={`${style.userFrame}`} onChange={handleInputChange}>
                            <div className={`${style.imageFrame}`}>
                                <img className={`${style.logoImage}`} src="/logoImage.png" alt="로고" />
                                <h3 className={`${style.title}`}>Issue Tracker</h3>
                            </div>
                            <UserInput
                                type="text"
                                placeholder="ID"
                                value={loginInfo.ID}
                                name="ID"
                            />
                            <UserInput
                                type="password"
                                placeholder="password"
                                value={loginInfo.password}
                                name="password"
                            />
                            <UserButton
                                text="로그인"
                                disabled={!isInvaild}
                                onClick={loginProcess}
                            />
                        </div>
                    </div>
                </main>
            <Footer />
        </div>
    );
}
Login.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default Login;
