const UserButton = ({ text, onClick, disabled }) => {
    return (
        <button className="userButton" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default UserButton;