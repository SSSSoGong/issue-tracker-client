import { Link } from "react-router-dom";
import style from "../styles/ChartsList.module.css"

import monthIcon from "../source/month_icon.png";
import dayIcon from "../source/day_icon.png";
import categoryIcon from "../source/category_icon.png";
import prioriyIcon from "../source/priority_icon.png";


function ChartsList() {
    return(
        <div className={style.frame}>
            <Link className={style.directBox} to={`chart/1`}>
                <img className={style.imageBox} src={monthIcon} alt="Month Icon" />
                <div className={style.title}>월별 이슈 발생 횟수</div>
            </Link>

            <Link className={style.directBox} to={`chart/2`}>
                <img className={style.imageBox} src={dayIcon} alt="Day Icon" />
                <div className={style.title}>일별 이슈 발생 횟수</div>
            </Link>

            <Link className={style.directBox} to={`chart/3`}>
                <img className={style.imageBox} src={categoryIcon} alt="Category Icon" />
                <div className={style.title}>카테고리 별 이슈 통계</div>
            </Link>

            <Link className={style.directBox} to={`chart/4`}>
                <img className={style.imageBox} src={prioriyIcon} alt="Priority Icon" />
                <div className={style.title}>우선순위 별 이슈 통계</div>
            </Link>
        </div>
    )
}

export default ChartsList;