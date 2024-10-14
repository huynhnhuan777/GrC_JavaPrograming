import React from 'react';
import bgVideo from '../../assets/video/vid.webm'
import {Link} from "react-router-dom";
import '../../assets/css/AboutUs.css'

function AboutUs() {
    return (
        <div className="about-us-container">
            {/* Nhúng video nền */}
            <video width={'100%'} height={'100%'} autoPlay loop muted playsInline className="background-video">
                <source src={bgVideo} type="video/webm"/>
            </video>
            <div className="about-us-content">
                <h1 className={'text'}>N-KOI: Nơi kết nối cộng đồng yêu thích cá chép xứ sở hoa anh đào</h1> {/* Tiêu đề */}
                <p className={'text'}>
                    Chào mừng các bạn đến với <strong><Link to={'/'}>N-Koi</Link> </strong>, chúng tôi ở đây để cung
                    cấp cho các bạn một trải ngiệm
                    thật tuyệt vời với những chú <strong><Link to={'/list'}>cá chép Koi</Link> </strong> thật dễ thương
                    và xinh đẹp!
                </p>
                <p className={'text'}>
                    Được thành lập vào năm 2020, chúng tôi - những con người nhiệt huyết và có một tình yêu cháy bỏng
                    với loài cá -
                    Sẵn sàng là đơn vị cung cấp nguồn <strong><Link to={'/list'}>cá chép Koi</Link> </strong> lớn nhất
                    Việt Nam.
                </p>
                <p className={'text'}>
                    Ngoài ra, nhằm đem đến một trải nghiệm gần gũi hơn, chúng tôi còn cung cấp các <strong><Link
                    to={'/opening-tour'}>tour tham quan</Link> </strong> nhằm đem đến cái nhìn mới về loài <strong><Link
                    to={'/list'}>cá chép Koi</Link> </strong> chuẩn xứ hoa anh đào!
                </p>
                <p className={'text'}>
                    Hãy khám khá ngay lúc này và bạn sẽ hết hồn vì những gì chúng tôi mang lại UwU. <strong><Link
                    to={'/random'}>Let's go!</Link> </strong>
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
