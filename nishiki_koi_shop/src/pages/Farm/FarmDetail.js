import React, {useEffect, useState} from "react";
import thankYouImage from "../../assets/img/thank-you.jpg";
import '../../assets/css/Tour/tour.css';
import {handleGetAllProd, useHookTourForm} from "../../utils/handleFuncs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Tour = () => {
    // Khởi tạo dữ liệu mẫu nếu chưa có trong sessionStorage
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
                            <h4>Thông tin cơ bản</h4>
                            <ul className="show-info-tour">
                                <li><strong>Mã chuyến đi: </strong>{info.farmId}</li>
                                <li><strong>Tên trang trại: </strong>{info.tourName}</li>
                                <li><strong>Ngày khởi hành: </strong>{info.tourStartDate}</li>
                                <li><strong>Ngày trở về: </strong>{info.tourEndDate}</li>
                                <li><strong>Giá: </strong>{info.tourPrice}</li>
                            </ul>
                        </div>
                        <div className="optionBtns">
                            <button className="featureBtn">Đặt ngay!</button>
                            <button className="featureBtn">Hỗ trợ</button>
                        </div>
                    </div>
                </div>

                {/* Phần giới thiệu chi tiết */}
                <div className="tour-details">
                    <h4>Giới thiệu chi tiết</h4>
                    <p>{sampleData.longDescription}</p>
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
    )
        ;
};

export default Tour;
