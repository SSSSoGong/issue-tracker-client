import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import Links from "../styles/Links.module.css"

const title = "Issue Tracker"




//log in 상태에서의 header
function MainHeader_login({userName}){
    return (
        <header className="bg-dark py-3 px-3">
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Link to="/" className={`title text-light h4 mb-0 ${Links.link_white}`} >
                    <h1>{title}</h1>
                </Link>
            </div>
            <div className="d-flex align-items-center">
                <div className="text-light fs-4 pe-3">
                    {userName}
                </div>
                <Link to="/">
                    <a href="#" className="btn btn-light">Log Out</a>                        
                </Link>
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

function MainHeader({isLogin, userName}){
    return (
        isLogin ? <MainHeader_login userName={userName}/> : <MainHeader_logout />
    );
}

MainHeader.propTypes = {
    islogin : PropTypes.bool.isRequired,
    userName : PropTypes.string
};


export default MainHeader;