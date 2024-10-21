import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactForm from './Form';
import '../../assets/css/Home.css';
import {koiProducts,tripItems} from "../../store/sampleTest";

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

    return (
        <div className='home-container'>
            <section className='bannerSection'>
                <img src={bannerUrl} alt="Banner quảng cáo" className='bannerImage' />
            </section>
            <section className='koiSection'>
                <div className='section-content'>
                    <h2>Sản phẩm bán chạy</h2>
                    <Slider {...sliderSettings}>
                        {koiProducts.map((product, index) => (
                            <div key={index} className='koiProductCard'>
                                <img src={product.imageUrl} alt={product.name} className='koiImage' />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            <section className='farmAdSection'>
                <div className='farmAdContent'>
                    <div className='farmText'>
                        <p>
                            Thăm quan và mua các sản phẩm cá Koi tuyệt đẹp trực tiếp từ farm của chúng tôi. Với không gian rộng lớn và nhiều loại cá Koi quý hiếm, bạn sẽ có trải nghiệm tuyệt vời khi đến thăm farm của chúng tôi. Tại đây, bạn không chỉ được chiêm ngưỡng những chú cá Koi khỏe mạnh và đầy màu sắc, mà còn được hướng dẫn tận tình về cách chăm sóc và nuôi dưỡng chúng. Chúng tôi cam kết mang đến cho bạn những sản phẩm cá Koi chất lượng cao cùng với dịch vụ chăm sóc khách hàng tận tâm.
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
                    {tripItems.map((trip, index) => (
                        <div key={index} className='tripCard'>
                            <img src={trip.imageUrl} alt={trip.farmName} className='tripImage' />
                            <h3>{trip.farmName}</h3>
                        </div>
                    ))}
                </Slider>
            </section>
            <ContactForm />
        </div>
    );
}

export default Home;
