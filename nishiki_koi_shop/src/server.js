// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

// Cấu hình kết nối đến PostgreSQL
const pool = new Pool({
    user: 'postgres',        // Thay 'yourUsername' bằng tên người dùng PostgreSQL của bạn
    host: 'localhost',            // Thay đổi nếu PostgreSQL chạy trên host khác
    database: 'nishiki_koi_shop',     // Thay 'yourDatabase' bằng tên cơ sở dữ liệu của bạn
    password: '123456',     // Thay 'yourPassword' bằng mật khẩu của bạn
    port: 5432                    // Cổng mặc định của PostgreSQL là 5432
});

// Kiểm tra kết nối với cơ sở dữ liệu
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to PostgreSQL database');
});

// Sử dụng middleware cors để cho phép kết nối từ ứng dụng React
app.use(cors());

// API để lấy tất cả tours
app.get('/api/v1/tours/get-all-tours', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tour');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching tours:", error);
        res.status(500).json({ error: 'Failed to fetch tours' });
    }
});

// API để lấy tất cả farms
app.get('/api/v1/farms/get-all-farm', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM farm');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching farms:", error);
        res.status(500).json({ error: 'Failed to fetch farms' });
    }
});

// Khởi động server tại cổng 8080
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
