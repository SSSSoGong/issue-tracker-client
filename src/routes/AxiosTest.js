import axios from "axios";
import { useEffect } from "react";

function AxiosTest(){
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/pl1');
                console.log(response.data);
                console.log("성공");
            } catch(error){
                console.log(error);
                console.log("실패");
            }
        };

        fetchData();
    }, []);


    return(
        <div>AxiosTest page</div>
    );
};

export default AxiosTest;