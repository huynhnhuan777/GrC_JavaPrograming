import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {handleGetAllProd} from "../../utils/handleFuncs";
import '../../assets/css/Farm/FarmDetail.css'
import {toast, ToastContainer} from "react-toastify";

const Tour = () => {
    const {id} = useParams();
    const [tourData, setTourData] = useState([]);
    const [fish, setFish] = useState([]);

    const handleBookingTour = () => {
        toast.warning('Tính năng chưa sẵn sàng ở bản demo');
    }

    useEffect(() => {
        if (id)
            handleGetAllProd(`http://localhost:8080/api/v1/tours/${Number(id)}`, null, setTourData, null).then(r => console.log(r));
    }, []);

    useEffect(() => {
        if (tourData) {
            handleGetAllProd(`http://localhost:8080/api/v1/fish/filter-by-farm/${tourData.farmId}`, null, setFish, null).then(r => console.log(r));
        }
    }, [tourData])

    return (
        <div className={'farm-detail-container'}>
            <div className={'farm-detail-content'}>
                <div className="farm-summary">
                    <div className={'farm-detail-thumbnail'}>
                        <img src={tourData.image} alt={tourData.name} className="farm-image"/>
                    </div>
                    <div className={'farm-detail-summary'}>
                        <div>
                            <h3>Mã chuyến đi: {tourData.name}</h3>
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
    )
}
export default Tour;