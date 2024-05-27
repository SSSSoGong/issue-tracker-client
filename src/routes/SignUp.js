import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";

import style from "../styles/SignUp.module.css"

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
    const signProcess = () => {
        console.log(signInfo);
        navigate('/');
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
