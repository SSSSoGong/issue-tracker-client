//login 되지 않은 상태의 main page
//system에 대한 간단한 intruduction 포함

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import "../styles/Introduction.css";
import { setUserLoginState } from "../App";
import { useNavigate } from "react-router-dom";


function mainClicked(navigate){
    setUserLoginState(true)
    navigate('/');
}


function Introduction(){
    const navigate = useNavigate();

    const userInfo = {
        isLogined : false,
    }

    return(
        <div>
            <MainHeader userInfo={userInfo}/>
            <main onClick={mainClicked(navigate)}>Introduction</main>
            <Footer />
        </div>
    );
}

export default Introduction;