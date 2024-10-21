import {useState} from "react";
import '../../assets/css/Tour/tour.css'

const Tour = () => {
    const [infoTour, setInfoTour] = useState(JSON.parse(sessionStorage.getItem('infoTour')));

    return (
        <div className={'tour-container'}>
            <div className={'tour-content'}>
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
                                <li><strong>Ngày trở về: </strong>{infoTour.dateEnd} </li>
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
                <div className={'description-tour'}>
                    <p>{infoTour.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Tour;