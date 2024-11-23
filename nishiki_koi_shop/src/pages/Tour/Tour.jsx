import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {handleGetAllProd} from "../../utils/handleFuncs";
import '../../assets/css/Farm/FarmDetail.css';
import {toast, ToastContainer} from "react-toastify";

const Tour = () => {
    const {id} = useParams();
    const [tourData, setTourData] = useState(() => {
        // Lấy dữ liệu từ sessionStorage khi component được mount
        const savedData = sessionStorage.getItem('info');
        const parsedData = savedData ? JSON.parse(savedData) : {};
        console.log("Dữ liệu khởi tạo tourData từ sessionStorage:", parsedData); // Log dữ liệu khởi tạo
        return parsedData;
    });
    const [fish, setFish] = useState([]);

    const handleBookingTour = async () => {
        const orderData = {
            userId: 1, // ID của người dùng
            totalAmount: tourData.price || 0,
            status: "PENDING",
            tourBookingDate: new Date().toISOString().split("T")[0],
            tourStartDate: tourData.startDate || "1",
            paymentMethod: "ONLINE",
            createdDate: new Date().toISOString().split("T")[0],
        };

        try {
            // Gửi yêu cầu tới API /order-tour
            const OrderTourRepository = await fetch("http://localhost:8080/api/v1/order-tour", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!OrderTourRepository.ok) {
                const errorText = await OrderTourRepository.text();
                throw new Error(`Lỗi từ API /order-tour: ${OrderTourRepository.status} ${OrderTourRepository.statusText} - ${errorText}`);
            }

            const orderResult = await OrderTourRepository.json();
            const orderTourId = orderResult?.orderTourId; // Giả sử API trả về orderTourId
            if (!orderTourId) {
                throw new Error("Không thể lấy orderTourId từ API /order-tour!");
            }

            // Gửi yêu cầu tới API /order-tour-details
            const detailData = {
                numberOfPeople: 1, // Số người tham gia tour
                price: tourData.price || 0,
                tourId: tourData.id || 0,
                orderTourId: orderTourId, // ID đơn đặt tour vừa tạo
            };

            const detailResponse = await fetch("http://localhost:8080/api/v1/order-tour-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(detailData),
            });

            if (!detailResponse.ok) {
                const errorText = await detailResponse.text();
                throw new Error(`Lỗi từ API /order-tour-details: ${detailResponse.status} ${detailResponse.statusText} - ${errorText}`);
            }

            const detailResult = await detailResponse.json();
            toast.success("Đặt tour thành công, chi tiết đã được lưu!");
            console.log("Kết quả chi tiết tour:", detailResult);
        } catch (error) {
            console.error("Lỗi khi đặt tour:", error.message);
            toast.error("Có lỗi xảy ra: " + error.message);
        }
    };

    const handleSaveFarmObj = (info) => {
        sessionStorage.setItem('info', JSON.stringify(info)); // Lưu info vào sessionStorage
        setTourData(info); // Cập nhật state với info
        console.log("Đã lưu dữ liệu vào sessionStorage và cập nhật state:", info);
    };

    return (
        <div className={'farm-detail-container'}>
            <div className={'farm-detail-content'}>
                <div className="farm-summary">
                    <div className={'farm-detail-thumbnail'}>
                        <img src={tourData.image} alt={tourData.name} className="farm-image"/>
                    </div>
                    <div className={'farm-detail-summary'}>
                        <div>
                            <h3>Mã chuyến đi: {tourData.id}</h3>
                            <p>Tên tour: {tourData.name}</p>
                            <p>Ngày khởi hành: {tourData.startDate}</p>
                            <p>Ngày kết thúc: {tourData.endDate}</p>
                            <p>Tổng tham dự tối đa: {tourData.capacity}</p>
                            <p>Giá vé: {tourData.price}</p>
                        </div>
                        <div className={'optionBtns'}>
                            <button className={'featureBtn'} onClick={handleBookingTour}>Đặt chuyến</button>
                        </div>
                    </div>
                </div>
                <div className={'farm-detail-description'}>
                    <h4>Mô tả</h4>
                    {tourData.description}
                </div>
                <div className={'farm-detail-suggestions'}>
                    <div className={'suggestions-items'}>
                        <h4>Giống cá có ở nông trại này</h4>
                        <div className={'suggestions-items-content'}>
                            {fish.map((item, i) => (
                                <div key={i} className={'suggestion-item'}>
                                    <img src={item.image} alt={item.name} className="item-image"/>
                                    <p><strong>{item.name}</strong></p>
                                    <Link to={`/fish/${item.id}`} className={'featureBtn'}>Xem thêm</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
export default Tour;
