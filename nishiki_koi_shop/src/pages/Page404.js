import React from "react";
import Erroricon from '../assets/img/sad-icon-404.png';
import '../assets/css/page404.css';
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div className={'page404-container'}>
            <div className={'page404-content'}>
                <img className={'Error-icon'} src={Erroricon} alt={'sad-icon'}/>
                <h3>UwU, This page does not exist!</h3>
                <p>Có thể trang này đang được <strong>phát triển</strong> hoặc chưa hoàn toàn <strong>gỡ xuống</strong>
                </p>
                <p>Đừng lo, có thể thứ bạn quan tâm cũng đang ở đây,
                    <Link to={'/list'}> hãy khám phá ngay!</Link>
                </p>
            </div>
        </div>
    )
}
export default Page404