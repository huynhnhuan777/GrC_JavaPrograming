// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 KOI-E. Tất cả các quyền được bảo lưu.</p>
    </footer>
  );
}

// Style object cho Footer
const styles = {
  footer: {
    backgroundColor: '#343a40',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
  }
};

export default Footer;
