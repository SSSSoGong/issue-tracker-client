import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import ProjectList from "../components/ProjectList";
import ProjectMenu from "../components/ProjectMenu";

import '../styles/default_layout.css'
import BarChart from "../components/BarChart";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { APIURL } from "../source/constants";


const chartFrameStyle = {
    width : "80%",
    margin : "0 auto",
};


function DashBoardContent({userInfo, setUserInfo}) {
    const {chartIdx, projectId} = useParams();

    const [loading, setLoading] = useState(true);

    //chart에 대입하는 데이터
    const [chartDatas, setChartDatas] = useState({
        data : [],
        labels : [],
        label : '',
    })


    //charIdx에 따라서 원하는 data를 선택하는 함수
    //Barchart에 props 로 넘겨준다
    const initialize_charDatas = async () => {
        setLoading(true);

        let response = "값없음";

        try{
            var fetchedChartDatas = {
                data : [65, 59, 80, 81, 56, 55, 40],
                labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                label : 'Success',
            }

            switch(chartIdx){
                case '1' : //월별 이슈 발생 횟수
                    response = await axios.get(`${APIURL}/projects/${projectId}/issue-statistics/monthly`,{
                        headers : {
                            'Authorization' : userInfo.JWT
                        }
                    })
                    fetchedChartDatas.data = response.data.map(item => item.issueCount);
                    fetchedChartDatas.labels = response.data.map(item => item.date);
                    fetchedChartDatas.label = "월별 이슈 발생 통계"
                    break;
                case '2' : //일별 이슈 발생 횟수
                    response = await axios.get(`${APIURL}/projects/${projectId}/issue-statistics/daily`,{
                        headers : {
                            'Authorization' : userInfo.JWT
                        }
                    })
                    fetchedChartDatas.data = response.data.map(item => item.issueCount);
                    fetchedChartDatas.labels = response.data.map(item => item.date);
                    fetchedChartDatas.label = "일별 이슈 발생 통계"
                    break;
                case '3' : //카테고리 별 이슈 통계
                    response = await axios.get(`${APIURL}/projects/${projectId}/issue-statistics/category`,{
                        headers : {
                            'Authorization' : userInfo.JWT
                        }
                    })
                    fetchedChartDatas.data = response.data.map(item => item.issueCount);
                    fetchedChartDatas.labels = response.data.map(item => item.category);
                    fetchedChartDatas.label = "카테고리 별 이슈 발생 통계"

                    break;
                case '4' : //우선순위 별 이슈 통계
                    response = await axios.get(`${APIURL}/projects/${projectId}/issue-statistics/priority`,{
                        headers : {
                            'Authorization' : userInfo.JWT
                        }
                    });
                    fetchedChartDatas.data = response.data.map(item => item.issueCount);
                    fetchedChartDatas.labels = response.data.map(item => item.category);
                    fetchedChartDatas.label = "우선순위 별 이슈 발생 통계"

                    break;
            }
            
            console.log(response.data);
            


            setChartDatas({
                data : fetchedChartDatas.data,
                labels : fetchedChartDatas.labels,
                label : fetchedChartDatas.label,
            })

        }catch(error) {
            console.error(error);
        }finally {
            
            setLoading(false);
        }
        
    };

    useEffect(() => {
        initialize_charDatas();
    }, []);


    if(loading){
        return(
            <div>Loading...</div>
        );
    }

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <ProjectMenu />
                    <section class="main_section">
                        <BackButton />
                        <div className="chartFrame" style={chartFrameStyle}>
                            <BarChart 
                                chartData={chartDatas.data}
                                chartLabel={chartDatas.label}
                                chartLabels={chartDatas.labels}
                            />
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
DashBoardContent.propTypes = {
    userInfo : PropTypes.object.isRequired,
    setUserInfo : PropTypes.func,
};

export default DashBoardContent;
