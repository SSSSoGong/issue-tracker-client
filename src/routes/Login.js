import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import UserButton from "../components/UserButton";
import UserInput from "../components/UserInput";

const dummyUserData = {
    email : "tester",
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
        email : '',
        password : '',
    })

    //event handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(loginInfo.email);
        console.log(loginInfo.password);
        setLoginInfo(loginInfo => ({
            ...loginInfo,
            [name]: value,
        }));
    };

    //login 로직 처리
    //API call이 실행되는 위치
    const loginProcess = () => {
        //console.log(loginInfo.email);
        //console.log(loginInfo.password);
        if(loginInfo.email == dummyUserData.email 
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
                    <div className="login">
                        <div className="userFrame" onChange={handleInputChange}>
                            <div className="imageFrame">
                                <img className="logo" src="/images/Logo.svg" alt="위코드 로고" />
                                <img
                                    className="logo"
                                    src="/images/logo_wecode.svg"
                                    alt="위코드 로고"
                                />
                            </div>
                            <UserInput
                                type="text"
                                placeholder="이메일"
                                value={loginInfo.email}
                                name="email"
                            />
                            <UserInput
                                type="password"
                                placeholder="비밀번호"
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
