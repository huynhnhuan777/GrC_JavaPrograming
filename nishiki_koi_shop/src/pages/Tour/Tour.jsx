import React, { useState } from "react";
import thankYouImage from "../../assets/img/thank-you.jpg"; // Đường dẫn tới ảnh cảm ơn trong thư mục src

const Tour = () => {
    const [infoTour, setInfoTour] = useState(JSON.parse(sessionStorage.getItem('infoTour')));

    return (
        <div className={'tour-container'}>
            <div className={'tour-content'}>

                {/* Tóm tắt cơ bản của tour */}
                <div className={'summary-tour'}>
                    <div className={'image-tour'}>
                        <img className={'thumbnail-tour'} src={infoTour.imageUrl} alt={'thumbnail-tour'}/>
                    </div>
                    <div className={'info-summary-tour'}>
                        <div className={'summary-content'}>
                            <h4>Thông tin cơ bản</h4>
                            <ul className={'show-info-tour'}>
                                <li><strong>Mã chuyến đi: </strong>{infoTour.id}</li>
                                <li><strong>Tên trang trại: </strong>{infoTour.name}</li>
                                <li><strong>Ngày khởi hành: </strong>{infoTour.dateStart}</li>
                                <li><strong>Ngày trở về: </strong>{infoTour.dateEnd}</li>
                                <li><strong>Giá: </strong>{(infoTour.price).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</li>
                            </ul>
                        </div>
                        <div className={'optionBtns'}>
                            <button className={'featureBtn'}>Đặt ngay!</button>
                            <button className={'featureBtn'}>Hỗ trợ</button>
                        </div>
                    </div>
                </div>

                {/* Mô tả chi tiết của tour */}
                <div className={'description-tour'}>
                    <p>{infoTour.description}</p>
                </div>

                {/* Thêm phần giới thiệu chi tiết về tour */}
                <div className={'tour-details'}>
                    <h4>Giới thiệu chi tiết</h4>
                    <p>{infoTour.longDescription}</p>
                </div>

                {/* Bộ sưu tập ảnh */}
                <div className={'gallery-tour'}>
                    <h4>Bộ sưu tập hình ảnh</h4>
                    <div className={'image-gallery'}>
                        {infoTour.galleryImages && infoTour.galleryImages.length > 0 ? (
                            infoTour.galleryImages.map((image, index) => (
                                <img key={index} className={'gallery-image'} src={image}
                                     alt={`gallery-image-${index}`}/>
                            ))
                        ) : (
                            <p>Chưa có ảnh bổ sung cho chuyến đi này.</p>
                        )}
                    </div>
                </div>

                {/* Phần cảm ơn */}
                <div className={'thank-you-section'}>
                    <img className={'thank-you-image'} src={thankYouImage} alt="Thank you"/>
                </div>
            </div>
        </div>
    );
}

// Định nghĩa infoTour
const infoTour = {
    id: "001",
    name: "Trang trại X",
    imageUrl: "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg",
    dateStart: "2024-01-01",
    dateEnd: "2024-01-10",
    price: 5000000,
    description: "Khám phá trải nghiệm đáng nhớ tại Trang trại X",
    longDescription: "Hãy tạm rời xa nhịp sống hối hả để hòa mình vào khung cảnh thanh bình của Trang trại X! Với chuyến hành trình này, bạn sẽ được khám phá thiên nhiên tươi đẹp, tham gia vào các hoạt động trải nghiệm nông trại độc đáo, và thưởng thức các sản vật sạch ngay tại vườn. Mỗi khoảnh khắc tại đây đều mang đến cảm giác gần gũi và thú vị, từ việc tự tay thu hoạch rau củ, tìm hiểu quá trình nuôi trồng bền vững, đến việc thưởng thức những món ăn địa phương độc đáo.\n" +
        "\n" +
        "Chuyến đi không chỉ là cơ hội để nghỉ dưỡng, mà còn là dịp để bạn kết nối với thiên nhiên và học hỏi những giá trị xanh. Cùng với đội ngũ hướng dẫn viên tận tình, bạn sẽ có những giây phút thư giãn và khám phá đầy ý nghĩa, đưa bạn về với những điều giản dị và yên bình nhất của cuộc sống.\n" +
        "\n" +
        "Đừng bỏ lỡ cơ hội trải nghiệm cuộc sống xanh và xây dựng những kỷ niệm đáng nhớ tại Trang trại X! Hãy chuẩn bị để có một chuyến đi đầy ấn tượng và tràn ngập niềm vui!",
    galleryImages: [
        "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg",
        "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg",
        "https://cdn.tuoitre.vn/thumb_w/480/2021/2/4/photo-1-1612402298157895451843.jpg"
    ]
};

// Lưu infoTour vào sessionStorage
sessionStorage.setItem('infoTour', JSON.stringify(infoTour));

export default Tour;
