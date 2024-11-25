// Trang nhân viên giao hàng làm việc với đơn hàng
// tính năng : xem danh sách đoen hàng , có button xem chi tiết và cập nhật trạng thái đơn ahngf

import '../../../../assets/css/Delivery/Component/DeliveryOrder.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders, getOrderDetails, updateOrderStatus } from "../../../../utils/handleDeliveryFuncs";
import { useNavigate } from 'react-router-dom';

const DeliveryOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate(); // Hook for navigation

    // Fetch orders on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders('http://localhost:8080/api/v1/delivery/order-fishes', token);
            setOrders(data);
        } catch (error) {
            toast.error("Không thể tải danh sách đơn hàng.");
        }
    };

    const fetchOrderDetails = async (id) => {
        try {
            const details = await getOrderDetails(`http://localhost:8080/api/v1/delivery/order-fishes/${id}`, token);
            setSelectedOrder(details);
            setStatus(details.status);
        } catch (error) {
            toast.error("Không thể tải thông tin chi tiết đơn hàng.");
        }
    };

    const handleStatusUpdate = async () => {
        try {
            const updatedOrder = await updateOrderStatus(
                `http://localhost:8080/api/v1/delivery/order-fishes/update/${selectedOrder.id}`,
                { ...selectedOrder, status },
                token
            );
            toast.success("Cập nhật trạng thái đơn hàng thành công!");
            setSelectedOrder(updatedOrder);
            fetchOrders(); // Refresh the list
        } catch (error) {
            toast.error("Không thể cập nhật trạng thái đơn hàng.");
        }
    };

    const handleViewDetails = (id) => {
        // Navigate to the CustomerOrderDetail page
        navigate(`/customer-order-detail/${id}`);
    };

    return (
        <div className="delivery-container">
            <h3>Quản lý đơn hàng giao cá</h3>
            <div className="orders-list">
                <h4>Danh sách đơn hàng</h4>
                {orders.length === 0 ? (
                    <p>Không có đơn hàng nào.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <strong>Mã đơn:</strong> {order.id} -
                                <strong>Trạng thái:</strong> {order.status}
                                <button onClick={() => handleViewDetails(order.id)}>Xem chi tiết</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedOrder && (
                <div className="order-details">
                    <h4>Chi tiết đơn hàng</h4>
                    <p><strong>Mã đơn:</strong> {selectedOrder.id}</p>
                    <p><strong>Khách hàng:</strong> {selectedOrder.user.name} ({selectedOrder.user.email})</p>
                    <p><strong>Sản phẩm:</strong> {selectedOrder.productName}</p>
                    <p><strong>Số lượng:</strong> {selectedOrder.quantity}</p>
                    <p><strong>Giá:</strong> {selectedOrder.price}</p>
                    <p><strong>Trạng thái hiện tại:</strong> {selectedOrder.status}</p>
                    <div className="status-update">
                        <label htmlFor="status">Cập nhật trạng thái:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Chưa giao">Chưa giao</option>
                            <option value="Đang giao">Đang giao</option>
                            <option value="Đã giao">Đã giao</option>
                        </select>
                        <button onClick={handleStatusUpdate}>Cập nhật</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryOrder;
