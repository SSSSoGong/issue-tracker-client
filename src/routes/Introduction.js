//login 되지 않은 상태의 main page
//system에 대한 간단한 intruduction 포함

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/Introduction.module.css";


function Introduction({userInfo, setUserInfo}){
    const navigate = useNavigate();

    return(
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
                <main className={styles.main_lorem}>
                    Introduction
                </main>
            <Footer />
        </div>
    );
}
Introduction.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};


export default Introduction;