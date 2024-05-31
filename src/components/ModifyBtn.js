import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//button style 코드
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft : "5px",
};

function ModifyBtn({isAdmin, projectId}) {
    const [isAdminState, setIsAdminState] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            setIsAdminState(await isAdmin());
        };
        checkAdmin();
    }, [isAdmin]);

    if(isAdminState){

        return(
            <Link to={{ pathname: `/project/${projectId}/modify`}} style={buttonStyle}>
                정보 수정</Link> 
        );
    }

    else {
        return null;
    }
}
ModifyBtn.propTypes = {
    isAdmin : PropTypes.func.isRequired,
    projectId : PropTypes.string.isRequired,
}

export default ModifyBtn;