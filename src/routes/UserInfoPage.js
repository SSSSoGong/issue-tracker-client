import PropTypes from "prop-types";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";

import '../styles/default_layout.css'
import UserInfoForm from "../components/UserInfoForm";
import { APIURL } from "../source/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccountBtn from "../components/DeleteAccountBtn";


function UserInfoPage({userInfo, setUserInfo}) {
    const navigate = useNavigate();

    const JWT = localStorage.getItem('JWT');
    const id = jwtDecode(JWT).accountId;

    //갱신에 사용할 user 정보
    const [modifiedUserInfo, setModifiedUserInfo] = useState({
        userName : "",
        password : "",
    })

    //userName 초기화
    const getUserName = async () => {
        try {
            const response = await axios.get(APIURL + `/users/${id}`);
            const username = response.data.username
            setModifiedUserInfo((prev) => ({
                ...prev,
                userName : username,
            }));
        }catch (error) {
            console.error(error.message);
        };
    } 

    useEffect(() => {
        getUserName();
    }, []);


    //form의 값 변경 handler
    const handleChange = (event) => {
        const {name, value} = event.target;
        setModifiedUserInfo({
            ...modifiedUserInfo,
            [name] : value,
        });
    };

    //회원 정보 수정 event handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.put(APIURL + `/users/${id}`,{
                username : modifiedUserInfo.userName,
                password : modifiedUserInfo.password,
            })
            alert('회원정보가 수정되었습니다');
            navigate(0);
            
        } catch(error){
            console.error(error);
        }
    };

    //회원 탈퇴 event handler
    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        //삭제하고, 로그아웃 시키고 main으로 쫓아내기
        try{
            await axios.delete(`${APIURL}/users/unregister`,{
                headers : {'Authorization' : JWT, }
            })
            alert('회원정보가 삭제되었습니다');
            setUserInfo({
                isLogin:false,
                JWT:"",
            })
            navigate('/');

        }catch(error){
            console.error(error.message);
        }
    }



    return(
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <section class="main_section">
                        <UserInfoForm
                            accountId={id}
                            userName={modifiedUserInfo.userName}
                            password={modifiedUserInfo.password}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            />
                        <DeleteAccountBtn
                            handleDelete={handleDeleteAccount}
                            ment = {"Delete Account"}
                            />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};
UserInfoPage.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default UserInfoPage;

//회원 탈퇴 버튼