import PropTypes from "prop-types";
import { useEffect } from "react";

//button style 코드
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'red',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop : "60px",
};


function DeleteAccountBtn({handleDelete, ment, commentId, visible}){


    if(visible){
        return(
            <button style={buttonStyle} onClick={handleDelete} value={commentId}>{ment}</button>
        );
    }else{
        return null
    }
    
}
DeleteAccountBtn.propTypes = {
    handleDelete : PropTypes.string.isRequired,
    ment : PropTypes.string.isRequired,
    commentId : PropTypes.string,
    visible : PropTypes.bool,
}

DeleteAccountBtn.defaultProps = {
    visible : true
}

export default DeleteAccountBtn;