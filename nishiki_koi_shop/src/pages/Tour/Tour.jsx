import React, {useEffect, useState} from "react";
import thankYouImage from "../../assets/img/thank-you.jpg";
import '../../assets/css/Tour/tour.css';
import {handleGetAllProd, useHookTourForm} from "../../utils/handleFuncs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Tour = () => {
    // Khởi tạo dữ liệu mẫu nếu chưa có trong sessionStorage
    const sampleData = {
        id: "001",
        name: "Trang trại X",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKu0rCyN3dSitjRGK0eOfYKAmtav2OzNrrZQ&s",
        dateStart: "2024-01-01",
        dateEnd: "2024-01-10",
        price: 5000000,
        description: "Khám phá trải nghiệm đáng nhớ tại Trang trại X",
        longDescription: "Hãy tạm rời xa nhịp sống hối hả để hòa mình vào khung cảnh thanh bình của Trang trại X! Bạn sẽ được tham gia các hoạt động thú vị từ việc trồng rau củ đến trải nghiệm thu hoạch và nấu ăn từ nguyên liệu tại vườn.",
        galleryImages: [
        ],
        itinerary: [
            { day: 1, activities: "Tham quan vườn cây ăn trái và tìm hiểu về cách trồng rau sạch." },
            { day: 2, activities: "Trải nghiệm thu hoạch rau củ và học cách nấu ăn từ nguyên liệu tại vườn." },
            { day: 3, activities: "Tham gia các hoạt động giải trí và nghỉ ngơi tại nông trại." }
        ]
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
                                <li><strong>Mã chuyến đi: </strong>{infoTour.farmId}</li>
                                <li><strong>Tên trang trại: </strong>{infoTour.tourName}</li>
                                <li><strong>Ngày khởi hành: </strong>{infoTour.tourStartDate}</li>
                                <li><strong>Ngày trở về: </strong>{infoTour.tourEndDate}</li>
                                <li><strong>Giá: </strong>{infoTour.tourPrice}</li>
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
                    <p>{infoTour.tourDescription}</p>
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
