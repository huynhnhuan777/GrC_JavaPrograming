import React from 'react';
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactForm from './Form';

function Home() {
  const bannerUrl = "https://inhat.vn/wp-content/uploads/2021/03/4-37.jpg";

  const koiProducts = [
    { name: 'Koi Fish 1', description: 'Beautiful Koi 1', price: '$200', imageUrl: 'https://media.la34.com.vn/upload/image/201810/medium/46263_koi2.jpg' },
    { name: 'Koi Fish 2', description: 'Beautiful Koi 2', price: '$250', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/53-copy.jpg?v=1480156373075' },
    { name: 'Koi Fish 3', description: 'Beautiful Koi 3', price: '$300', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/75-copy.jpg?v=1480156644996' },
    { name: 'Koi Fish 4', description: 'Beautiful Koi 4', price: '$350', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/72-copy.jpg?v=1480156608949' },
    { name: 'Koi Fish 5', description: 'Beautiful Koi 5', price: '$400', imageUrl: 'https://media.la34.com.vn/upload/image/201810/medium/46263_koi2.jpg' },
    { name: 'Koi Fish 6', description: 'Beautiful Koi 6', price: '$450', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/53-copy.jpg?v=1480156373075' },
    { name: 'Koi Fish 7', description: 'Beautiful Koi 7', price: '$500', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/75-copy.jpg?v=1480156644996' },
    { name: 'Koi Fish 8', description: 'Beautiful Koi 8', price: '$550', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/72-copy.jpg?v=1480156608949' },
    { name: 'Koi Fish 9', description: 'Beautiful Koi 9', price: '$600', imageUrl: 'https://media.la34.com.vn/upload/image/201810/medium/46263_koi2.jpg' },
    { name: 'Koi Fish 10', description: 'Beautiful Koi 10', price: '$650', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/53-copy.jpg?v=1480156373075' },
    { name: 'Koi Fish 11', description: 'Beautiful Koi 11', price: '$700', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/75-copy.jpg?v=1480156644996' },
    { name: 'Koi Fish 12', description: 'Beautiful Koi 12', price: '$750', imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/72-copy.jpg?v=1480156608949' },
  ];
  const tripItems = [
    {
      farmName: 'Nông trại A',
      imageUrl: 'https://i.ytimg.com/vi/pUADEpL3DNM/maxresdefault.jpg',
    },
    {
      farmName: 'Nông trại B',
      imageUrl: 'https://www.kodamakoifarm.com/wp-content/uploads/2021/12/Taro.jpg',
    },
    {
      farmName: 'Nông trại C',
      imageUrl: 'https://www.kodamakoifarm.com/wp-content/uploads/2019/07/taro-koi-japan-v1.jpg',
    },
    {
       farmName: 'Nông trại D',
       imageUrl: 'https://www.koikoimatsuda.jp/en/set_pics/home02.JPG',
    },
  ];


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <section style={styles.bannerSection}>
        <img src={bannerUrl} alt="Banner quảng cáo" style={styles.bannerImage} />
      </section>

      <section style={styles.koiSection}>
        <h2>Sản phẩm bán chạy</h2>
        <Slider {...sliderSettings}>
          {koiProducts.map((product, index) => (
            <div key={index} style={styles.koiProductCard}>
              <img src={product.imageUrl} alt={product.name} style={styles.koiImage} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </Slider>
      </section>

      <section style={styles.farmAdSection}>
        <div style={styles.farmAdContent}>
          <div style={styles.farmText}>
            <p>
              Thăm quan và mua các sản phẩm cá Koi tuyệt đẹp trực tiếp từ farm của chúng tôi. Với không gian rộng lớn và nhiều loại cá Koi quý hiếm, bạn sẽ có trải nghiệm tuyệt vời khi đến thăm farm của chúng tôi. Tại đây, bạn không chỉ được chiêm ngưỡng những chú cá Koi khỏe mạnh và đầy màu sắc, mà còn được hướng dẫn tận tình về cách chăm sóc và nuôi dưỡng chúng. Chúng tôi cam kết mang đến cho bạn những sản phẩm cá Koi chất lượng cao cùng với dịch vụ chăm sóc khách hàng tận tâm.
            </p>
          </div>
          <div style={styles.farmImageWrapper}>
            <img
              src="https://www.thesprucepets.com/thmb/hyyMM_qGoKJC1YGYUrufUJBU6fo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1148621267-fbe7fcc9e0eb41078b0ee63bc3edc2b3.jpg"
              alt="Farm cá Koi"
              style={styles.farmImage}
            />
          </div>
        </div>
      </section>


      <section style={styles.tripAdSection}>
        <h2>Các chuyến đi hiện có</h2>
        <Slider {...sliderSettings}>
          {tripItems.map((trip, index) => (
            <div key={index} style={styles.tripCard}>
              <img src={trip.imageUrl} alt={trip.farmName} style={styles.tripImage} />
              <h3>{trip.farmName}</h3>
            </div>
          ))}
        </Slider>
      </section>
      <ContactForm />



      <Footer />
    </div>
  );
}

const styles = {
  bannerSection: {
    marginTop: '20px',
  },
  farmText: {
    flex: 1,
    marginRight: '20px',
    fontSize: '20px',
    fontFamily: 'Times New Roman, serif',
    lineHeight: '1.6',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
  },
  koiSection: {
    padding: '20px',
    textAlign: 'center',
  },
  koiProductCard: {
    border: '2px solid #007BFF',
    padding: '15px',
    width: '95%',
    margin: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  koiImage: {
    width: '70%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  farmAdSection: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  farmAdContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  farmImageWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  farmImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  tripCard: {
      border: '2px solid #007BFF',
      padding: '15px',
      width: '95%',
      margin: '10px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
    },
    tripImage: {
      width: '70%',
      height: 'calc(70% * 0.5)',
      borderRadius: '8px',
      marginBottom: '10px',
    },
};

export default Home;
