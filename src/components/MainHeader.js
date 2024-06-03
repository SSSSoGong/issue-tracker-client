import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Links from "../styles/Links.module.css"
import { useNavigate } from "react-router-dom";
import style from "../styles/Links.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { APIURL } from "../source/constants";
import { jwtDecode } from "jwt-decode";


const title = "ISSUE ITSUE"


const logOutClicked = (navigate, setUserInfo) => {
    setUserInfo(prev => ({isLogin : false, userName : "", JWT: ""}));
    navigate('/');
}


//log in 상태에서의 header
function MainHeader_login({userName, setUserInfo}){

    const navigate = useNavigate();

    return (
        <header className="bg-dark py-3 px-3">
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Link to="/" className={`title text-light h4 mb-0 ${Links.link_white}`} >
                    <h1>{title}</h1>
                </Link>
            </div>
            <div className="d-flex align-items-center">
                <div className="text-light fs-4 pe-3" style={{userSelect:"none"}}>
                    <Link className={style.link_white} to="/userInfo" >
                        {userName}
                    </Link>
                </div>
                <a href="#" className="btn btn-light" onClick={() => logOutClicked(navigate, setUserInfo)}>Log Out</a>                        
            </div>
        </div>
    </header>
    );
}

MainHeader_login.propTypes = {
    userName : PropTypes.string.isRequired,
};


// log out 상태에서의 header
function MainHeader_logout(){
    return (
        <header className="bg-dark py-3 px-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link to="/" className={`title text-light h4 mb-0 ${Links.link_white}`} >
                        <h1>{title}</h1>
                    </Link>
                </div>
                <div>
                    <Link to="/sign">
                        <a href="#" className={`btn btn-outline-light me-2`}>Sign up</a>
                    </Link>
                    <Link to="/login">
                        <a href="#" className="btn btn-light">Log in</a>                        
                    </Link>
                </div>
            </div>
        </header>
    );
}

function MainHeader({userInfo, setUserInfo}){


    const JWT = userInfo.JWT;
    var id = null;

    
    if(JWT != "")
        id = jwtDecode(JWT).accountId

    
    const [userName, setUserName] = useState("");

    //API로 유저 이름을 가져오는 함수
    const getUserName = async () => {
        try {
            const response = await axios.get(APIURL + `/users/${id}`);
            return response.data.username;
        } catch(error){
            console.error(error.message);
        }
    };


    useEffect(() => {
        const fetchUserName = async () => {
            if (userInfo.isLogin) {
                const getName = await getUserName();
                setUserName(getName);
            }
        };
        fetchUserName();
    }, [userInfo.isLogin]);

    return (
        userInfo.isLogin ? <MainHeader_login userName={userName} setUserInfo={setUserInfo}/> : <MainHeader_logout />
    );
}

MainHeader.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};


export default MainHeader;