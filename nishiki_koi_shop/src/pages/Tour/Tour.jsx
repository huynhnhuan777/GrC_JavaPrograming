import React, { useState } from "react";
import thankYouImage from "../../assets/img/thank-you.jpg"; // Đường dẫn tới ảnh cảm ơn trong thư mục src
import '../../assets/css/Tour/tour.css';

const Tour = () => {
    const [infoTour, setInfoTour] = useState(JSON.parse(sessionStorage.getItem('infoTour')));

    return (
        <div className="tour-container">
            <div className="tour-content">
                {/* Tóm tắt cơ bản của tour */}
                <div className="summary-tour">
                    <div className="image-tour">
                        <img className="thumbnail-tour" src={infoTour.imageUrl} alt="thumbnail-tour"/>
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
                            infoTour.galleryImages.map((image, index) => (
                                <img key={index} className="gallery-image" src={image} alt={`gallery-image-${index}`} />
                            ))
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
}
const infoTour = {
    id: "001",
    name: "Trang trại X",
    imageUrl: "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg",
    dateStart: "2024-01-01",
    dateEnd: "2024-01-10",
    price: 5000000,
    description: "Khám phá trải nghiệm đáng nhớ tại Trang trại X",
    longDescription: "Hãy tạm rời xa nhịp sống hối hả để hòa mình vào khung cảnh thanh bình của Trang trại X! ...",
    galleryImages: [
        "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg",
        "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg",
        "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg"
    ],
    itinerary: [
        { day: 1, activities: "Tham quan vườn cây ăn trái và tìm hiểu về cách trồng rau sạch." },
        { day: 2, activities: "Trải nghiệm thu hoạch rau củ và học cách nấu ăn từ nguyên liệu tại vườn." },
        { day: 3, activities: "Tham gia các hoạt động giải trí và nghỉ ngơi tại nông trại." }
    ]
};

sessionStorage.setItem('infoTour', JSON.stringify(infoTour));
export default Tour;
