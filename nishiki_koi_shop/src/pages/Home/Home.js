import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactForm from './Form';
import '../../assets/css/Home.css';
import {koiProducts, tripItems} from "../../store/sampleTest";
import {handleGetAllProd} from "../../utils/handleFuncs";
import {Link} from "react-router-dom";

function Home() {
    const bannerUrl = "https://inhat.vn/wp-content/uploads/2021/03/4-37.jpg";

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const [fishData, setFishData] = useState([]);
    const [farmData, setFarmData] = useState([]);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/fish', null, setFishData, null).then((data) => {
            handleGetAllProd('http://localhost:8080/api/v1/farms/get-all-farm', null, setFarmData, null).then(r => console.log(r));
        })

    })

    return (
        <div className='home-container'>
            <section className='bannerSection'>
                <img src={bannerUrl} alt="Banner quảng cáo" className='bannerImage'/>
            </section>
            <section className='koiSection'>
                <div className='section-content'>
                    <h2 style={{color: 'white'}}>Sản phẩm bán chạy</h2>
                    <Slider {...sliderSettings}>
                        {fishData.map((product, index) => (
                            <div key={index} className='koiProductCard'>
                                <img src={product.image} alt={product.name} className='koiImage'/>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>{product.price ? product.price.toLocaleString('vi-VN') : ''} đ</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            <section className='farmAdSection'>
                <div className='farmAdContent'>
                    <div className='farmText'>
                        <p>
                            Thăm quan và mua các sản phẩm cá Koi tuyệt đẹp trực tiếp từ farm của chúng tôi. Với không
                            gian rộng lớn và nhiều loại cá Koi quý hiếm, bạn sẽ có trải nghiệm tuyệt vời khi đến thăm
                            farm của chúng tôi. Tại đây, bạn không chỉ được chiêm ngưỡng những chú cá Koi khỏe mạnh và
                            đầy màu sắc, mà còn được hướng dẫn tận tình về cách chăm sóc và nuôi dưỡng chúng. Chúng tôi
                            cam kết mang đến cho bạn những sản phẩm cá Koi chất lượng cao cùng với dịch vụ chăm sóc
                            khách hàng tận tâm.
                        </p>
                    </div>
                    <div className='farmImageWrapper'>
                        <img
                            src="https://www.thesprucepets.com/thmb/hyyMM_qGoKJC1YGYUrufUJBU6fo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1148621267-fbe7fcc9e0eb41078b0ee63bc3edc2b3.jpg"
                            alt="Farm cá Koi"
                            className='farmImage'
                        />
                    </div>
                </div>
            </section>

            <section className='tripAdSection'>
                <h2>Các chuyến đi hiện có</h2>
                <Slider {...sliderSettings}>
                    {farmData.map((trip, index) => (
                        <div key={index} className='tripCard'>
                            <img src={trip.image} alt={trip.name} className='tripImage'/>
                            <h3>{trip.name}</h3>
                            <Link to={`/farms/${trip.id}`} className={'featureBtn'}>Xem thêm</Link>
                        </div>
                    ))}
                </Slider>
            </section>
            <ContactForm/>
        </div>
    );
}

export default Home;
