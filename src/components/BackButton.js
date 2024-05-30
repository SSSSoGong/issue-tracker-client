import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // 뒤로가기
    };

    return (
        <button onClick={handleBackClick} style={buttonStyle}>
            뒤로 가기
        </button>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    color : "black",
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

export default BackButton;
