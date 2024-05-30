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

function DashBoardContent({userInfo, setUserInfo}) {
    const {chartIdx} = useParams();

    //chart에 대입하는 데이터
    const [chartDatas, setChartDatas] = useState({
        data : [],
        labels : [],
        label : '',
    })


    //charIdx에 따라서 원하는 data를 선택하는 함수
    //Barchart에 props 로 넘겨준다
    const initialize_charDatas = () => {
        setChartDatas({
            data : [65, 59, 80, 81, 56, 55, 40],
            labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            label : 'Success',
        })
    };

    useEffect(() => {
        initialize_charDatas();
    }, []);

    return (
        <div>
            <MainHeader userInfo={userInfo} setUserInfo={setUserInfo}/>
            <div class="center_area">
                <ProjectList />
                <main class="project_area">
                    <ProjectMenu />
                    <section class="main_section">
                        <BackButton />
                        <BarChart 
                            chartData={chartDatas.data}
                            chartLabel={chartDatas.label}
                            chartLabels={chartDatas.labels}
                        />
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
