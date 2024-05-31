import axios from "axios";
import { useEffect, useState } from "react";
import { APIURL } from "../source/constants";
import { jwtDecode } from "jwt-decode";

function AxiosTest(){

    //JWT decoding 예시
    const JWT = localStorage.getItem('JWT');
    const id = jwtDecode(JWT).accountId;
    const projectId = "1";
    
    const fetchData = async () => {
        try{
            const response = await axios.put(`${APIURL}/users/${id}/projects/${projectId}/favorite`,{
                isFavorite : true
            }, {
                headers : {
                    'Authorization' : JWT, 
                }
            })
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    //delete 요청 예시
    // const fetchData = async () => {
    //     try{
    //         const response = await axios.delete(`${APIURL}/users/unregister`,{
    //             headers : {
    //                 'Authorization' : JWT, 
    //             }
    //         })
    //         console.log(response);
            
    //     } catch(error){
    //         console.error(error.message);
    //     }
    // }


    // //post 요청 예시
    // const fetchData = async () => {
    //     try{
    //         const response = await axios.post(APIURL + "/users/register", {
    //             accountId : userInfo.accountId,
    //             password : userInfo.password,
    //             username : userInfo.userName,
    //         });
    //         console.log('성공 : ', response.data);
    //     }catch(error){
    //         if (error.response) {
    //             // 서버가 응답을 반환했지만 요청이 실패한 경우
    //             console.log('status code : ', error.response.status); //error.response.status : 상태 코드 (409, 404)
    //         } else {
    //             // 요청 자체가 실패한 경우
    //             console.error('Error registering user:', error.message);
    //         }
    //     }
    // }

        //get 요청 예시
        // const fetchData = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:8080/users/pl1');
        //         console.log(response.data);
        //         console.log("성공");
        //     } catch(error){
        //         console.log(error);
        //         console.log("실패");
        //     }
        // };

    
    


    return(
        <div>AxiosTest page</div>
    );
};

export default AxiosTest;