import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import UserButton from "../components/UserButton";
import UserInput from "../components/UserInput";

import style from "../styles/Login.module.css"
import axios from "axios";
import { APIURL } from "../source/constants";
import logoImage from "../source/logoImage.png"



function Login({userInfo, setUserInfo}) {
    const navigate = useNavigate();



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

    //userName 받아오는 함수
    //loginInfo.ID로 api 호출해서 username만 뽑아서 반환
    const getUserName = async () => {
        try{
            const response = await axios.get(APIURL + `/users/${loginInfo.ID}`);

            return response.data.username;
        }catch(error){
            console.error('Error registering user:', error.message);
            return "";
        }
    };

    //login 로직 처리
    //API call이 실행되는 위치
    const loginProcess = async () => {

        try{
            const response = await axios.post(APIURL + "/users/login", {
                accountId : loginInfo.ID,
                password : loginInfo.password,
            });
            
            const JWT = response.data.authorization;
            const name = await getUserName();

            localStorage.setItem('isLogin', "true");
            localStorage.setItem('JWT', JWT);
            setUserInfo({isLogin: true, userName : name, JWT : JWT});
            
            alert('로그인 되었습니다');
            navigate('/');
        }catch(error){
            if (error.response) {
                // 서버가 응답을 반환했지만 요청이 실패한 경우
                if(error.response.status == "401")
                    alert('가입되지 않은 정보입니다');
                else
                    console.log('status code : ', error.response.status); 
            } else {
                // 요청 자체가 실패한 경우
                console.error('Error registering user:', error.message);
            }
        }
    };

        // if(loginInfo.ID == dummyUserData.ID
        //     && loginInfo.password == dummyUserData.password){
        //         alert('로그인 되었습니다');
        //         setUserInfo({isLogin: true, userName : dummyUserData.userName, JWT : dummyUserData.JWT});
        //         localStorage.setItem('isLogin', "true");
        //         localStorage.setItem('JWT', dummyUserData.JWT.toString());
        //         navigate('/');
        //     }
        // else {
        //     alert('가입되지 않은 정보입니다');
        // }


    

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
                <main>
                    <div className={`${style.login}`}>
                        <div className={`${style.userFrame}`} onChange={handleInputChange}>
                            <div className={`${style.imageFrame}`}>
                                <img className={`${style.logoImage}`} src={logoImage} alt="로고" />
                                <h3 className={`${style.title}`}>ISSUE ITSUE</h3>
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
