import React, {useEffect, useState} from "react";
import thankYouImage from "../../assets/img/thank-you.jpg";
import '../../assets/css/Tour/tour.css';
import {handleGetAllProd, useHookTourForm} from "../../utils/handleFuncs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Tour = () => {
    // Khởi tạo dữ liệu mẫu nếu chưa có trong sessionStorage
    const sampleData = {
            id: "T001",
            name: "Tour khám phá nông trại xanh",
            dateStart: "2024-12-01",
            dateEnd: "2024-12-05",
            price: 1500000, // Giá tour
            imageUrl: "https://via.placeholder.com/400x300", // URL ảnh thumbnail
            description: "Một chuyến đi tuyệt vời khám phá nông trại xanh.",
            longDescription: "Tour nông trại xanh mang lại trải nghiệm thú vị với nhiều hoạt động bổ ích và thư giãn tại nông thôn.",
            itinerary: [
                { day: 1, activities: "Tham quan khu vực chăn nuôi và vườn cây." },
                { day: 2, activities: "Trải nghiệm thu hoạch rau quả." },
                { day: 3, activities: "Tham gia hội thảo nông nghiệp bền vững." },
                { day: 4, activities: "Tham gia các hoạt động dã ngoại và giao lưu văn hóa." },
                { day: 5, activities: "Tự do mua sắm và kết thúc hành trình." },
            ],
            galleryImages: [
                "https://via.placeholder.com/800x600?text=Image+1",
                "https://via.placeholder.com/800x600?text=Image+2",
                "https://via.placeholder.com/800x600?text=Image+3",
            ],

    };

    // Lưu dữ liệu mẫu vào sessionStorage nếu chưa có
    if (!sessionStorage.getItem('infoTour')) {
        sessionStorage.setItem('infoTour', JSON.stringify(sampleData));
    }

    const [infoTour, setInfoTour] = useState(JSON.parse(sessionStorage.getItem('infoTour')));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === infoTour.galleryImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? infoTour.galleryImages.length - 1 : prevIndex - 1
        );
    };

    function setData() {

    }

    function setChooseOne() {

    }

    return (
        <div className="tour-container">a
            <div className="tour-content">
                {/* Tóm tắt cơ bản của tour */}
                <div className="summary-tour">
                    <div className="image-tour">
                        <img className="thumbnail-tour" src={infoTour.imageUrl} alt="thumbnail-tour" />
                    </div>
                    <div className="info-summary-tour">
                        <div className="summary-content">
                            <h4>Thông tin cơ bản</h4>
                            <ul className="show-info-tour">
                                <li><strong>Mã chuyến đi: </strong>{infoTour.id}</li>
                                <li><strong>Tên trang trại: </strong>{infoTour.name}</li>
                                <li><strong>Ngày khởi hành: </strong>{infoTour.dateStart}</li>
                                <li><strong>Ngày trở về: </strong>{infoTour.dateEnd}</li>
                                <li><strong>Giá: </strong>{infoTour.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</li>
                            </ul>
                        </div>
                        <div className="optionBtns">
                            <button className="featureBtn">Đặt ngay!</button>
                            <button className="featureBtn">Hỗ trợ</button>
                        </div>
                    </div>
                </div>

                {/* Mô tả chi tiết của tour */}
                <div className="description-tour">
                    <p>{infoTour.description}</p>
                </div>

                {/* Phần giới thiệu chi tiết */}
                <div className="tour-details">
                    <h4>Giới thiệu chi tiết</h4>
                    <p>{infoTour.longDescription}</p>
                </div>
                {/* Lịch trình */}
                <div className="itinerary-tour">
                    <h4>Lịch trình</h4>
                    <ul>
                        {infoTour.itinerary && infoTour.itinerary.length > 0 ? (
                            infoTour.itinerary.map((item, index) => (
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
                        {infoTour.galleryImages && infoTour.galleryImages.length > 0 ? (
                            <img
                                className="gallery-image"
                                src={infoTour.galleryImages[currentImageIndex]}
                                alt={`gallery-image-${currentImageIndex}`}
                            />
                        ) : (
                            <p>Chưa có ảnh bổ sung cho chuyến đi này.</p>
                        )}
                    </div>
                    <button className="slide-button prev" onClick={prevSlide}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <button className="slide-button next" onClick={nextSlide}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>

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
