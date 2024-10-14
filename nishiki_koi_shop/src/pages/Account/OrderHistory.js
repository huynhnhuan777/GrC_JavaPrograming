import React, { useState } from 'react';
import '../../assets/css/OrderHistory.css';

function OrderHistory() {
    // Giả lập dữ liệu đơn hàng (thay thế bằng dữ liệu từ API)
    const [orders, setOrders] = useState([
        { id: 1, date: '2024-09-15', status: 'Đang giao', quantity: 3 },
        { id: 2, date: '2024-09-10', status: 'Đã mua', quantity: 1 },
        { id: 3, date: '2024-09-05', status: 'Đã hủy', quantity: 2 },
        { id: 4, date: '2024-09-20', status: 'Đang giao', quantity: 5 },
        { id: 5, date: '2024-08-30', status: 'Đã mua', quantity: 4 },
        { id: 6, date: '2024-08-25', status: 'Đã hủy', quantity: 1 },
        { id: 7, date: '2024-08-15', status: 'Đang giao', quantity: 2 },
        { id: 8, date: '2024-08-10', status: 'Đã mua', quantity: 1 },
        { id: 9, date: '2024-08-05', status: 'Đã hủy', quantity: 3 },
        { id: 10, date: '2024-07-30', status: 'Đang giao', quantity: 2 },
    ]);

    // Xử lý mua lại đơn hàng
    const handleReorder = (orderId) => {
        console.log(`Mua lại đơn hàng ID: ${orderId}`);
        // Logic thêm sản phẩm vào giỏ hàng sẽ được thực hiện ở đây
    };

    // Xử lý xem chi tiết đơn hàng
    const handleViewOrderDetails = (orderId) => {
        console.log(`Xem chi tiết đơn hàng ID: ${orderId}`);
        // Logic chuyển đến trang chi tiết đơn hàng sẽ được thực hiện ở đây
    };

    return (
        <div className="order-history-container">
            <h2>Lịch sử mua hàng</h2>
            <div className="order-list">
                {orders.map((order) => (
                    <div className="order-card" key={order.id}>
                        <div className="order-details">
                            <p><strong>ID Đơn hàng:</strong> {order.id}</p>
                            <p><strong>Ngày mua:</strong> {order.date}</p>
                            <p><strong>Trạng thái:</strong> {order.status}</p>
                            <p><strong>Số lượng sản phẩm:</strong> {order.quantity}</p>
                        </div>
                        <div className="button-group">
                            <button className="reorder-button" onClick={() => handleReorder(order.id)}>Mua lại</button>
                            <button className="view-details-button" onClick={() => handleViewOrderDetails(order.id)}>Xem chi tiết</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderHistory;
