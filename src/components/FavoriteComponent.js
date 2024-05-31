import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { APIURL } from "../source/constants";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";





const FavoriteComponent = ({userInfo}) => {
    const navigate = useNavigate();

    const [isFavorite, setIsFavorite] = useState(false);

    const aId = jwtDecode(userInfo.JWT).accountId;
    const {projectId} = useParams();

    //click event Listener
    const toggleFavorite = async () => {
        const newIsFavorite = !isFavorite;
        setIsFavorite(newIsFavorite);


        //API 호출
        try{
            const response = await axios.put(`${APIURL}/users/${aId}/projects/${projectId}/favorite`,{
                isFavorite : newIsFavorite
            }, {
                headers : {
                    'Authorization' : userInfo.JWT, 
                }
            })

            navigate(0);
        }catch(error){
            console.error(error);
        }

    };

    //button 상태 초기화 함수
    const fetchFavorite = async () => {
        try{
            const response = await axios.get(`${APIURL}/users/${aId}/projects`,{
                headers : {
                    'Authorization' : userInfo.JWT,
                }
            });

            const thisProject = response.data.find(project => project.projectId == projectId);
            if(thisProject){
                setIsFavorite(thisProject.favorite);
            }
            
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFavorite();
    }, [projectId]);


    // 버튼 디자인
    const buttonStyle = {
        fontSize: '1rem',
        color: isFavorite ? 'gold' : 'black',
        backgroundColor: isFavorite ? 'navy' : 'gray',
        border: 'none',
        borderRadius : "5px",
        cursor: 'pointer',
    };
    
    return (
        <div style={{display:"inline"}}>
            <button onClick={toggleFavorite} style={buttonStyle}>
                { isFavorite ? '★' : '☆' }
            </button>
        </div>
    );
};
FavoriteComponent.propTypes = {
    userInfo : PropTypes.object.isRequired,
}

export default FavoriteComponent;
