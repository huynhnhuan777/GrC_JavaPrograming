import React from 'react';
import Header from './Header';
import Footer from './Footer';

function AboutUs() {
  return (
    <div className="about-us-container">
      <Header /> {/* Sử dụng Header */}
      {/* Nhúng video nền */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/vid.webm" type="video/webm" /> {/* Đường dẫn video cần đúng */}
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Kết nối cộng đồng đam mê cá KOI</h1> {/* Tiêu đề */}
        <p>
          Welcome to KOI-E, where we provide the best quality koi fish. Our team is passionate about delivering beautiful koi to your home.
        </p>
        <p>
          Founded in 2020, KOI-E has grown to become one of the most trusted sources for high-quality koi fish. Our farm is located in Japan, where we raise and care for each koi with attention to detail.
        </p>
        <p>
          We also offer tours to our farm, so you can experience the beauty of koi fish firsthand and learn more about their care.
        </p>
      </div>
      <Footer /> {/* Sử dụng Footer */}

      {/* Gộp CSS vào đây */}
      <style jsx>{`
        .about-us-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          font-family: 'Times New Roman', Times, serif;
        }

        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .content {
          position: relative;
          z-index: 1;
          color: white;
          padding: 20px;
          text-align: center;
        }

        .content h1 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #f5f5f5;
        }

        .content p {
          font-size: 20px; /* Tăng kích thước chữ */
          line-height: 1.6; /* Giúp văn bản dễ đọc hơn */
          color: #eeeeee; /* Màu sắc chữ cho đoạn văn */
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}

export default AboutUs;
