import { Link } from "react-router-dom";
import style from "../styles/CommandLine.module.css"
import PropTypes from "prop-types";

function CommandLine(){

    return(
        <div className={style.frame}>
            <Link className={style.link} to={{ pathname: `update`}}>Update</Link>
            <div classname={style.forCreater}>
                <Link className={style.link} to={{ pathname: `modify`}}>수정</Link>
                <Link className={style.link} to={{ pathname: `/`}}>삭제</Link>
            </div>
        </div>
    );
};


export default CommandLine;