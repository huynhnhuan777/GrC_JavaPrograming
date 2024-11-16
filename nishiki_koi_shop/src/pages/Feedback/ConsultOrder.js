import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Feedback/ConsultOrder.css';

const ConsultOrder = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ name: '', phone: '', details: '' });

    // Hàm xử lý tạo đơn hàng mới
    const handleCreateOrder = () => {
        setOrders([...orders, newOrder]);
        setNewOrder({ name: '', phone: '', details: '' });
    };

    return (
        <div className="consult-order-container">
            <h1>Trang Nhân viên Tư vấn - Đơn hàng</h1>

            <div className="order-actions">
                <h2>Tạo Đơn hàng qua Điện thoại</h2>
                <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={newOrder.name}
                    onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                />
                <textarea
                    placeholder="Mã đơn hàng"
                    value={newOrder.details}
                    onChange={(e) => setNewOrder({ ...newOrder, details: e.target.value })}
                />
                <button onClick={handleCreateOrder}>Tạo Đơn hàng mới</button>
            </div>

            <div className="order-list">
                <h2>Danh sách Đơn hàng</h2>
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <p>Tên: {order.name}</p>
                            <p>Điện thoại: {order.phone}</p>
                            <p>Chi tiết: {order.details}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <Link to="/consult-trip" className="switch-page-link">
                Chuyển sang Trang Tư vấn Chuyến đi
            </Link>
        </div>
    );
};

export default ConsultOrder;
