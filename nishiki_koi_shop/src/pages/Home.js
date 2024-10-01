import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

function Home() {
  const bannerUrl = "https://your-banner-link.com/banner.jpg"; // Bạn có thể thay đổi URL của banner này

  const koiProducts = [
    { name: 'Koi Fish 1', description: 'Beautiful Koi 1', price: '$200' },
    { name: 'Koi Fish 2', description: 'Beautiful Koi 2', price: '$250' },
    { name: 'Koi Fish 3', description: 'Beautiful Koi 3', price: '$300' }
  ];

  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <img src="/path-to-your-logo/logo.png" alt="KOI-E Logo" style={styles.logo} />
        <h1 style={styles.shopName}>KOI-E</h1>
      </header>

      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="#">Danh sách cá</a></li>
          <li style={styles.navItem}><a href="#">Danh sách chuyến đi</a></li>
          <li style={styles.navItem}><Link to="/about-us">About Us</Link></li> {/* Chuyển sang trang About Us */}
          <li style={styles.navItem}><a href="#">Giỏ hàng</a></li>
          <li style={styles.navItem}><a href="#">Tài khoản</a></li>
        </ul>
      </nav>

      {/* Banner Section */}
      <section style={styles.bannerSection}>
        <img src={bannerUrl} alt="Banner quảng cáo" style={styles.bannerImage} />
      </section>

      {/* Best-selling Koi Products Section */}
      <section style={styles.koiSection}>
        <h2>Sản phẩm cá Koi bán chạy</h2>
        <div style={styles.koiProductList}>
          {koiProducts.map((product, index) => (
            <div key={index} style={styles.koiProductCard}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Farm Advertising Section */}
      <section style={styles.farmAdSection}>
        <h2>Quảng cáo Farm cá</h2>
        <p>Thăm quan và mua các sản phẩm cá Koi tuyệt đẹp trực tiếp từ farm của chúng tôi.</p>
      </section>

      {/* Trip Advertising Section */}
      <section style={styles.tripAdSection}>
        <h2>Quảng cáo chuyến đi đến Farm cá</h2>
        <p>Đặt ngay các chuyến đi đến farm cá của chúng tôi để có trải nghiệm tuyệt vời.</p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 KOI-E. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}

// Style object cho các thành phần
const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f8f9fa'
  },
  logo: {
    height: '50px'
  },
  shopName: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  navbar: {
    backgroundColor: '#007bff',
    padding: '10px'
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0
  },
  navItem: {
    margin: '0 10px'
  },
  bannerSection: {
    marginTop: '20px'
  },
  bannerImage: {
    width: '100%',
    height: 'auto'
  },
  koiSection: {
    padding: '20px',
    textAlign: 'center'
  },
  koiProductList: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  koiProductCard: {
    border: '1px solid #ccc',
    padding: '10px',
    width: '30%'
  },
  farmAdSection: {
    padding: '20px',
    backgroundColor: '#f1f1f1',
    textAlign: 'center'
  },
  tripAdSection: {
    padding: '20px',
    backgroundColor: '#e2e6ea',
    textAlign: 'center'
  },
  footer: {
    backgroundColor: '#343a40',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
  }
};

export default Home;
