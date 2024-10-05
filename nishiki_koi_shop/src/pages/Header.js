// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../KOI-E.svg'; // Import file logo



function Header() {
  return (
    <header style={styles.header}>
      <img src={logo} alt="KOI-E Logo" style={styles.logo} />
      <h1 style={styles.shopName}>KOI-E</h1>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/home" style={styles.navLink}>Trang chủ</Link></li>
          <li style={styles.navItem}><Link to="/" style={styles.navLink}>Danh sách cá</Link></li>
          <li style={styles.navItem}><Link to="#" style={styles.navLink}>Danh sách chuyến đi</Link></li>
          <li style={styles.navItem}><Link to="/about-us" style={styles.navLink}>Về chúng tôi</Link></li>
          <li style={styles.navItem}><Link to="#" style={styles.navLink}>Giỏ hàng</Link></li>
          <li style={styles.navItem}><Link to="#" style={styles.navLink}>Tài khoản</Link></li>
        </ul>
      </nav>
    </header>
  );
}

// Style object cho Header
const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f8f9fa'
  },
  logoContainer: {
      display: 'flex',
      alignItems: 'center', // Đặt logo và tên cửa hàng ngang hàng
  },
  logo: {
    height: '70px',
    marginRight: '10px',
    animation: 'spin 5s linear infinite',
  },
  shopName: {
      fontSize: '28px',
      fontWeight: 'bold',
      fontFamily: "'Pacifico', cursive",
      color: 'red'
  },
  navbar: {
    backgroundColor: '#FF6666', // Đổi màu nền thành vàng nhạt
    padding: '10px',
    borderRadius: '20px 0 0 20px', // Bo tròn hai đầu bên trái
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
    navLink: {
      textDecoration: 'none', // Xóa gạch chân
      color: 'white',          // Màu chữ trắng
      fontSize: '18px',        // Kích thước chữ
      fontWeight: 'bold',      // Chữ đậm
      textTransform: 'uppercase', // Chữ in hoa
      letterSpacing: '1px',    // Khoảng cách giữa các chữ
      padding: '8px 12px',     // Tạo khoảng đệm bên trong nút
      borderRadius: '8px',     // Bo tròn các góc của mỗi nút
      transition: 'background-color 0.3s', // Hiệu ứng chuyển màu khi hover
    },
};

// Định nghĩa keyframes cho animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
`, styleSheet.cssRules.length);


export default Header;
