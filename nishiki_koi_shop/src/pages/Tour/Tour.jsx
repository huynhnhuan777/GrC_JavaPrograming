import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import '../../assets/css/Farm/FarmDetail.css';

const Tour = () => {
    const { id } = useParams();
    const [tourData, setTourData] = useState({});
    const [fish, setFish] = useState([]);
    const [numberOfPeople, setNumberOfPeople] = useState(1); // Số người tham gia

    // Lấy dữ liệu từ sessionStorage
    useEffect(() => {
        const savedInfo = sessionStorage.getItem('info'); // Đọc từ 'info'
        if (savedInfo) {
            const parsedData = JSON.parse(savedInfo);
            setTourData(parsedData); // Gán thẳng dữ liệu vào state
        } else {
            console.error("Không tìm thấy dữ liệu trong sessionStorage.");
            toast.error("Không có thông tin chuyến đi.");
        }
    }, []);

    const handleTourBooking = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
            console.log("Token đang sử dụng:", token);

            if (!token) {
                toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập trước khi đặt tour.");
                return;
            }

            // Tạo đơn đặt tour
            const orderTourResponse = await axios.post(
                "http://localhost:8080/api/v1/order-tours/create",
                {
                    userId: 1, // Thay bằng userId thực tế từ ứng dụng của bạn
                    totalAmount: tourData.price * numberOfPeople,
                    status: "PENDING",
                    tourBookingDate: new Date().toISOString(),
                    tourStartDate: tourData.startDate,
                    paymentMethod: "CASH", // Hoặc các phương thức thanh toán khác
                    createdDate: new Date().toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header
                        "Content-Type": "application/json",
                    },
                }
            );

            const orderTourId = orderTourResponse.data?.orderTourId;

            if (!orderTourId) {
                toast.error("Không thể tạo đặt tour. Vui lòng thử lại!");
                return;
            }

            // Tạo chi tiết đơn đặt tour
            await axios.post(
                "http://localhost:8080/api/v1/order-tour-details",
                {
                    numberOfPeople: numberOfPeople,
                    price: tourData.price,
                    tourId: tourData.id,
                    orderTourId: orderTourId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Đặt tour thành công!");
        } catch (error) {
            console.error("Lỗi khi đặt tour:", error);
            if (error.response?.status === 403) {
                toast.error("Bạn không có quyền thực hiện hành động này.");
            } else {
                toast.error("Đặt tour thất bại! Vui lòng thử lại.");
            }
        }
    };

    return (
        <div className={'farm-detail-container'}>
            <div className={'farm-detail-content'}>
                <div className="farm-summary">
                    <div className={'farm-detail-thumbnail'}>
                        <img src={tourData?.image} alt={tourData?.name} className="farm-image" />
                    </div>
                    <div className={'farm-detail-summary'}>
                        <div>
                            <h3>Tên chuyến đi: {tourData?.name}</h3>
                            <p>Ngày khởi hành: {tourData?.startDate}</p>
                            <p>Ngày kết thúc: {tourData?.endDate}</p>
                            <p>Tổng tham dự tối đa: {tourData?.capacity || 'Không rõ'}</p>
                            <p>Giá vé: {tourData?.price || 'Liên hệ'}</p>
                        </div>
                        <div className={'optionBtns'}>
                            <button className={'featureBtn'} onClick={handleTourBooking}>
                                Đặt chuyến
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'farm-detail-description'}>
                    <h4>Mô tả</h4>
                    <p>{tourData?.description || 'Không có mô tả cho chuyến đi này.'}</p>
                </div>
                <div className={'farm-detail-suggestions'}>
                    <div className={'suggestions-items'}>
                        <h4>Giống cá có ở nông trại này</h4>
                        <div className={'suggestions-items-content'}>
                            {fish.map((item, i) => (
                                <div key={i} className={'suggestion-item'}>
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    <p>
                                        <strong>{item.name}</strong>
                                    </p>
                                    <Link to={`/fish/${item.id}`} className={'featureBtn'}>
                                        Xem thêm
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Tour;
