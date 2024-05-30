import PropTypes from "prop-types";

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


function DeleteAccountBtn({handleDelete}){
    return(
        <button style={buttonStyle} onClick={handleDelete}>Delete Account</button>
    );
}
DeleteAccountBtn.propTypes = {
    handleDelete : PropTypes.string.isRequired,
}

export default DeleteAccountBtn;