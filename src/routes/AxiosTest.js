import axios from "axios";
import { useEffect } from "react";
import { APIURL } from "../source/constants";

function AxiosTest(){

    const userInfo = {
        accountId : "ApiTestId",
        password : "1234",
        userName : "ApiTest",
    }


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

    
    // useEffect(() => {
    //     fetchData();
    // }, []);


    return(
        <div>AxiosTest page</div>
    );
};

export default AxiosTest;