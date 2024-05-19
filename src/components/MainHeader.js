import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";


//log in 상태에서의 header
function MainHeader_login({userName}){
    return (
        <header className="bg-dark py-3 px-3">
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Link to="/" className = "title text-light h4 mb-0" style={{textDecoration: "none"}}>
                    <h1>Title</h1>
                </Link>
            </div>
            <div className="d-flex align-items-center">
                <div className="text-light fs-4 pe-3">
                    {userName}
                </div>
                <Link to="/" style={{textDecoration: "none"}}>
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
                    <Link to="/" classNameName = "title text-light h4 mb-0" style={{textDecoration: "none"}}>
                        <h1>Title</h1>
                    </Link>
                </div>
                <div>
                    <Link to="/sign" style={{textDecoration: "none"}}>
                        <a href="#" classNameName="btn btn-outline-light me-2">Sign up</a>
                    </Link>
                    <Link to="/login" style={{textDecoration: "none"}}>
                        <a href="#" className="btn btn-light">Log in</a>                        
                    </Link>
                </div>
            </div>
        </header>
    );
}

function MainHeader({userInfo}){
    return (
        userInfo.isLogined ? <MainHeader_login userName={userInfo.userName}/> : <MainHeader_logout />
    );
}

MainHeader.propTypes = {
    userInfo : PropTypes.shape({
        isLogined : PropTypes.bool.isRequired,
        userName : PropTypes.string,
    }).isRequired,
};


export default MainHeader;