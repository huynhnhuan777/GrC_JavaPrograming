import React, {useEffect, useState} from "react";
import thankYouImage from "../../assets/img/thank-you.jpg";
import '../../assets/css/Tour/tour.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Tour = () => {
    const sampleData = {
        longDescription:
            "Hãy tạm rời xa nhịp sống hối hả để hòa mình vào khung cảnh thanh bình của Trang trại ! Bạn sẽ được tham gia các hoạt động thú vị từ việc trồng rau củ đến các hoạt động giải trí độc đáo.",
        images: [
            "https://nld.mediacdn.vn/2017/photo-4-1488602848330.jpg?text=Hình+1",
            "https://toidi.net/wp-content/uploads/2017/02/trang-trai-ca-koi.jpg",
            "https://ishikoi.vn/storage/cz/b3/czb3tg2tfsgsmjvngxod23zaaq2x_takeda_cac_trai_ca_koi_nhat_ban.webp?text=Hình+3",
        ],
        image: "https://via.placeholder.com/150",
        itinerary: [
            {
                day: 1,
                activities: "Tham quan vườn cây và tìm hiểu về cách trồng rau sạch.",
            },
            {
                day: 2,
                activities: "Tham dự hội thảo học nấu ăn từ nguyên liệu tại vườn.",
            },
            {
                day: 3,
                activities: "Tham gia các hoạt động giải trí và nghỉ ngơi tại nông trại.",
            },
        ],
    };

    const [info, setInfo] = useState(JSON.parse(sessionStorage.getItem('info')));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === sampleData.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? sampleData.images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        console.log(sessionStorage.getItem('info'));
    }, []);

    const handleOrderTour = async () => {
        // Chuẩn bị dữ liệu gửi lên backend theo định dạng yêu cầu
        const orderData = {
            userId: 1, // ID người dùng, nên lấy từ session hoặc context
            totalAmount: info ? info.tourPrice : 0, // Giá từ thông tin tour (nếu có)
            status: "PENDING", // Trạng thái mặc định
            tourBookingDate: new Date().toISOString().split('T')[0], // Ngày đặt tour (hôm nay)
            tourStartDate: info ? info.tourStartDate : "", // Ngày bắt đầu tour
            paymentMethod: "Credit Card", // Ví dụ về phương thức thanh toán
            createdDate: new Date().toISOString().split('T')[0], // Ngày tạo
        };

        try {
            // Gửi yêu cầu POST đến API order tours
            const response = await fetch("http://localhost:8080/api/v1/order-tours/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Token nếu cần
                },
                body: JSON.stringify(orderData),
            });

            // Kiểm tra trạng thái phản hồi
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Lấy dữ liệu phản hồi
            const responseData = await response.json();
            console.log("Đặt tour thành công! Thông tin trả về từ API:", responseData);

            // Chuẩn bị dữ liệu cho API order tour details
            const orderTourDetailsData = {
                numberOfPeople: info ? info.tourCapacity : 1, // Số người tham gia (ví dụ)
                price: info ? info.tourPrice : {}, // Giá tour
                tourId: info ? info.tourId : 0, // ID tour
                orderTourId: responseData.orderTourId, // ID order tour từ phản hồi của API
            };

            // Gửi yêu cầu POST đến API order tour details
            const detailsResponse = await fetch("http://localhost:8080/api/v1/order-tour-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Token nếu cần
                },
                body: JSON.stringify(orderTourDetailsData),
            });

            // Kiểm tra trạng thái phản hồi của API order tour details
            if (!detailsResponse.ok) {
                throw new Error(`HTTP error! status: ${detailsResponse.status}`);
            }

            // Lấy dữ liệu phản hồi của API order tour details
            const detailsResponseData = await detailsResponse.json();
            console.log("Chi tiết đặt tour thành công! Thông tin trả về từ API:", detailsResponseData);

            alert("Đặt tour và chi tiết thành công!");
        } catch (error) {
            console.error("Lỗi khi đặt tour hoặc thêm chi tiết:", error);
            alert("Đặt tour thất bại! Vui lòng thử lại.");
        }
    };



    return (
        <div className="tour-container">
            <div className="tour-content">
                {/* Tóm tắt cơ bản của tour */}
                <div className="summary-tour">
                    <div className="image-tour">
                        <img
                            src={info && info.image ? info.image : "/path/to/default-image.jpg"}
                            alt="thumbnail-tour"
                            style={{width: "800px", height: "auto"}}
                        />
                    </div>
                    <div className="info-summary-tour">
                        <div className="summary-content">
                            <h4>Thông tin chi tiết </h4>
                            <ul className="show-info-tour">
                                <li><strong>Mã chuyến đi: </strong>{info.farmId}</li>
                                <li><strong>Tên trang trại: </strong>{info.tourName}</li>
                                <li><strong>Ngày khởi hành: </strong>{info.tourStartDate}</li>
                                <li><strong>Ngày trở về: </strong>{info.tourEndDate}</li>
                                <li><strong>Giá: </strong>{info.tourPrice}</li>
                                <li><strong>Số người tối đa: </strong>{info.tourCapacity}</li>
                            </ul>
                        </div>
                        <div className="optionBtns">
                            <button className="featureBtn" onClick={handleOrderTour}>
                                Đặt ngay!
                            </button>
                            <button className="featureBtn">Hỗ trợ</button>
                        </div>
                    </div>
                </div>

                {/* Phần giới thiệu chi tiết */}
                <div className="tour-details">
                    <h4>Giới thiệu chi tiết</h4>
                    <p>{info.tourDescription}</p>
                </div>

                {/* Lịch trình */}
                <div className="itinerary-tour">
                    <h4>Lịch trình</h4>
                    <ul>
                        {sampleData.itinerary && sampleData.itinerary.length > 0 ? (
                            sampleData.itinerary.map((item, index) => (
                                <li key={index}>
                                    <strong>Ngày {item.day}:</strong> {item.activities}
                                </li>
                            ))
                        ) : (
                            <p>Không có lịch trình cho chuyến đi này.</p>
                        )}
                    </ul>
                </div>

                {/* Bộ sưu tập ảnh */}
                <div className="gallery-tour">
                    <h4>Bộ sưu tập hình ảnh</h4>
                    <div className="image-gallery">
                        {sampleData.images && sampleData.images.length > 0 ? (
                            <>
                                <button className="slide-button prev" onClick={handlePrevImage}>{"<"}</button>
                                <img
                                    className="gallery-image"
                                    src={sampleData.images[currentImageIndex]}
                                    alt={`gallery-image-${currentImageIndex}`}
                                    style={{width: "700px", height: "auto"}}
                                />
                                <button className="slide-button next"  onClick={handleNextImage}>{">"}</button>
                            </>
                        ) : (
                            <p>Chưa có ảnh bổ sung cho chuyến đi này.</p>
                        )}
                    </div>
                </div>

                {/* Phần cảm ơn */}
                <div className="thank-you-section">
                    <img className="thank-you-image" src={thankYouImage} alt="Thank you"/>
                </div>
            </div>
        </div>
    );
};

export default Tour;
