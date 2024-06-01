import style from "../styles/IssueContent.module.css"
import PropTypes from "prop-types";
import { APIURL } from "../source/constants";


function IssueContent({title, description, imgList}){

    //image 못 찾은 경우, default로 설정
    const handleImageError = (e) => {
        e.target.src = "/no-image.png";
    };

    return(
        <div className={style.frame}>
            <div className={style.title}>
                {title}
            </div>
            <div className={style.description}>
                {description}
            </div>
            <ul className={style.imgs}>
                {imgList.map((item, idx) => (
                    <li key={idx} className={style.imgFrame}>
                        <img src={`${APIURL}${item}`} alt="image" onError={handleImageError} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
IssueContent.propTypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    imgList : PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default IssueContent;

