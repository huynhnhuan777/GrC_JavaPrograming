import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {handleGetAllProd} from "../../utils/handleFuncs";
import '../../assets/css/Farm/FarmDetail.css'

const FarmDetail = () => {
    const {id} = useParams();
    const [farmData, setFarmData] = useState([]);
    const [tours, setTours] = useState([]);
    const [fish, setFish] = useState([]);

    useEffect(() => {
        if (id)
            handleGetAllProd(`http://localhost:8080/api/v1/farms/${Number(id)}`, null, setFarmData, null).then(r => console.log(r));
    }, []);

    useEffect(() => {
        if (farmData) {
            handleGetAllProd(`http://localhost:8080/api/v1/tours/filter/${Number(id)}`, null, setTours, null).then(r => console.log(r));
            handleGetAllProd(`http://localhost:8080/api/v1/fish/filter-by-farm/${id}`, null, setFish, null).then(r => console.log(r));
        }
    }, [farmData])

    useEffect(() => {
        console.log(tours);
    }, [tours]);

    return (
        <div className={'farm-detail-container'}>
            <div className={'farm-detail-content'}>
                <div className="farm-summary">
                    <div className={'farm-detail-thumbnail'}>
                        <img src={farmData.image} alt={farmData.name} className="farm-image"/>
                    </div>
                    <div className={'farm-detail-summary'}>
                        <div>
                            <h3>Tên nông trại: {farmData.name}</h3>
                            <p>Địa chỉ: {farmData.location}</p>
                            <p>Số điện thoại: {farmData.contactInfo}</p>
                        </div>
                    </div>
                </div>
                <div className={'farm-detail-description'}>
                    <h4>Mô tả</h4>
                    {farmData.description}
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
                <div className={'farm-detail-suggestions'}>
                    <div className={'suggestions-items'}>
                        <h4>Chuyến đi có sẵn đến nông trại này</h4>
                        <div className={'suggestions-items-content'}>
                            {tours.map((item, i) => (
                                <div key={i} className={'suggestion-item'}>
                                    <img src={item.image} alt={item.name} className="item-image"/>
                                    <p><strong>{item.name}</strong></p>
                                    <Link to={`/tours/${item.id}`} className={'featureBtn'}>Xem thêm</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FarmDetail;